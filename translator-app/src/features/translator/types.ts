import { LanguageCode } from 'lib/models/Language';

export type SelectedLanguage = {
    source: LanguageCode;
    target: LanguageCode;
};

export type AutoDetectedLanguageRequest = {
    q: string;
};

export type TranslateTextRequest = {
    q: string;
    source: LanguageCode;
    target: LanguageCode;
    format: string;
};

export type TranslateTextResponse = {
    translatedText: string;
};
