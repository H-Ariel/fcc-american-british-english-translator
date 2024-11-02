const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

function swapKeyValue(json) {
    return Object.fromEntries(Object.entries(json).map(([key, value]) => [value, key]));
}

function capitalizeFirstLetter(text) {
    return text.charAt(0).toUpperCase() + text.substring(1);
}

const britishToAmericanSpelling = swapKeyValue(americanToBritishSpelling);
const britishToAmericanTitles = swapKeyValue(americanToBritishTitles);


class Translator {

    britishToAmericanLocale() { return 'british-to-american'; }
    americanToBritishLocale() { return 'american-to-british'; }

    translateWord(word, locale) {
        const titles = locale == this.americanToBritishLocale()
            ? Object.keys(americanToBritishTitles)
            : Object.values(americanToBritishTitles);

        let hasDot = word.endsWith('.');
        let isTitle = word.charAt(0) == word.charAt(0).toUpperCase();

        if (hasDot) {
            if (locale == this.americanToBritishLocale() && titles.includes(word.toLowerCase())) {
                word = word.toLowerCase();
                hasDot = false;
            }
            else {
                word = word.slice(0, -1); // remove dot
            }
        }

        if (isTitle && locale == this.britishToAmericanLocale()) {
            if (titles.includes(word.toLowerCase()) ||
                Object.keys(britishOnly).includes(word.toLowerCase()))
                word = word.toLowerCase();
        }

        const timeFormat = locale === this.britishToAmericanLocale() ? /\b(\d{1,2})\.(\d{2})\b/g : /\b(\d{1,2}):(\d{2})\b/g;
        let translatedWord = (locale === this.britishToAmericanLocale()
            ? britishToAmericanSpelling[word] || britishOnly[word] || britishToAmericanTitles[word]
            : americanToBritishSpelling[word] || americanOnly[word] || americanToBritishTitles[word]
        ) || word.replace(timeFormat, locale === this.britishToAmericanLocale() ? '$1:$2' : '$1.$2');

        if (isTitle)
            translatedWord = capitalizeFirstLetter(translatedWord);

        if (translatedWord != word)
            translatedWord = '<span class=\"highlight\">' + translatedWord + '</span>';

        if (hasDot)
            translatedWord += '.'; // add dot back

        return translatedWord;
    }

    // tranlate text. if it changed add `span` to highlight changes.
    translate(text, locale) {
        if (locale != this.americanToBritishLocale() && locale != this.britishToAmericanLocale())
            throw new Error('Invalid value for locale field');

        let words = text.split(/\s/);
        let translatedWords = [];
        for (let i = 0; i < words.length; i++) {
            let word = words[i];

            const phrasesDict = locale == this.americanToBritishLocale() ? americanOnly : britishOnly;

            // find biggest phrase words' count
            const wordsCount = Object.keys(phrasesDict).reduce((count, key) => {
                return (key == word.toLowerCase() || key.startsWith(word.toLowerCase() + ' ')) && key.split(' ').length > count
                    ? key.split(' ').length : count
            }, 1);

            let translatedWord = this.translateWord(word, locale);

            if (wordsCount > 1) {
                // try translate complete phrase
                const phrase = words.slice(i, i + wordsCount).join(' ').toLowerCase();
                const translatedPhrase = this.translateWord(phrase, locale);
                if (translatedPhrase != phrase) {
                    translatedWord = translatedPhrase; // apply change
                    i += wordsCount - 1; // advance words' pointer
                }
            }

            translatedWords.push(translatedWord);
        }

        return capitalizeFirstLetter(translatedWords.join(' '));
    }
}

module.exports = Translator;