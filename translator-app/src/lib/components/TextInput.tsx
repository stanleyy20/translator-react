import React, { createRef, useEffect, useState } from 'react';
import styled from 'styled-components';

type TextInputProps = {
    value?: string;
    autoFocus?: boolean;
    disabled?: boolean;
    placeholder?: string;
    onChangeText?(text: string): void;
};

export const TextInput: React.FunctionComponent<TextInputProps> = ({
    autoFocus,
    disabled,
    placeholder,
    value,
    onChangeText,
}) => {
    const inputRef = createRef<HTMLTextAreaElement>();

    useEffect(() => {
        if (!disabled && autoFocus && inputRef.current) {
            inputRef.current.focus;
        }
    }, []);

    return (
        <Container>
            <Input
                autoFocus={autoFocus}
                value={value}
                disabled={disabled}
                ref={inputRef}
                placeholder={disabled ? undefined : placeholder}
                onChange={(event) => {
                    if (onChangeText) {
                        onChangeText(event.target.value);
                        console.log(event.target.value);
                    }
                }}
            />
        </Container>
    );
};

const Input = styled.textarea`
    background-color: ${({ theme }) => theme.colors.input};
    color: ${({ theme }) => theme.colors.typography};
    border: none;
    border-radius: 8px;
    height: 300px;
    width: 400px;
    resize: none;
    font-size: 18px;
    padding: 10px 15px;
`;

const Container = styled.div``;
