import React from 'react';
import styled from 'styled-components';
import {PageWrapper} from '../components/Pagestyles';
import ArrowImg from '../assets/arrow.png';

const MemberInfo = () => {
    return (
        <PageWrapper>
            <Header>
                <BackArrow/>
                기본 정보
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

export default MemberInfo;