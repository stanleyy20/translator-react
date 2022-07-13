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
    return <>{hidden && <Exchange src={Images.Exchange} onClick={onClick} hidden />}</>;
};

const Exchange = styled.img`
    cursor: pointer;
    width: 25px;
    height: 25px;
`;
