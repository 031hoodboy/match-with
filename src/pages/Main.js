import React, {useState} from 'react';
import styled, {css} from 'styled-components';
import {PageWrapper} from '../components/Pagestyles';
import CircleImg from '../assets/circle.png';
import RegisterImg from '../assets/register.png'
import MatchingImg from '../assets/matching.png'
import TeamImg from '../assets/team.png'
import PersonalRegisterImg from '../assets/personalregister.png'

import {Link} from 'react-router-dom';
import BlackSpanLogoImg from '../assets/black-span-logo.png'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";

SwiperCore.use([Navigation, Pagination])

const Main = () => {

    const [goBack, SetGoBack] = useState(false);

    const onGoBack = () => {
        SetGoBack(!goBack)
    }

    return (
        <PageWrapper>
            <Header>
                <ArrowWrapper onClick={onGoBack} >
                    <Wrapper>
                        <Link to="/profile" style={{textDecoration: "none", color: "#fff", width: "100%", height: "100%", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center"}}>      
                            <Circle/>
                            <Level>Lv. 1</Level>
                            닉네임
                        </Link>
                    </Wrapper>
                    <Wrapper>
                        <Circle>
                            설정
                        </Circle>
                    </Wrapper>
                </ArrowWrapper>
            </Header>
            <SpanLogoBlack/>
            <SwiperWrapper
                    spaceBetween={50}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
            >
                    <SwiperSlide>
                        <Register></Register>
                        <SliderTitleWrapper>
                            <SlideTitle>풋살장 예약</SlideTitle>
                            <SlideSubTitle>
                                우리동네 풋살장을 <br/>
                                쉽고 빠르게 예약해보세요.
                            </SlideSubTitle>
                        </SliderTitleWrapper>
                        <CompletionButton>
                            <Link to="/reservation" style={{textDecoration: "none", color: "#fff", width: "100%", height: "100%", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                예약하기
                            </Link>
                        </CompletionButton>
                    </SwiperSlide>
                    <SwiperSlide>
                    <Matching/>
                        <SliderTitleWrapper>
                            <SlideTitle>경기 매칭</SlideTitle>
                            <SlideSubTitle>
                                경기 매칭에 대한<br/>
                                간랸한 소개 및 설명입니다.
                            </SlideSubTitle>
                        </SliderTitleWrapper>
                        <CompletionButton>
                            <Link to="/matching" style={{textDecoration: "none", color: "#fff", width: "100%", height: "100%", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                매칭하기
                            </Link>
                        </CompletionButton>
                    </SwiperSlide>
                    <SwiperSlide>
                    <Team/>
                        <SliderTitleWrapper>
                            <SlideTitle>팀 등록</SlideTitle>
                            <SlideSubTitle>
                                팀 등록에 대한<br/>
                                간략한 소개 설명입니다.
                            </SlideSubTitle>
                        </SliderTitleWrapper>
                        <CompletionButton>
                            <Link to="/team-register" style={{textDecoration: "none", color: "#fff", width: "100%", height: "100%", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                팀 등록하기
                            </Link>
                        </CompletionButton>
                    </SwiperSlide>
                    <SwiperSlide>
                    <PersonalRegister/>
                        <SliderTitleWrapper>
                            <SlideTitle>개인 등록</SlideTitle>
                            <SlideSubTitle>
                                개인 등록에 대한<br/>
                                간략한 소개 설명입니다.
                            </SlideSubTitle>
                        </SliderTitleWrapper>
                        <CompletionButton>
                            <Link to="/member-info" style={{textDecoration: "none", color: "#fff", width: "100%", height: "100%", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                개인 등록하기
                            </Link>
                        </CompletionButton>
                    </SwiperSlide>
                </SwiperWrapper>
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

const Circle = styled.div`
    width: 24px;
    height: 24px;
    background-image: url(${CircleImg});
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center;
    color: #000;
    font-size: 12px;
`;

const ArrowWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`;

const Wrapper = styled.div`
    display: flex;
`;
const Level = styled.div`
    margin: 0 10px;
`;

const SpanLogoBlack = styled.div`
    width: 70%;
    height: 12vw;
    margin-top: 7vh;
    background-image: url(${BlackSpanLogoImg});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
`;

const CompletionButton = styled.div`
    width: 90vw;
    height: 50px;
    background: #40B65E;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 16px;
    position: absolute;
    bottom: 7vh;
    left: 5%;
    &:active {
      transform: scale(0.98);
    }
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

const SwiperWrapper = styled(Swiper)`
    flex: 1;
    margin: 5vh auto;
    display: none;
    display: flex;
    width: 100vw;
    justify-content: center;

`;

const Register = styled.div`
    width: 50vw;
    height: 50vw;
    background-image: url(${RegisterImg});
    background-size: 100%;
    margin: 0 auto;
    background-repeat: no-repeat;
    background-position: center;
`;

const Matching = styled(Register)`
    background-image: url(${MatchingImg});
`;

const Team = styled(Register)`
    background-image: url(${TeamImg});
`;

const PersonalRegister = styled(Register)`
    background-image: url(${PersonalRegisterImg});
`;

const SliderTitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 15%;
`;

const SlideTitle = styled.div`
    font-size: 26px;
    color: #212226;
`;

const SlideSubTitle = styled.div`
    font-size: 16px;
    color: #4B4C4D;
    text-align: center;
    margin-top: 5%;
`;

export default Main;