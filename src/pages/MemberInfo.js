import React, {useState} from 'react';
import styled, {css, keyframes} from 'styled-components';
import {PageWrapper} from '../components/Pagestyles';
import ArrowImg from '../assets/arrow.png';
import {Link} from 'react-router-dom';

const MemberInfo = () => {

    const [goBack, SetGoBack] = useState(false);

    const onGoBack = () => {
        SetGoBack(!goBack)
    }

    return (
        <PageWrapper>
            <Header>
                <ArrowWrapper onClick={onGoBack} >
                    <BackArrow/>
                    기본 정보
                </ArrowWrapper>
            </Header>
            <InfoInuptWrapper>
                <Nikname>
                    <NiknameTitle>닉네임</NiknameTitle>
                    <NiknameInput placeholder="닉네임을 입력해주세요"></NiknameInput>
                </Nikname>
                <PhoneNumber>
                    <PhoneNumberTitle>전화번호</PhoneNumberTitle>
                    <PhoneInputWrapper>
                        <PhoneInput placeholder="전화번호를 입력해주세요"></PhoneInput>
                        <PhoneButton>인증요청</PhoneButton>
                    </PhoneInputWrapper>
                </PhoneNumber>
                <CertifyWrapper>
                    <CertifyInput placeholder="인증번호를 입력해주세요">

                    </CertifyInput>
                </CertifyWrapper>
            </InfoInuptWrapper>
            <CompletionButton>회원가입 완료</CompletionButton>
            <BackAltert open={goBack}>
                <Opacity onClick={onGoBack}/>
                <AlertModal>
                    <AlertTitle>
                        회원가입을 중단하시겠습니까?
                    </AlertTitle>
                    <Line/>
                    <AlertSelectWrapper>
                        <AlertSelect onClick={onGoBack}>아니오</AlertSelect>
                        <Link to="/start" style={{textDecoration: "none", color: "#000"}}>
                            <AlertSelect>예</AlertSelect>
                        </Link>
                    </AlertSelectWrapper>
                </AlertModal>
            </BackAltert>
        </PageWrapper>
    )
}

const Header = styled.div`
    width: 90%;
    height: 9%;
    padding: 3% 5%;
    background: #40B65E;
    display: flex;
    align-items: flex-end;
    font-size: 15px;
    color: #fff;
    box-shadow: rgb(0 0 0 / 10%) 0px 3px 6px;
`;

const BackArrow = styled.div`
    width: 8px;
    height: 16px;
    background-image: url(${ArrowImg});
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center;
    margin-right: 20px;
`;

const ArrowWrapper = styled.div`
    display: flex;
`;

const InfoInuptWrapper = styled.div`

`;

const Nikname = styled.div`
    margin: 20px auto;
`;

const NiknameTitle = styled.div`

`;

const NiknameInput = styled.input`
    border: none;
    outline: none;
    font-size: 14px;
    padding: 20px 0;
    width: 90vw;
    border-bottom: 1px solid #AFB4BE;
`;

const PhoneNumber = styled.div`
    margin: 10px auto;
`;

const PhoneNumberTitle = styled.div`
    margin-top: 30px;
`;

const PhoneInputWrapper = styled.div`
    display: flex;
    width: 90vw;
    align-items: flex-end;
`;

const PhoneInput = styled(NiknameInput)`
    width: 65%;
`;

const PhoneButton = styled.div`
    width: 30%;
    height: 50px;
    background: #C9E8D6;
    border-radius: 100px;
    color: #fff;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 5%;
`;

const CertifyWrapper = styled.div`

`;

const CertifyInput = styled(NiknameInput)`

`;

const CompletionButton = styled.div`
    width: 90%;
    height: 50px;
    background: #40B65E;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 16px;
    position: absolute;
    bottom: 12%;
`;

const BackAltert = styled.div`
    position: absolute;
    display: none;
    ${props => props.open && css`
        display:flex;
    `}
`;

const Opacity = styled.div`
    width: 100vw;
    height: 100vh;
    background: #000;
    opacity: 0.2;
    z-index: 2;
`;

const AlertModal = styled.div`
    width: 80vw;
    height: 15vh;
    padding: 0vw 5vw;
    background: #fff;
    z-index: 3;
    position: absolute;
    top: 40%;
    left: 5%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    text-align: center;
`;

const Line = styled.div`
    width: 100%;
    margin-top: 7%;
    border-bottom: 1px solid #707070;
`;

const AlertTitle = styled.div`
    margin-top: 7%;
`;

const AlertSelectWrapper = styled.div`
    width: 100%;
    display: flex;
    text-align: center;
    justify-content: space-around;
    margin-bottom: 7%;
`;

const AlertSelect = styled.div`
    width: 100px;
    height: 200%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default MemberInfo;