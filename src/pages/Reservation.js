import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
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
    Client,
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
    Location,
    LocationBlock,
    Notice,
    Opacity,
    PageBlock,
    PageWrapper,
    RightArrow,
    TimeModal,
    TimeOpacity,
    ButtonWrapper,
} from '..';

export const Reservation = () => {
    const [goBack, SetGoBack] = useState(false);
    const onGoBack = () => SetGoBack(!goBack);

    const [done, setDone] = useState(false);
    const onDone = () => setDone(!done);

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

    const [locations, setLocations] = useState([null]);
    const [locationOpen, setLocationOpen] = useState(true);
    const onLocationOpen = () => setLocationOpen(!locationOpen);

    const [, setLevel] = useState(null);
    const [username, setUsername] = useState(null);
    const [phoneNo, setPhoneNo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await Client.get('/auth');
            setLevel(result.data.user.level);
            setUsername(result.data.user.username);
            setPhoneNo(result.data.user.phoneNo);
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
            await Client.post(`/reservations`, reservationInfo);
        } catch (err) {
            throw err;
        }
    };

    const ButtonClick = async () => {
        try {
            await onReservation();
            onDone();
        } catch (e) {}
    };

    return (
        <PageWrapper>
            <Header>
                <ArrowWrapper onClick={onGoBack}>
                    <BackArrow />
                    ????????? ??????
                </ArrowWrapper>
            </Header>
            <PageBlock>
                <FirstInputBlockTitle>????????? ??????</FirstInputBlockTitle>
                <InputBlockWrapper>
                    <ButtonInput>
                        <InputTitle>
                            {username ? `${username}` : '????????? ??????????????????.'}
                        </InputTitle>
                    </ButtonInput>
                    <ButtonInput style={{ border: 'none' }}>
                        <InputTitle>
                            {phoneNo ? `${phoneNo}` : '???????????? ??????????????????.'}
                        </InputTitle>
                    </ButtonInput>
                </InputBlockWrapper>
                <InputBlockTitle>?????? ??????</InputBlockTitle>
                <InputBlockWrapper>
                    <label>
                        <ButtonInput>
                            {date ? date : '?????? ?????? ??????????????????.'}
                            <TimeInputWithIcon
                                type="date"
                                id="start"
                                name="start"
                                onChange={dateHandler}
                            />
                        </ButtonInput>
                    </label>
                    <label>
                        <LastButtonInput>
                            <InputTitle>
                                {time ? time : '?????? ?????? ????????? ??????????????????.'}
                            </InputTitle>
                            <TimeInputWithIcon
                                type="time"
                                id="start"
                                name="start"
                                onChange={timeHandler}
                            />
                        </LastButtonInput>
                    </label>
                </InputBlockWrapper>
                <InputBlockTitle>??????</InputBlockTitle>
                <InputBlockWrapper>
                    <LastButtonInput onClick={onLocationOpen}>
                        <InputTitle>
                            {locations[0] === null
                                ? '????????? ??????????????????.'
                                : locations.length <= 1
                                ? locations[0]
                                : `${locations.slice(
                                      locations.length - 1
                                  )} ??? ${locations.length - 1}???`}
                        </InputTitle>
                        <RightArrow />
                    </LastButtonInput>
                </InputBlockWrapper>
                <Notice>
                    * ????????? ????????? 2?????? ????????? ???????????????.
                    <br />* ???????????? ????????? ?????? ???????????? ??????????????? ???????????????.
                </Notice>
                <ButtonWrapper>
                    <CompletionButton onClick={ButtonClick}>
                        ?????? ?????? ??????
                    </CompletionButton>
                </ButtonWrapper>
            </PageBlock>

            <BackAltert open={goBack}>
                <Opacity onClick={onGoBack} />
                <AlertModal>
                    <AlertTitle>????????? ????????? ?????????????????????????</AlertTitle>
                    <Line />
                    <AlertSelectWrapper>
                        <AlertSelect onClick={onGoBack}>?????????</AlertSelect>
                        <Link
                            to="/main"
                            style={{ textDecoration: 'none', color: '#000' }}
                        >
                            <AlertSelect>???</AlertSelect>
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
                        ???????????? ???????????? ?????? ??? <br />
                        ?????????????????? ?????? ??????????????????.
                    </AlertTitle>
                    <Line />
                    <AlertSelectWrapper>
                        <Link
                            to="/main"
                            style={{ textDecoration: 'none', color: '#000' }}
                        >
                            <AlertSelect>??????</AlertSelect>
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
        content: '??????????????????';
        color: #40b65e;
        display: block;
        white-space: nowrap;
    }
`;
