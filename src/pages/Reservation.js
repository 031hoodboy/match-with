import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Client } from '../client';
import Location from '../components/Location';
import {
    AlertModal,
    AlertSelect,
    AlertSelectWrapper,
    AlertTitle,
    ArrowWrapper,
    BackAltert,
    BackArrow,
    ButtonInput,
    CalenderModal,
    CalenderOpacity,
    CompletionButton,
    DoneAltert,
    DoneOpacity,
    FirstInputBlockTitle,
    Header,
    InputBlockTitle,
    InputBlockWrapper,
    InputTitle,
    LastButtonInput,
    Line,
    LocationBlock,
    Notice,
    Opacity,
    PageBlock,
    PageWrapper,
    RightArrow,
    TimeModal,
    TimeOpacity,
} from '../components/Pagestyles';
import styled from 'styled-components';

const Reservation = () => {
    const [goBack, SetGoBack] = useState(false);
    const onGoBack = () => {
        SetGoBack(!goBack);
    };

    const [done, setDone] = useState(false);
    const onDone = () => {
        setDone(!done);
    };

    const [date, setDate] = useState(null);
    const dateHandler = (e) => {
        e.preventDefault();
        setDate(e.target.value);
    };

    const [time, setTime] = useState(null);
    const timeHandler = (e) => {
        e.preventDefault();
        setTime(e.target.value);
    };

    const [calender, setCalender] = useState(false);
    const onCalender = () => setCalender(!calender);

    const [timer, setTimer] = useState(false);
    const onTimer = () => setTimer(!timer);

    const [locations, setLocations] = useState([]);
    const [locationOpen, setLocationOpen] = useState(true);
    const onLocationOpen = () => setLocationOpen(!locationOpen);

    const [level, setLevel] = useState(null);
    const [username, setUsername] = useState(null);
    const [phoneNo, setPhoneNo] = useState(null);
    const [regionName, setRegionName] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await Client.get('/auth');
            console.log(result.data.locations);
            setLevel(result.data.user.level);
            setUsername(result.data.user.username);
            setPhoneNo(result.data.user.phoneNo);
            setRegionName(result.data.user.regionName);
        };

        fetchData();
    }, []);

    const onReservation = async () => {
        const reservationInfo = {
            startDate: date,
            startTime: time,
            regionNames: locations,
        };
        try {
            const { data } = await Client.post(
                `/reservations`,
                reservationInfo
            );
            console.log(data);
        } catch (err) {
            console.log('error');
        }
    };

    const ButtonClick = () => {
        onDone();
        onReservation();
    };

    return (
        <PageWrapper>
            <Header>
                <ArrowWrapper onClick={onGoBack}>
                    <BackArrow />
                    풋살장 예약
                </ArrowWrapper>
            </Header>
            <PageBlock>
                <FirstInputBlockTitle>예약자 정보</FirstInputBlockTitle>
                <InputBlockWrapper>
                    <ButtonInput>
                        <InputTitle>
                            {username ? `${username}` : '이름을 입력해주세요.'}
                        </InputTitle>
                    </ButtonInput>
                    <ButtonInput style={{ border: 'none' }}>
                        <InputTitle>
                            {phoneNo ? `${phoneNo}` : '연락처를 입력해주세요.'}
                        </InputTitle>
                    </ButtonInput>
                </InputBlockWrapper>
                <InputBlockTitle>예약 일시</InputBlockTitle>
                <InputBlockWrapper>
                    <label>
                        <ButtonInput>
                            {date ? date : '예약 일을 선택해주세요.'}
                            <TimeInputWithIcon
                                type="date"
                                id="start"
                                name="start"
                                onChange={dateHandler}
                            />
                        </ButtonInput>
                    </label>
                    <Link to="/reservation" style={{ textDecoration: 'none' }}>
                        <label>
                            <LastButtonInput>
                                <InputTitle>
                                    {time
                                        ? time
                                        : '경기 시작 시간을 선택해주세요.'}
                                </InputTitle>
                                <TimeInputWithIcon
                                    type="time"
                                    id="start"
                                    name="start"
                                    onChange={timeHandler}
                                />
                            </LastButtonInput>
                        </label>
                    </Link>
                </InputBlockWrapper>
                <InputBlockTitle>지역</InputBlockTitle>
                <InputBlockWrapper>
                    <LastButtonInput onClick={onLocationOpen}>
                        <InputTitle>
                            {locations.length <= 0
                                ? '지역을 선택해주세요.'
                                : `${locations.slice(
                                      locations.length - 1
                                  )} 외 ${locations.length - 1}개`}
                        </InputTitle>
                        <RightArrow />
                    </LastButtonInput>
                </InputBlockWrapper>
                <Notice>
                    * 풋살장 예약은 2시간 단위로 진행됩니다.
                    <br />* 예약현황 공유를 위해 예약자의 개인정보를 수집합니다.
                </Notice>
            </PageBlock>
            <CompletionButton onClick={ButtonClick}>
                예약 신청 완료
            </CompletionButton>
            <BackAltert open={goBack}>
                <Opacity onClick={onGoBack} />
                <AlertModal>
                    <AlertTitle>풋살장 예약을 중단하시겠습니까?</AlertTitle>
                    <Line />
                    <AlertSelectWrapper>
                        <AlertSelect onClick={onGoBack}>아니오</AlertSelect>
                        <Link
                            to="/main"
                            style={{ textDecoration: 'none', color: '#000' }}
                        >
                            <AlertSelect>예</AlertSelect>
                        </Link>
                    </AlertSelectWrapper>
                </AlertModal>
            </BackAltert>
            <DoneAltert done={done}>
                <Link
                    to="/main"
                    style={{ textDecoration: 'none', color: '#000' }}
                >
                    <DoneOpacity />
                </Link>
                <AlertModal>
                    <AlertTitle>
                        신청하신 예약정보 확인 후 <br />
                        카카오톡으로 안내 드리겠습니다.
                    </AlertTitle>
                    <Line />
                    <AlertSelectWrapper>
                        <Link
                            to="/main"
                            style={{ textDecoration: 'none', color: '#000' }}
                        >
                            <AlertSelect>확인</AlertSelect>
                        </Link>
                    </AlertSelectWrapper>
                </AlertModal>
            </DoneAltert>
            <CalenderModal calender={calender}>
                <CalenderOpacity onClick={onCalender} />
                <AlertModal></AlertModal>
            </CalenderModal>
            <TimeModal timer={timer}>
                <TimeOpacity onClick={onTimer} />
                <AlertModal>
                    <input
                        type="time"
                        id="start"
                        name="start"
                        onChange={timeHandler}
                    />
                </AlertModal>
            </TimeModal>
            <LocationBlock>
                <Location
                    locationOpen={locationOpen}
                    onLocationOpen={onLocationOpen}
                    locations={locations}
                    setLocations={setLocations}
                />
            </LocationBlock>
        </PageWrapper>
    );
};

const TimeInputWithIcon = styled.input`
    border: none;
    background: transparent;
    outline: none;
    /* width: 30px; */
    color: transparent;
    &::after {
        content: '클릭해주세요';
        color: #40b65e;
        display: block;
        white-space: nowrap;
    }
`;

export default Reservation;
