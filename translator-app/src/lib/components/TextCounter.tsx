import styled from 'styled-components';

type TextCounterProps = {
    counter: number;
    textLimit: number;
};

export const TextCounter: React.FunctionComponent<TextCounterProps> = ({ counter, textLimit }) => {
    return (
        <Counter>
            {counter}/{textLimit}
        </Counter>
    );
};

const Counter = styled.div`
    color: ${({ theme }) => theme.colors.typography};
`;
