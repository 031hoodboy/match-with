import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {PageWrapper} from '../components/Pagestyles';
import StartLogoImg from '../assets/startlogo.png'
import BlackSpanLogoImg from '../assets/black-span-logo.png'
import {Link} from 'react-router-dom';

const Start = () => {

    return (
        <PageWrapper>
            <StartLogo/>
            <SpanLogoBlack/>
            <SubTitle>
                우리동네 사람들과 쉽고 빠르게 <br/>
                매칭을 시도하세요.
            </SubTitle>
            <NaverRegister>
                <Link to="/member-info" style={{textDecoration: "none", color: "#fff", width: "100%", height: "100%", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    네이버 간편가입
                </Link>
            </NaverRegister>
            <FaceBookRegister>
                <Link to="/member-info" style={{textDecoration: "none", color: "#fff", width: "100%", height: "100%", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    페이스북 간편가입
                </Link>
            </FaceBookRegister>
            <KakaoRegister>               
                <Link to="/member-info" style={{textDecoration: "none", color: "#fff", width: "100%", height: "100%", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    카카오톡 간편가입
                </Link>
            </KakaoRegister>
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
    background-size: contain;
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
    height: 5.5%;
    background: #07CF59;
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
    background: #395BA1;
    margin: 3.5% 0;
`;

const KakaoRegister = styled(NaverRegister)`
    background: #FEE027;
    margin: 0;
`;


export default Start;