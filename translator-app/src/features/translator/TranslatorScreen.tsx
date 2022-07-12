import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import {
    LanguageSelect,
    Loader,
    TextInput,
    Confidence,
    ExchangeLanguage,
    TextCounter,
    Message,
} from 'lib/components';

import { useSupportedLanguages } from './useSupportedLanguages';
import { Language } from 'lib/models';
import { useTranslation } from 'lib/hooks';

export const TranslatorScreen: React.FunctionComponent = () => {
    const T = useTranslation();
    const [languages, setLanguages] = useState<Array<Language>>([]);

    const {
        hasError,
        isLoading,
        fetch: getSupportedLanguages,
    } = useSupportedLanguages(setLanguages);

    useEffect(() => {
        getSupportedLanguages();
    }, []);

    if (isLoading) {
        return (
            <FetchLoaderContainer>
                <Loader>
                    <LoaderText>{T.screen.translator.loading}</LoaderText>
                </Loader>
            </FetchLoaderContainer>
        );
    }

    if (hasError) {
        return (
            <CenterContainer>
                <Message
                    message={T.components.message.tryAgain}
                    withButton
                    onClick={() => getSupportedLanguages()}
                />
            </CenterContainer>
        );
    }

    if (languages.length === 0) {
        return (
            <CenterContainer>
                <Message message={T.components.message.noSupport} />
            </CenterContainer>
        );
    }

    return (
        <Container>
            <TranslatorContainer>
                <InputContainer>
                    <LanguageSelect />
                    <TextInput />
                    <LoaderContainer>
                        <Loader />
                    </LoaderContainer>
                    <InputFooter>
                        <Confidence />
                        <TextCounter />
                    </InputFooter>
                </InputContainer>
                <ExchangeLanguage />
                <InputContainer>
                    <LanguageSelect />
                    <TextInput />
                    <LoaderContainer>
                        <Loader />
                    </LoaderContainer>
                </InputContainer>
            </TranslatorContainer>
        </Container>
    );
};

const Container = styled.div`
    color: ${({ theme }) => theme.colors.typography};
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 70%;
    margin: 0 auto;
    @media (max-width: 1400px) {
        width: 100%;
    }
`;

const TranslatorContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-top: 80px;
    height: 70%;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 5px;
`;

const LoaderContainer = styled.div`
    padding: 5px 10px;
`;

const InputFooter = styled.div`
    display: flex;
    justify-content: space-between;
`;

const FetchLoaderContainer = styled.div`
    display: flex;
    align-self: center;
    width: 30%;
    justify-content: center;
`;

const LoaderText = styled.div`
    color: ${({ theme }) => theme.colors.typography};
    margin-top: 10px;
`;

const CenterContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;
