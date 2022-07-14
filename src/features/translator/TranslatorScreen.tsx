import styled from 'styled-components';
import { APP_CONFIG } from 'lib/config';
import React from 'react';
import { Language, LanguageCode } from 'lib/models';
import { useTranslation } from 'lib/hooks';
import { useLibreTranslare } from './useLibreTranslare';
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

export const TranslatorScreen: React.FunctionComponent<TranslatorScreenProps> = ({ languages }) => {
    const T = useTranslation();

    const {
        selectedLanguage,
        debouncedAction,
        hasErroDetectedLanguage,
        setQuerry,
        setSelectedLanguage,
        autoDetectedLanguage,
        hasErrorTranslatingText,
        isLoadingDetectedLanguage,
        isTranslatingText,
        querry,
        translatedText,
        setAutoDetectedLanguage,
        setTranslatedText,
    } = useLibreTranslare();

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
                            debouncedAction();
                        }}
                        placeholder={T.components.message.placeholderTextArea}
                        value={querry}
                    />
                    <LoaderContainer>{isLoadingDetectedLanguage && <Loader />}</LoaderContainer>
                    <InputFooter>
                        <Confidence
                            hasError={
                                hasErroDetectedLanguage &&
                                selectedLanguage.source === LanguageCode.Auto
                            }
                            autoDetectedLanguage={autoDetectedLanguage}
                            onClick={() => {
                                setSelectedLanguage((prevState) => ({
                                    ...prevState,
                                    source: autoDetectedLanguage?.language as LanguageCode,
                                }));

                                setAutoDetectedLanguage(undefined);
                                debouncedAction();
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
                        setQuerry('');
                        setTranslatedText('');
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
                    <TextInput disabled value={translatedText} hasError={hasErrorTranslatingText} />
                    <LoaderContainer>{isTranslatingText && <Loader />}</LoaderContainer>
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
`;

const TranslatorContainer = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 100px;
    height: 70%;
    @media (min-width: ${({ theme }) => theme.media.sm}px) {
        justify-content: center;
        gap: 30px;
    }

    @media (max-width: ${({ theme }) => theme.media.sm}px) {
        flex-direction: column;
        align-items: center;
    }
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 5px;
`;

const LoaderContainer = styled.div`
    padding: 5px 10px;
    height: 2px;
    margin-bottom: 2px;
`;

const InputFooter = styled.div`
    display: flex;
    justify-content: space-between;
`;
