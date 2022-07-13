import { useState } from 'react';
import { Language, LanguageCode } from 'lib/models';
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
