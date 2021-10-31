import React, {useState} from 'react';
import styled, {css, keyframes} from 'styled-components';
import {PageWrapper} from '../components/Pagestyles';
import ArrowImg from '../assets/arrow.png';
import {Link} from 'react-router-dom';
import RightArrowImg from '../assets/rightarrow.png';

const Setting = () => {

    const [logout, setLogout] = useState(false);
    const onLogout = () => {
        setLogout(!logout)
    }

    const [resign, setResign] = useState(false);
    const onResign = () => {
        setResign(!resign)
    }

    return (
        <PageWrapper>
            <Header>
                <Link to="/main" style={{textDecoration: "none", color: "#fff"}}>
                    <ArrowWrapper>
                        <BackArrow/>
                        설정
                    </ArrowWrapper>
                </Link>
            </Header>
            <ResevationBlock>
                <BookerWrapper>
                    <NameInput onClick={onLogout}>로그아웃</NameInput>
                    <TeamInput onClick={onResign}>탈퇴하기</TeamInput>             
                </BookerWrapper>
            </ResevationBlock>
            <Notice>
                Ver. 0.0.0<br/>
                Copyrightⓒ2021 By Match With.
            </Notice>
            <BackAltert open={logout}>
                <Opacity onClick={onLogout}/>
                <AlertModal>
                    <AlertTitle>
                        로그아웃 하시겠습니까?
                    </AlertTitle>
                    <Line/>
                    <AlertSelectWrapper>
                        <AlertSelect onClick={onLogout}>아니오</AlertSelect>
                        <Link to="/" style={{textDecoration: "none", color: "#000"}}>
                            <AlertSelect>예</AlertSelect>
                        </Link>
                    </AlertSelectWrapper>
                </AlertModal>
            </BackAltert>
            <DoneAltert done={resign}>
                <DoneOpacity onClick={onResign}/>
                <AlertModal>
                    <AlertTitle>
                        탈퇴시 기입된 모든 정보가 초기화됩니다.<br/>
                        정말로 탈퇴하시겠습니까?
                    </AlertTitle>
                    <Line/>
                    <AlertSelectWrapper>
                        <AlertSelect onClick={onResign}>아니오</AlertSelect>
                        <Link to="/" style={{textDecoration: "none", color: "#000"}}>
                            <AlertSelect>예</AlertSelect>
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
    margin-top: 33px;
`;

const DateWrapper = styled(BookerWrapper)`

`;

const LocationWrapper = styled(BookerWrapper)`

`;

const NameInput = styled.div`
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
    bottom: 12%;
    font-size: 16px;
    color: #4B4C4D;
    width: 85%;
    line-height: 24px;
    text-align: center;
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


export default Setting;