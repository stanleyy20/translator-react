import { useTranslation } from 'lib/hooks';
import styled from 'styled-components';
import { APP_CONFIG } from 'lib/config';

export const Footer = () => {
    const T = useTranslation();
    const { flatIcon, libre } = T.components.footer;

    const year = new Date().getFullYear();

    return (
        <FooterContainer>
            <Container>
                &copy; {year} {T.companyName}
            </Container>
            <LinkContainer>
                <Link href={APP_CONFIG.FLAT_ICON_URL} target='_blank'>
                    {flatIcon}
                </Link>
                <Link href={APP_CONFIG.LIBRE_TRANSLATE_URL} target='_blank'>
                    {libre}
                </Link>
            </LinkContainer>
        </FooterContainer>
    );
};

const FooterContainer = styled.div`
    height: 60px;
    display: flex;
    background-color: ${({ theme }) => theme.colors.foreground};
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    padding: 0 10px;
`;

const Container = styled.div`
    padding-left: 10px;
    color: ${({ theme }) => theme.colors.typography};
`;
const LinkContainer = styled.div``;

const Link = styled.a`
    color: ${({ theme }) => theme.colors.typography};
    cursor: pointer;
    padding: 0 10px;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;
