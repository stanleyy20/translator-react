import styled from 'styled-components';
import { Images } from 'assets';
import React from 'react';

type ExchangeLanguageProps = {
    onClick(): void;
    hidden: boolean;
};

export const ExchangeLanguage: React.FunctionComponent<ExchangeLanguageProps> = ({
    onClick,
    hidden,
}) => {
    return (
        <ExchangeContainer>
            {!hidden && <Exchange src={Images.Exchange} onClick={onClick} />}
        </ExchangeContainer>
    );
};

const ExchangeContainer = styled.div`
    width: 22px;
    height: 22px;
    @media (min-width: ${({ theme }) => theme.media.sm}px) {
        width: 100px;
        display: flex;
        justify-content: center;
        flex-direction: row;
    }
    @media (max-width: ${({ theme }) => theme.media.sm}px) {
        height: 100px;
        align-items: center;
        display: flex;
        justify-content: center;
        flex-direction: row;
    }
`;

const Exchange = styled.img`
    cursor: pointer;
    width: 25px;
    height: 25px;
`;
