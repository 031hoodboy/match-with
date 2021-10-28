import React from 'react';
import styled from 'styled-components';
import SplashImg from '../assets/splash.png'
import SplashTitleImg from '../assets/splashtitle.png'

const Main = () => {
    return (
        <PageWrapper>
            <Splash>
                <SplashTitle></SplashTitle>
            </Splash>
        </PageWrapper>
    )
}

const PageWrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Splash = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(${SplashImg});
    background-size: 140%;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const SplashTitle = styled.div`
    width: 80%;
    height: 100%;
    background-image: url(${SplashTitleImg});
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

export default Main;