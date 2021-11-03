import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { endpoint } from '..';
import BlackSpanLogoImg from '../assets/black-span-logo.png';
import StartLogoImg from '../assets/startlogo.png';
import { PageWrapper } from '../components/Pagestyles';

const Start = () => {
    const onLoginWithNaver = async () => {
        const { data } = await axios(`${endpoint}/auth/naver/redirectUri`);
        window.location.href = data.redirectUri;
    };

    return (
        <PageWrapper>
            <StartLogo />
            <SpanLogoBlack />
            <SubTitle>
                우리동네 사람들과 쉽고 빠르게 <br />
                매칭을 시도하세요.
            </SubTitle>
            <NaverRegister>
                <p
                    onClick={onLoginWithNaver}
                    style={{
                        textDecoration: 'none',
                        color: '#fff',
                        width: '100%',
                        height: '100%',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    네이버 간편가입
                </p>
            </NaverRegister>
            <FaceBookRegister>
                <Link
                    to="/register"
                    style={{
                        textDecoration: 'none',
                        color: '#fff',
                        width: '100%',
                        height: '100%',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    페이스북 간편가입
                </Link>
            </FaceBookRegister>
            <KakaoRegister>
                <Link
                    to="/register"
                    style={{
                        textDecoration: 'none',
                        color: '#fff',
                        width: '100%',
                        height: '100%',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    카카오톡 간편가입
                </Link>
            </KakaoRegister>
        </PageWrapper>
    );
};

const StartLogo = styled.div`
    width: 60vw;
    height: 60vw;
    margin: 24% 0 10% 0;
    background-image: url(${StartLogoImg});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
`;

const SpanLogoBlack = styled.div`
    width: 50%;
    height: 10vw;
    background-image: url(${BlackSpanLogoImg});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
`;

const SubTitle = styled.div`
    width: 60%;
    font-size: 16px;
    color: #4b4c4d;
    flex-wrap: wrap;
    text-align: center;
    margin-top: 10%;
`;

const NaverRegister = styled.div`
    width: 90%;
    height: 50px;
    background: #07cf59;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    margin-top: 20%;
    &:active {
        transform: scale(0.98);
    }
`;

const FaceBookRegister = styled(NaverRegister)`
    background: #395ba1;
    margin: 3.5% 0;
`;

const KakaoRegister = styled(NaverRegister)`
    background: #fee027;
    margin: 0;
`;

export default Start;
