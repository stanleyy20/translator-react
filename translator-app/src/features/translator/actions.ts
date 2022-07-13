import { AutoDetectedLanguage, Language, LanguageCode } from 'lib/models';
import { useTranslation, useFetch } from 'lib/hooks';
import { AutoDetectedLanguageRequest, TranslateTextRequest, TranslateTextResponse } from './types';
import { HttpMethod } from 'lib/types';

const T = useTranslation();

export const useSupportedLanguages = (onSucces: (allLanguage: Array<Language>) => void) =>
    useFetch<Array<Language>>(
        { url: 'languages', method: HttpMethod.GET },
        {
            onSucces: (languages) => {
                const allLanguage: Array<Language> = [
                    {
                        code: LanguageCode.Auto,
                        name: T.common.autoTranslate,
                    },
                ].concat(languages);
                onSucces(allLanguage);
            },
        }
    );

export const useAutoDetectedLanguage = (
    onSucces: (autoDetectedlanguage: AutoDetectedLanguage) => void
) =>
    useFetch<Array<AutoDetectedLanguage>, AutoDetectedLanguageRequest>(
        {
            url: 'detect',
            method: HttpMethod.POST,
        },
        {
            onSucces: ([autoDetectedLanguage]) => onSucces(autoDetectedLanguage),
        }
    );

export const useTranslateText = (onSucces: (translatedText: string) => void) =>
    useFetch<TranslateTextResponse, TranslateTextRequest>(
        {
            url: 'translate',
            method: HttpMethod.POST,
        },
        {
            onSucces: ({ translatedText }) => onSucces(translatedText),
        }
    );
