import OpenAI from "openai";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function createCompletion(prompt) {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });

        console.log(completion.choices[0].message.content);
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

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);

const filePath = path.join(dirName, 'artykul.txt');

readTextFile(filePath)
    .then((fileContent) => {
        createCompletion(fileContent);
    })
    .catch((error) => {
        console.error('Error reading the file:', error);
    });