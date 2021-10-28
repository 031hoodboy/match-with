import React from 'react';
import styled from 'styled-components';
import {PageWrapper} from '../components/Pagestyles';
import StartLogoImg from '../assets/startlogo.png'
import BlackSpanLogoImg from '../assets/black-span-logo.png'


const Start = () => {
    return (
        <PageWrapper>
            <StartLogo/>
            <SpanLogoBlack/>
            <SubTitle>
                우리동네 사람들과 쉽고 빠르게 <br/>
                매칭을 시도하세요.
            </SubTitle>
            <NaverRegister>네이버 간편가입</NaverRegister>
            <FaceBookRegister>페이스북 간편가입</FaceBookRegister>
            <KakaoRegister>카카오톡 간편가입</KakaoRegister>
        </PageWrapper>
    )
}

const StartLogo = styled.div`
    width: 60vw;
    height: 60vw;
    margin: 30% 0 10% 0;
    background-image: url(${StartLogoImg});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
`;

const SpanLogoBlack = styled.div`
    width: 50%;
    height: 10vw;
    background-image: url(${BlackSpanLogoImg});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
`;

const SubTitle = styled.div`
    width: 60%;
    font-size: 16px;
    color: #4B4C4D;
    flex-wrap: wrap;
    text-align: center;
    margin-top: 10%;
`;

const NaverRegister = styled.div`
    width: 80%;
    height: 5%;
    background: #07CF59;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    margin-top: 20%;
`;

const FaceBookRegister = styled(NaverRegister)`
    background: #395BA1;
    margin: 5% 0;
`;

const KakaoRegister = styled(NaverRegister)`
    background: #FEE027;
    margin: 0;
`;


export default Start;