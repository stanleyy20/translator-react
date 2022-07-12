import styled from 'styled-components';
import React from 'react';
import {
    LanguageSelect,
    Loader,
    TextInput,
    Confidence,
    ExchangeLanguage,
    TextCounter,
} from 'lib/components';

export const TranslatorScreen: React.FunctionComponent = () => {
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
    align-items: center;
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
