import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import { Client } from '..';
import BlackSpanLogoImg from '../assets/black-span-logo.png';
import MatchingImg from '../assets/matching.png';
import PersonalRegisterImg from '../assets/personalregister.png';
import ProfielImg from '../assets/profile.png';
import RegisterImg from '../assets/register.png';
import SettingImg from '../assets/setting.png';
import TeamImg from '../assets/team.png';

SwiperCore.use([Navigation, Pagination]);

export const Main = () => {
    const [goBack, SetGoBack] = useState(false);
    const onGoBack = () => SetGoBack(!goBack);

    const [level, setLevel] = useState(null);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await Client.get('/auth');
            setLevel(result.data.user.level);
            setUsername(result.data.user.username);
        };
        fetchData();
    }, []);

    return (
        <PageWrapper>
            <Header>
                <ArrowWrapper onClick={onGoBack}>
                    <Wrapper>
                        <Link
                            to="/profile"
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
                            <Circle />
                            <Level>Lv. {level}</Level>
                            {username}
                        </Link>
                    </Wrapper>
                    <Wrapper>
                        <Link
                            to="/setting"
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
                            <Setting />
                        </Link>
                    </Wrapper>
                </ArrowWrapper>
            </Header>
            <SpanLogoBlack />
            <SwiperWrapper
                spaceBetween={50}
                slidesPerView={1}
                pagination={{ clickable: true }}
            >
                <SwiperSlide>
                    <Register></Register>
                    <SliderTitleWrapper>
                        <SlideTitle>????????? ??????</SlideTitle>
                        <SlideSubTitle>
                            ???????????? ???????????? <br />
                            ?????? ????????? ??????????????????.
                        </SlideSubTitle>
                    </SliderTitleWrapper>
                    <CompletionButton>
                        <Link
                            to="/reservation"
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
                            ????????????
                        </Link>
                    </CompletionButton>
                </SwiperSlide>
                <SwiperSlide>
                    <Matching />
                    <SliderTitleWrapper>
                        <SlideTitle>?????? ??????</SlideTitle>
                        <SlideSubTitle>
                            ?????? ?????? ?????? ??????
                            <br />
                            ??????????????? ????????? ?????????.
                        </SlideSubTitle>
                    </SliderTitleWrapper>
                    <CompletionButton>
                        <Link
                            to="/matching"
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
                            ????????????
                        </Link>
                    </CompletionButton>
                </SwiperSlide>
                <SwiperSlide>
                    <Team />
                    <SliderTitleWrapper>
                        <SlideTitle>??? ??????</SlideTitle>
                        <SlideSubTitle>
                            ????????? ???????????? ????????????
                            <br />
                            ????????? ????????? ????????? ???????????????.
                        </SlideSubTitle>
                    </SliderTitleWrapper>
                    <CompletionButton>
                        <Link
                            to="/team-register"
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
                            ??? ????????????
                        </Link>
                    </CompletionButton>
                </SwiperSlide>
                <SwiperSlide>
                    <PersonalRegister />
                    <SliderTitleWrapper>
                        <SlideTitle>?????? ??????</SlideTitle>
                        <SlideSubTitle>
                            ?????? ???????????? ???????????? ??????
                            <br />
                            ???????????? ?????? ?????? ????????? ???????????????.
                        </SlideSubTitle>
                    </SliderTitleWrapper>
                    <CompletionButton>
                        <Link
                            to="/member-info"
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
                            ?????? ????????????
                        </Link>
                    </CompletionButton>
                </SwiperSlide>
            </SwiperWrapper>
        </PageWrapper>
    );
};

const PageWrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Header = styled.div`
    width: 90vw;
    height: 8vh;
    padding: 3% 5%;
    background: #40b65e;
    display: flex;
    align-items: flex-end;
    font-size: 15px;
    color: #fff;
    box-shadow: rgb(0 0 0 / 10%) 0px 3px 6px;
`;

const Circle = styled.div`
    width: 24px;
    height: 24px;
    background-image: url(${ProfielImg});
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center;
    color: #000;
    font-size: 12px;
`;

const Setting = styled.div`
    width: 24px;
    height: 24px;
    background-image: url(${SettingImg});
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
    margin: 0 7px;
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
    background: #40b65e;
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
    @media screen and (max-height: 645px) {
        margin-top: 5%;
    }
`;

const SlideTitle = styled.div`
    font-size: 26px;
    color: #212226;
`;

const SlideSubTitle = styled.div`
    font-size: 16px;
    color: #4b4c4d;
    text-align: center;
    margin-top: 5%;
`;
