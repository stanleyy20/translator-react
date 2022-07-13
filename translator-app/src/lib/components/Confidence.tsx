import { useTranslation } from 'lib/hooks';
import { AutoDetectedLanguage, LanguageCode } from 'lib/models';
import { useCallback } from 'react';
import styled from 'styled-components';

type LanguageProps = {
    disabled: boolean;
};

type ConfidenceProps = {
    hasError: boolean;
    onClick(): void;
    autoDetectedLanguage?: AutoDetectedLanguage;
};

export const Confidence: React.FunctionComponent<ConfidenceProps> = ({
    hasError,
    onClick,
    autoDetectedLanguage,
}) => {
    const T = useTranslation();

    const getDetectedLanguage = useCallback(() => {
        if (!autoDetectedLanguage?.language) {
            return undefined;
        }

        const [detectedLanguage] =
            Object.entries(LanguageCode).find(
                ([, languageCode]) => autoDetectedLanguage?.language === languageCode
            ) || [];

        return detectedLanguage ? `(${detectedLanguage})` : undefined;
    }, [autoDetectedLanguage?.language]);

    return (
        <Container>
            <Percentage>
                {autoDetectedLanguage?.confidence && `${autoDetectedLanguage?.confidence}%`}
            </Percentage>
            <Language
                onClick={() => {
                    if (!hasError) {
                        onClick();
                    }
                }}
                disabled={hasError}>
                {hasError && T.components.message.wentWrong}
                {autoDetectedLanguage?.language && getDetectedLanguage()}
            </Language>
        </Container>
    );
};

const Container = styled.div``;

const Percentage = styled.span`
    color: ${({ theme }) => theme.colors.primary};
`;

const Language = styled.a<LanguageProps>`
    cursor: ${({ disabled }) => (disabled ? undefined : `pointer`)};
    text-decoration: ${({ disabled }) => (disabled ? undefined : `underline`)};
    margin-left: 5px;
    color: ${({ theme, disabled }) => (disabled ? theme.colors.error : theme.colors.primary)};
`;
