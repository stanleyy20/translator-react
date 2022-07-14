import React, { Children, ReactNode } from 'react';
import styled from 'styled-components';

type LoaderProps = {
    children?: ReactNode;
};

export const Loader: React.FC<LoaderProps> = ({ children }) => {
    return (
        <Container>
            <ActivityIndicator />
            {children && <ChildrenContainer>{children}</ChildrenContainer>}
        </Container>
    );
};

const ActivityIndicator = styled.div`
    width: 100%;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 6px;
    margin-top: 3px;

    animation: loading 1s linear infinite alternate;

    @keyframes loading {
        0% {
            width: 0;
        }

        100% {
            width: 100%;
        }
    }
`;

const Container = styled.div`
    text-align: center;
    width: 100%;
`;

const ChildrenContainer = styled.div``;
