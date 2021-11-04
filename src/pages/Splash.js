import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SplashImg from '../assets/splash.png';
import SplashTitleImg from '../assets/splashtitle.png';
import { PageWrapper } from '../components/Pagestyles';
import { Redirect } from 'react-router-dom';

const Main = () => {
    const [second, setSeconds] = useState(3);

    useEffect(() => {
        setInterval(
            () => setSeconds((_sec) => (_sec > 0 ? _sec - 1 : 0)),
            1000
        );
    }, [second]);

    return (
        <PageWrapper>
            <Splash>
                <SplashTitle></SplashTitle>
            </Splash>
            {second === 0 ? <Redirect to="/start" /> : null}
        </PageWrapper>
    );
};

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
