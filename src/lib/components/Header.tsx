import styled from 'styled-components';
import { useTranslation } from 'lib/hooks';
import { Images } from 'assets';
import { APP_CONFIG } from 'lib/config';

export const Header = () => {
    const T = useTranslation();

    const { github, title } = T.components.header;
    const { GITHUB_URL } = APP_CONFIG;

    return (
        <HeaderContainer>
            <Container>
                <Logo src={Images.Logo} />
                <Title>{title}</Title>
            </Container>
            <Container>
                <Link href={GITHUB_URL} target='_blank'>
                    {github} <i className='fa-brands fa-github'></i>
                </Link>
            </Container>
        </HeaderContainer>
    );
};

const HeaderContainer = styled.header`
    height: 60px;
    background-color: ${({ theme }) => theme.colors.foreground};
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
`;

const Container = styled.div`
    display: flex;
    align-items: center;
`;

const Logo = styled.img`
    width: 36px;
    height: 36px;
    margin-right: 10px;
`;

const Title = styled.h1`
    display: inline;
    font-size: 20px;
    color: ${({ theme }) => theme.colors.typography};
`;

const Link = styled.a`
    color: ${({ theme }) => theme.colors.typography};
    cursor: pointer;
    text-decoration: none;
    font-size: 20px;
    &:hover {
        text-decoration: underline;
    }
`;
