import { Language, LanguageCode } from 'lib/models';
import { useMemo } from 'react';
import styled from 'styled-components';

type LanguageSelectProps = {
    languages: Array<Language>;
    selectedLanguage: LanguageCode;
    exclude: Array<LanguageCode>;
    onChange(newLanguage: LanguageCode): void;
};

export const LanguageSelect: React.FunctionComponent<LanguageSelectProps> = ({
    languages,
    selectedLanguage,
    exclude,
    onChange,
}) => {
    const filteredLanguages = useMemo(
        () =>
            languages
                .filter((language) => !exclude.includes(language.code))
                .map((languages) => ({
                    key: languages.code,
                    label: languages.name,
                })),
        [languages, exclude]
    );

    return (
        <SelectContainer>
            <Select
                value={selectedLanguage}
                onChange={(event) => onChange(event.target.value as LanguageCode)}>
                {filteredLanguages.map((language) => (
                    <Option key={language.key} value={language.key}>
                        {language.label}
                    </Option>
                ))}
            </Select>
        </SelectContainer>
    );
};

const SelectContainer = styled.div`
    max-width: 140px;
    position: relative;
    &::after {
        width: 0;
        height: 0;
        content: '';
        position: absolute;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 4px solid ${({ theme }) => theme.colors.typography};
        right: 10px;
        top: calc(50% - 4px);
    }
`;

const Select = styled.select`
    width: 100%;
    margin-bottom: 10px;
    -webkit-appearance: none;
    border: 0;
    font-size: 14px;
    font-weight: bold;
    background-color: ${({ theme }) => theme.colors.foreground};
    color: ${({ theme }) => theme.colors.typography};
    height: 26px;
    padding: 0 10px;
    border-radius: 8px;
`;

const Option = styled.option``;