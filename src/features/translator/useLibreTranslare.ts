import { AutoDetectedLanguage, LanguageCode } from 'lib/models';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useAutoDetectedLanguage, useTranslateText } from './actions';
import { SelectedLanguage } from './types';

export const useLibreTranslare = () => {
    const [translatedText, setTranslatedText] = useState<string>('');
    const [querry, setQuerry] = useState<string>('');
    const [autoDetectedLanguage, setAutoDetectedLanguage] = useState<AutoDetectedLanguage>();

    const [selectedLanguage, setSelectedLanguage] = useState<SelectedLanguage>({
        source: LanguageCode.Auto,
        target: LanguageCode.Polish,
    });

    const {
        fetch: detectedLanguage,
        hasError: hasErroDetectedLanguage,
        isLoading: isLoadingDetectedLanguage,
    } = useAutoDetectedLanguage(setAutoDetectedLanguage);

    const {
        isLoading: isTranslatingText,
        hasError: hasErrorTranslatingText,
        fetch: TranslatingText,
    } = useTranslateText(setTranslatedText);

    const debouncedAction = useDebouncedCallback(() => {
        if (querry.length < 5) {
            return;
        }

        selectedLanguage.source === LanguageCode.Auto
            ? detectedLanguage({ q: querry })
            : TranslatingText({
                  q: querry,
                  source: selectedLanguage.source,
                  target: selectedLanguage.target,
                  format: 'text',
              });
    }, 1000);

    return {
        selectedLanguage,
        hasErroDetectedLanguage,
        debouncedAction,
        setQuerry,
        setSelectedLanguage,
        isLoadingDetectedLanguage,
        isTranslatingText,
        hasErrorTranslatingText,
        autoDetectedLanguage,
        querry,
        translatedText,
        setAutoDetectedLanguage,
        setTranslatedText,
    };
};
