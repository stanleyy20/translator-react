import styled from 'styled-components';
import React, { useState } from 'react';
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

import { Language, LanguageCode } from 'lib/models';
import { SelectedLanguage } from './types';

export const TranslatorScreen: React.FunctionComponent<TranslatorScreenProps> = ({ languages }) => {
    const [selectedLanguage, setSelectedLanguage] = useState<SelectedLanguage>({
        source: LanguageCode.Auto,
        target: LanguageCode.Polish,
    });

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
                    <TextInput />
                    <LoaderContainer>
                        <Loader />
                    </LoaderContainer>
                    <InputFooter>
                        <Confidence />
                        <TextCounter />
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
