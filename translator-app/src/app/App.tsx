import styled, { ThemeProvider } from 'styled-components';
import { TranslatorScreen, translatorActions } from 'features/translator';
import { theme } from 'lib/styles';
import { Footer, Header, Loader, Message } from 'lib/components';
import { useEffect, useState } from 'react';
import { Language } from 'lib/models';
import { useTranslation } from 'lib/hooks';

export const App = () => {
    const [languages, setLanguages] = useState<Array<Language>>([]);
    const T = useTranslation();

    const {
        hasError,
        isLoading,
        fetch: getSupportedLanguages,
    } = translatorActions.useSupportedLanguages(setLanguages);

    useEffect(() => {
        getSupportedLanguages();
    }, []);

    const getLayout = () => {
        // if (isLoading) {
        //     return (
        //         <FetchLoaderContainer>
        //             <Loader>
        //                 <LoaderText>{T.screen.translator.loading}</LoaderText>
        //             </Loader>
        //         </FetchLoaderContainer>
        //     );
        // }

        // if (hasError) {
        //     return (
        //         <CenterContainer>
        //             <Message
        //                 message={T.components.message.wentWrong}
        //                 withButton
        //                 onClick={() => getSupportedLanguages()}
        //             />
        //         </CenterContainer>
        //     );
        // }

        // if (languages.length === 0) {
        //     return (
        //         <CenterContainer>
        //             <Message message={T.components.message.noSupport} />
        //         </CenterContainer>
        //     );
        // }

        return <TranslatorScreen languages={languages} />;
    };

    return (
        <ThemeProvider theme={theme}>
            <AppContainer>
                <Header />
                {getLayout()}
                <Footer />
            </AppContainer>
        </ThemeProvider>
    );
};

const AppContainer = styled.div`
    width: 100%;
    height: 100vh;
    background-color: ${({ theme }) => theme.colors.background};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const FetchLoaderContainer = styled.div`
    display: flex;
    align-self: center;
    width: 30%;
    justify-content: center;
`;

const LoaderText = styled.div`
    color: ${({ theme }) => theme.colors.typography};
    margin-top: 10px;
`;

const CenterContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;
