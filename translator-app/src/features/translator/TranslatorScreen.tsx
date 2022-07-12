import styled from 'styled-components';
import React from 'react';
// import { useTranslation } from 'lib/hooks';

export const TranslatorScreen: React.FunctionComponent = () => {
    return <Container>Hello world !!</Container>;
};

const Container = styled.div`
    color: ${({ theme }) => theme.colors.typography};
    display: flex;
    flex-direction: column;
    flex: 1;
`;
