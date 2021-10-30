import React, {useState} from 'react';
import styled, {css, keyframes} from 'styled-components';
import {PageWrapper} from '../components/Pagestyles';
import ArrowImg from '../assets/arrow.png';
import {Link} from 'react-router-dom';
import RightArrowImg from '../assets/rightarrow.png';

const Reservation = () => {

    const [goBack, SetGoBack] = useState(false);
    const onGoBack = () => {
        SetGoBack(!goBack)
    }

    const [done, setDone] = useState(false);
    const onDone = () => {
        setDone(!done)
    }

    return (
        <PageWrapper>
            <Header>
                <ArrowWrapper onClick={onGoBack} >
                    <BackArrow/>
                    팀 등록
                </ArrowWrapper>
            </Header>
            <ResevationBlock>
                <ResevationTitle>팀 명</ResevationTitle>
                <BookerWrapper>
                    <TeamInput placeholder="팀 명을입력해주세요."></TeamInput>
                </BookerWrapper>
                <DateTitle>팀 대표</DateTitle>
                <DateWrapper>
                    <Link to="/location" style={{textDecoration: "none"}}>
                        <TimeInput>
                            <InputTitle>팀 대표 정보를 입력해주세요.</InputTitle>
                            <RightArrow/>
                        </TimeInput>
                    </Link>
                </DateWrapper>
                <LocationTitle>팀 동료</LocationTitle>
                <LocationWrapper>
                    <Link to="/location" style={{textDecoration: "none"}}>
                        <TimeInput>
                            <InputTitle>팀 동료 정보를 입력해주세요.</InputTitle>
                            <RightArrow/>
                        </TimeInput>
                    </Link>
                </LocationWrapper>
            </ResevationBlock>
            <Notice>
                * 팀 등록에 대한 안내 및 주의사항입니다.<br/>
                * 매칭 연결를 위해 팀 원들의 개인정보를 수집합니다.
            </Notice>
            <CompletionButton onClick={onDone}>
                팀 등록 완료
            </CompletionButton>
            <BackAltert open={goBack}>
                <Opacity onClick={onGoBack}/>
                <AlertModal>
                    <AlertTitle>
                        팀 등록을 중단하시겠습니까?
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
            <DoneAltert done={done}>
                <DoneOpacity onClick={onDone}/>
                <AlertModal>
                    <AlertTitle>
                        신청하신 예약정보 확인 후 <br/>
                        카카오톡으로 안내 드리겠습니다.
                    </AlertTitle>
                    <Line/>
                    <AlertSelectWrapper>
                        <Link to="/main" style={{textDecoration: "none", color: "#000"}}>
                            <AlertSelect>확인</AlertSelect>
                        </Link>
                    </AlertSelectWrapper>
                </AlertModal>
            </DoneAltert>
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
    color: #4B4C4D;
    ::placeholder {color:#4B4C4D;}
`;

const ContactInput = styled(NameInput)`

`;

const TeamInput = styled(NameInput)`
    border: none;
`;

const DateInput = styled.div`
    display: flex;
    margin: 0 5vw;
    padding: 4vw 0;
    border-bottom: 0.4px solid #707070;
    align-items: center;
    justify-content: space-between;
`;

const TimeInput = styled(DateInput)`
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
    line-height: 24px;
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

const RightArrow= styled.div`
    width: 8px;
    height: 16px;
    background-image: url(${RightArrowImg});
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center;
    margin-right: 8px;
`;

const InputTitle = styled.div`
    font-size: 14px;
    color: #4B4C4D;
`;


const DoneAltert = styled(BackAltert)`
    ${props => props.done && css`
        display:flex;
    `}
`;

const DoneOpacity = styled.div`
    width: 100vw;
    height: 100vh;
    background: #000;
    opacity: 0.2;
    z-index: 2;
`;


export default Reservation;