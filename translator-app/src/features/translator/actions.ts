import { useState } from 'react';
import { AutoDetectedLanguage, Language, LanguageCode } from 'lib/models';
import { APP_CONFIG } from 'lib/config';
import { useTranslation } from 'lib/hooks';

export const useSupportedLanguages = (onSucces: (languages: Array<Language>) => void) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasError, setHasError] = useState<boolean>(false);
    const T = useTranslation();

    return {
        isLoading,
        hasError,
        fetch: () => {
            setIsLoading(true);
            setHasError(false);

            fetch(`${APP_CONFIG.API_URL}/languages`)
                .then((response) => {
                    if (response.ok) {
                        return response;
                    }
                    throw response;
                })
                .then((response) => response.json())
                .then((data) => {
                    const allLanguage: Array<Language> = [
                        {
                            code: LanguageCode.Auto,
                            name: T.common.autoTranslate,
                        },
                    ].concat(data);
                    onSucces(allLanguage);
                })
                .catch(() => {
                    setHasError(true);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        },
    };
};

export const useAutoDetectedLanguage = (
    onSucces: (autoDetectedlanguage: AutoDetectedLanguage) => void
) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasError, setHasError] = useState<boolean>(false);
    const T = useTranslation();

    return {
        isLoading,
        hasError,
        fetch: (query: string) => {
            setIsLoading(true);
            setHasError(false);

            fetch(`${APP_CONFIG.API_URL}/detect`, {
                method: 'POST',
                body: JSON.stringify({
                    q: query,
                }),
                headers: {
                    sadasd: 'sadsa',
                },
            })
                .then((response) => {
                    if (response.ok) {
                        return response;
                    }
                    throw response;
                })
                .then((response) => response.json())
                .then(([data]) => onSucces(data))
                .catch(() => {
                    setHasError(true);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        },
    };
};
