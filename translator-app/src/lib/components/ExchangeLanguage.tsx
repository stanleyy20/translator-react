import styled from 'styled-components';
import { Images } from 'assets';

export const ExchangeLanguage = () => {
    return <Exchange src={Images.Exchange} />;
};

const Exchange = styled.img`
    cursor: pointer;
    width: 25px;
    height: 25px;
`;
