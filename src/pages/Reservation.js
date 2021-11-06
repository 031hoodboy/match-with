import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
    InputBlock,
    InputBlockTitle,
    InputBlockWrapper,
    InputTitle,
    LastButtonInput,
    LastInputBlock,
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
                    <InputBlock placeholder="이름을 입력해주세요."></InputBlock>
                    <InputBlock placeholder="연락처를 입력해주세요."></InputBlock>
                    <LastInputBlock placeholder="소속 풋살 팀명을입력해주세요."></LastInputBlock>
                </InputBlockWrapper>
                <InputBlockTitle>예약자 정보</InputBlockTitle>
                <InputBlockWrapper>
                    <Link to="/reservation" style={{ textDecoration: 'none' }}>
                        <ButtonInput onClick={onCalender}>
                            <InputTitle>
                                {date ? date : '예약 일을 선택해주세요.'}
                            </InputTitle>
                            <RightArrow />
                        </ButtonInput>
                    </Link>
                    <Link to="/reservation" style={{ textDecoration: 'none' }}>
                        <LastButtonInput onClick={onTimer}>
                            <InputTitle>
                                {time ? time : '경기 시작 시간을 선택해주세요.'}
                            </InputTitle>
                            <RightArrow></RightArrow>
                        </LastButtonInput>
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
            </PageBlock>
            <Notice>
                * 풋살장 예약은 2시간 단위로 진행됩니다.
                <br />* 예약현황 공유를 위해 예약자의 개인정보를 수집합니다.
            </Notice>
            <CompletionButton onClick={onDone}>예약 신청 완료</CompletionButton>
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
                <DoneOpacity onClick={onDone} />
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
                <AlertModal>
                    <input
                        type="date"
                        id="start"
                        name="start"
                        onChange={dateHandler}
                    />
                </AlertModal>
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

export default Reservation;
