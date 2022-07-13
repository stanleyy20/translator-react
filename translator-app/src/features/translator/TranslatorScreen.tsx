import styled from 'styled-components';
import { APP_CONFIG } from 'lib/config';
import React, { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import {
    LanguageSelect,
    Loader,
    TextInput,
    Confidence,
    ExchangeLanguage,
    TextCounter,
} from 'lib/components';

type TranslatorScreenProps = {
    languages: Array<Language>;
};

import { AutoDetectedLanguage, Language, LanguageCode } from 'lib/models';
import { SelectedLanguage } from './types';
import { useTranslation } from 'lib/hooks';
import { useAutoDetectedLanguage } from './actions';

export const TranslatorScreen: React.FunctionComponent<TranslatorScreenProps> = ({ languages }) => {
    const [selectedLanguage, setSelectedLanguage] = useState<SelectedLanguage>({
        source: LanguageCode.German,
        target: LanguageCode.Polish,
    });

    const T = useTranslation();
    const [querry, setQuerry] = useState<string>('');
    const [autoDetectedLanguage, setAutoDetectedLanguage] = useState<AutoDetectedLanguage>({
        confidence: 80,
        language: LanguageCode.Polish,
    });

    const {
        fetch: detectedLanguage,
        hasError,
        isLoading,
    } = useAutoDetectedLanguage(setAutoDetectedLanguage);

    const debouncedAutoDetectedLanguage = useDebouncedCallback((debouncedQuery) => {
        if (debouncedQuery.length < 5) {
            return;
        }

        if (selectedLanguage.source === LanguageCode.Auto) {
            detectedLanguage(debouncedQuery);
        }
    }, 1000);

    return (
        <Container>
            <TranslatorContainer>
                <InputContainer>
                    <LanguageSelect
                        languages={languages}
                        exclude={[selectedLanguage.target]}
                        onChange={(newCode) => {
                            setSelectedLanguage((prevState) => ({
                                ...prevState,
                                source: newCode,
                            }));
                        }}
                        selectedLanguage={selectedLanguage.source}
                    />
                    <TextInput
                        autoFocus
                        onChangeText={(newQuerry) => {
                            if (newQuerry.length > APP_CONFIG.TEXT_INPUT_LIMIT) {
                                return;
                            }
                            setQuerry(newQuerry);

                            debouncedAutoDetectedLanguage(newQuerry);
                        }}
                        placeholder={T.components.message.placeholderTextArea}
                        value={querry}
                    />
                    <LoaderContainer>{isLoading && <Loader />}</LoaderContainer>
                    <InputFooter>
                        <Confidence
                            hasError={hasError && selectedLanguage.source === LanguageCode.Auto}
                            autoDetectedLanguage={autoDetectedLanguage}
                            onClick={() => {
                                setSelectedLanguage((prevState) => ({
                                    ...prevState,
                                    source: autoDetectedLanguage?.language as LanguageCode,
                                }));

                                setAutoDetectedLanguage({
                                    confidence: 0,
                                    language: LanguageCode.Chinese,
                                });
                            }}
                        />
                        <TextCounter
                            counter={querry.length}
                            textLimit={APP_CONFIG.TEXT_INPUT_LIMIT}
                        />
                    </InputFooter>
                </InputContainer>
                <ExchangeLanguage
                    hidden={selectedLanguage.source === LanguageCode.Auto}
                    onClick={() => {
                        setSelectedLanguage((prevState) => ({
                            source: prevState.target,
                            target: prevState.source,
                        }));
                    }}
                />
                <InputContainer>
                    <LanguageSelect
                        languages={languages}
                        exclude={[selectedLanguage.source, LanguageCode.Auto]}
                        onChange={(newCode) => {
                            setSelectedLanguage((prevState) => ({
                                ...prevState,
                                target: newCode,
                            }));
                        }}
                        selectedLanguage={selectedLanguage.target}
                    />
                    <TextInput disabled />
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
    height: 2px;
`;

const InputFooter = styled.div`
    display: flex;
    justify-content: space-between;
`;
