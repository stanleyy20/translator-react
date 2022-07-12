import { useState } from 'react';
import { Language } from 'lib/models';
import { APP_CONFIG } from 'lib/config';

export const useSupportedLanguages = (onSucces: (languages: Array<Language>) => void) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasError, setHasError] = useState<boolean>(false);

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
                .then((data) => onSucces(data))
                .catch(() => {
                    setHasError(true);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        },
    };
};
