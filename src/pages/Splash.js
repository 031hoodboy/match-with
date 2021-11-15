import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { Client, PageWrapper } from '..';
import SplashImg from '../assets/splash.png';
import SplashTitleImg from '../assets/splashtitle.png';

export const Splash = () => {
    const [second, setSeconds] = useState(1);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        setInterval(
            () => setSeconds((_sec) => (_sec > 0 ? _sec - 1 : 0)),
            1000
        );
    }, [second]);

    useEffect(() => {
        Client.get('/auth')
            .then(({ data }) => setUser(data.user))
            .finally(() => setLoading(false));
    }, []);

    return (
        <PageWrapper>
            <SplashContainer>
                <SplashTitle />
            </SplashContainer>
            {!loading && second === 0 ? (
                <Redirect to={user ? '/main' : '/start'} />
            ) : null}
        </PageWrapper>
    );
};

const SplashContainer = styled.div`
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
