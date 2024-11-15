import OpenAI from "openai";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY ?? '',
});

async function createCompletion(prompt) {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: `You are an assistant helping with HTML content generation. Your task is to:
                    1. Structure the content of the article using appropriate HTML tags for clarity and readability.
                    2. Insert image placeholders where relevant using the <img> tag with src="image_placeholder.jpg" and alt text that describes the image prompt. The alt text should provide a detailed description of the type of image that could accompany the content.
                    3. Add captions for the images using the <figcaption> tag below each image.
                    4. Do not include CSS or JavaScript in the output.
                    5. Only provide the HTML content that should go between the <body> and </body> tags. Do not include <html>, <head>, or <body> tags.
                    6. Ensure that the content is formatted properly with proper headings, paragraphs, lists and other html tags where appropriate.

                    Your goal is to transform the article into a well-structured HTML document with proper tags and placeholders for images where relevant.` },
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });
        
        return completion.choices[0].message.content;

    } catch (error) {
        console.error('Error connecting to the OpenAI API:', error);
    }
}

function readTextFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

function writeHtmlToFile(filePath, htmlContent) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, htmlContent, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve('HTML content successfully saved to ' + filePath);
            }
        });
    });
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputFilePath = path.join(__dirname, 'artykul.txt');
const outputFilePath = path.join(__dirname, 'artykul.html');

async function processFile() {
    try {
        const fileContent = await readTextFile(inputFilePath);
        const generatedHTML = await createCompletion(fileContent);
        const message = await writeHtmlToFile(outputFilePath, generatedHTML);
        console.log(message);
    } catch (error) {
        console.error('Error in processing:', error);
    }
}

processFile();