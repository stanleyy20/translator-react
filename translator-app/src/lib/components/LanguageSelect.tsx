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
    exclude,
    languages,
    onChange,
    selectedLanguage,
}) => {
    const filteredLanguages = useMemo(
        () =>
            languages
                .filter((language) => exclude.includes(language.code))
                .map((languages) => ({
                    key: languages.code,
                    label: languages.name,
                })),
        [languages, exclude]
    );

    return (
        <Select
            value={selectedLanguage}
            onChange={(event) => onChange(event.target.value as LanguageCode)}>
            {filteredLanguages.map((language) => (
                <Option key={language.key} value={language.key}>
                    {language.label}
                </Option>
            ))}
        </Select>
    );
};

const Select = styled.select`
    max-width: 140px;
    margin-bottom: 10px;
    /* -webkit-appearance: none; */
    border: 0;
    font-size: 14px;
    font-weight: bold;
    background-color: ${({ theme }) => theme.colors.foreground};
    color: ${({ theme }) => theme.colors.typography};
    height: 26px;
    padding: 0 10px;
`;

const Option = styled.option``;
