import React, { useState } from 'react';
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
    Opacity,
    PageBlock,
    PageWrapper,
    RightArrow,
    TimeModal,
    TimeOpacity,
} from '../components/Pagestyles';

const DesiredDate = () => {
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

    const selectList = ['월', '화', '수', '목', '금', '토', '일'];
    const [Selected, setSelected] = useState('');

    const handleSelect = (e) => {
        setSelected(e.target.value);
    };

    return (
        <PageWrapper>
            <Header>
                <Link
                    to="member-info"
                    style={{ textDecoration: 'none', color: '#fff' }}
                >
                    <ArrowWrapper onClick={onGoBack}>
                        <BackArrow />
                        희망 풋살 매칭 일시
                    </ArrowWrapper>
                </Link>
            </Header>
            <PageBlock>
                <FirstInputBlockTitle>매칭 요일</FirstInputBlockTitle>
                <InputBlockWrapper>
                    <LastButtonInput onClick={onCalender}>
                        {Selected ? Selected : '매칭 요일을 선택해주세요.'}
                        <RightArrow />
                    </LastButtonInput>
                </InputBlockWrapper>
                <InputBlockTitle>매칭 시간</InputBlockTitle>
                <InputBlockWrapper>
                    <LastButtonInput onClick={onTimer}>
                        <InputTitle>
                            {time ? time : '경기 시작 시간을 선택해주세요.'}
                        </InputTitle>
                        <RightArrow />
                    </LastButtonInput>
                </InputBlockWrapper>
            </PageBlock>
            <CompletionButton
                onClick={ButtonClick}
                style={{ background: '#40B65E' }}
            >
                매칭일시 입력 완료
            </CompletionButton>
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
                <AlertModal>
                    <select onChange={handleSelect} value={Selected}>
                        {selectList.map((item) => (
                            <option value={item} key={item}>
                                {item}
                            </option>
                        ))}
                    </select>
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

export default DesiredDate;
