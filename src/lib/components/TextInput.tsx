import React, { createRef, useEffect, useState } from 'react';
import styled from 'styled-components';

type InputProps = {
    hasError?: boolean;
};

type TextInputProps = {
    value?: string;
    autoFocus?: boolean;
    disabled?: boolean;
    placeholder?: string;
    onChangeText?(text: string): void;
    hasError?: boolean;
};

export const TextInput: React.FunctionComponent<TextInputProps> = ({
    autoFocus,
    disabled,
    placeholder,
    value,
    onChangeText,
    hasError,
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
                    }
                }}
                hasError={hasError}
            />
        </Container>
    );
};

const Input = styled.textarea<InputProps>`
    background-color: ${({ theme }) => theme.colors.input};
    color: ${({ theme }) => theme.colors.typography};
    border: ${({ hasError, theme }) => (hasError ? `2px solid ${theme.colors.error}` : `none`)};
    border-radius: 8px;
    height: 300px;
    width: 400px;
    resize: none;
    font-size: 18px;
    padding: 10px 15px;
`;

const Container = styled.div``;
