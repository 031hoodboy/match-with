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
                    풋살장 예약
                </ArrowWrapper>
            </Header>
            <ResevationBlock>
                <ResevationTitle>예약자 정보</ResevationTitle>
                <BookerWrapper>
                    <NameInput placeholder="이름을 입력해주세요."></NameInput>
                    <ContactInput placeholder="연락처를 입력해주세요."></ContactInput>
                    <TeamInput placeholder="소속 풋살 팀명을입력해주세요."></TeamInput>
                </BookerWrapper>
                <DateTitle>예약자 정보</DateTitle>
                <DateWrapper>
                    <NameInput placeholder="예약 일을 선택해주세요."></NameInput>
                    <TeamInput placeholder="경기 시작 시간을 선택해주세요."></TeamInput>
                </DateWrapper>
                <LocationTitle>지역</LocationTitle>
                <LocationWrapper>
                    <TeamInput placeholder="지역을 선택해주세요."></TeamInput>
                </LocationWrapper>
            </ResevationBlock>
            <Notice>
                * 풋살장 예약은 2시간 단위로 진행됩니다.<br/>
                * 예약현황 공유를 위해 예약자의 개인정보를 수집합니다.
            </Notice>
            <CompletionButton>
                <Link to="/main" style={{textDecoration: "none", color: "#fff", width: "100%", height: "100%", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    예약 신청 완료
                </Link>
            </CompletionButton>
            <BackAltert open={goBack}>
                <Opacity onClick={onGoBack}/>
                <AlertModal>
                    <AlertTitle>
                        풋살장 예약을 중단하시겠습니까?
                    </AlertTitle>
                    <Line/>
                    <AlertSelectWrapper>
                        <AlertSelect onClick={onGoBack}>아니오</AlertSelect>
                        <Link to="/main" style={{textDecoration: "none", color: "#000"}}>
                            <AlertSelect>예</AlertSelect>
                        </Link>
                    </AlertSelectWrapper>
                </AlertModal>
            </BackAltert>
        </PageWrapper>
    )
}

const Header = styled.div`
    width: 90vw;
    height: 9vh;
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
    margin-top: 3px;
`;

const ArrowWrapper = styled.div`
    display: flex;
`;

const ResevationBlock = styled.div`
    width: 100%;
    height: 88vh;
    background: #F2F3F5;
`;

const ResevationTitle = styled.div`
    margin: 18px 5vw 15px 5vw;
    font-size: 14px;
`;

const DateTitle = styled(ResevationTitle)`
    margin: 28px 5vw 15px 5vw;
`;

const LocationTitle = styled(DateTitle)`

`;

const BookerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    border-top: 0.4px solid #707070;
    border-bottom: 0.4px solid #707070;
    background: #fff;
`;

const DateWrapper = styled(BookerWrapper)`

`;

const LocationWrapper = styled(BookerWrapper)`

`;

const NameInput = styled.input`
    border: none;
    outline: none;
    margin: 0 5vw;
    padding: 4vw 0;
    border-bottom: 0.4px solid #707070;
    font-size: 14px;
`;

const ContactInput = styled(NameInput)`

`;

const TeamInput = styled(NameInput)`
    border: none;
`;

const CompletionButton = styled.div`
    width: 90vw;
    height: 50px;
    background: #C9E8D6;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 16px;
    position: fixed;
    bottom: 12vh;
    left: 5%;
    &:active {
      transform: scale(0.98);
    }
`;

const Notice = styled.div`
    position: absolute;
    bottom: 20%;
    font-size: 14px;
    color: #4B4C4D;
    width: 85%;
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