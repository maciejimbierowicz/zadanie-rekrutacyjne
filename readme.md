# Aplikacja do Generowania Artykułów HTML

## Opis

Ta aplikacja przetwarza tekstowy plik artykułu (`artykul.txt`) i generuje z niego sformatowany dokument HTML. 
## Instrukcje

### 1. Klonowanie repozytorium

Aby sklonować repozytorium, użyj następującej komendy:

```sh
git clone https://github.com/maciejimbierowicz/zadanie-rekrutacyjne.git
cd zadanie-rekrutacyjne
```

### 2. Instalacja zależności

```sh
npm install
```

### 3. Skopiuj plik .env.dev do .env 
```sh
cp .env.dev .env
```

Zmien wartość OPENAI_API_KEY w pliku .env na własny klucz openapi

### 4. Uruchom skrypt

```sh
npm start
```

Aby zmienić tekst generowanego artykułu należy zmodyfikować plik artykul.txt

Pliki zapisują się w folderze src.
1. Plik szablon.html zawiera szablon HTML, w którym artykuł będzie wyświetlany.
2. Plik artykul.html zawiera wygenerowany kod HTML z treścią artykułu do wklejenia w tag 'body'.
3. Plik podglad.html zawiera podgląd artykułu w szablonie HTML, pozwalający na wizualizację artykułu po jego wygenerowaniu.
