import React, { useEffect, useState } from 'react';
import NaverLogin from 'react-naver-login';
import styled from 'styled-components';
import {PageWrapper} from '../components/Pagestyles';
import StartLogoImg from '../assets/startlogo.png'
import BlackSpanLogoImg from '../assets/black-span-logo.png'
import {Link} from 'react-router-dom';

const Start = () => {

    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        if (userInfo) {
            const token = localStorage.getItem('com.naver.nid.access_token');
            console.log("access_token", token.slice(7));
            console.log("email", userInfo.data.email);
            console.log("nickname", userInfo.data.nickname);
        }
    }, [userInfo]);

    const responseNaver = (res) => {
        setUserInfo({ data: res });
    }

    return (
        <PageWrapper>
            <StartLogo/>
            <SpanLogoBlack/>
            <SubTitle>
                우리동네 사람들과 쉽고 빠르게 <br/>
                매칭을 시도하세요.
            </SubTitle>
            <NaverRegister>
            <NaverLogin
                clientId="yg7K60lMnvbQ1QYvOXrQ"
                callbackUrl="http://localhost:3000/register"
                onSuccess={responseNaver}
                render={(props) => <div onClick={props.onClick}>NAVER로 로그인</div>}
            />
            </NaverRegister>
            <FaceBookRegister>
                <Link to="/register" style={{textDecoration: "none", color: "#fff", width: "100%", height: "100%", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    페이스북 간편가입
                </Link>
            </FaceBookRegister>
            <KakaoRegister>               
                <Link to="/register" style={{textDecoration: "none", color: "#fff", width: "100%", height: "100%", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    카카오톡 간편가입
                </Link>
            </KakaoRegister>
        </PageWrapper>
    )
}

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
    color: #4B4C4D;
    flex-wrap: wrap;
    text-align: center;
    margin-top: 10%;
`;

const NaverRegister = styled.div`
    width: 90%;
    height: 50px;
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