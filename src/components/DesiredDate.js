import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Client } from '../client';
import Location from '../components/Location';
import {
    AlertModal,
    ArrowWrapper,
    BackArrow,
    CalenderModal,
    CalenderOpacity,
    CompletionButton,
    FirstInputBlockTitle,
    Header,
    InputBlockTitle,
    InputBlockWrapper,
    InputTitle,
    LastButtonInput,
    PageBlock,
    RightArrow,
    TimeModal,
    TimeOpacity,
} from '../components/Pagestyles';
import styled, { css } from 'styled-components';

const DesiredDate = ({
    desireOpen,
    onDesireOpen,
    setDesire,
    registerData,
    pushDateData,
}) => {
    const [time, setTime] = useState(null);
    const timeHandler = (e) => {
        e.preventDefault();
        setTime(e.target.value);
    };

    const [calender, setCalender] = useState(false);
    const onCalender = () => setCalender(!calender);

    const [timer, setTimer] = useState(false);
    const onTimer = () => setTimer(!timer);

    const selectList = ['월', '화', '수', '목', '금', '토', '일'];
    const [dateSelected, setDateSelected] = useState('');

    const handleSelect = (e) => {
        setDateSelected(e.target.value);
    };

    const onPushInfo = async () => {
        try {
            const pushInfo = registerData;
            const { data } = await Client.post(`/auth`, pushInfo);
            console.log(data);
        } catch (err) {
            console.log('error');
        }
    };

    const onPushDate = async () => {
        const dateInfo = {
            ...pushDateData,
            startTime: time,
        };

        try {
            const { data } = await Client.post(`/reservations`, dateInfo);
            console.log(data);
        } catch (err) {
            console.log('error');
        }
    };

    return (
        <PageWrapper open={desireOpen}>
            <Header>
                <ArrowWrapper onClick={onDesireOpen}>
                    <BackArrow />
                    희망 풋살 매칭 일시
                </ArrowWrapper>
            </Header>
            <PageBlock>
                <FirstInputBlockTitle>매칭 요일</FirstInputBlockTitle>
                <InputBlockWrapper>
                    <LastButtonInput onClick={onCalender}>
                        {dateSelected
                            ? dateSelected
                            : '매칭 요일을 선택해주세요.'}
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
                onClick={() => {
                    onPushDate();
                    onPushInfo();
                }}
                style={{ background: '#40B65E' }}
            >
                매칭일시 입력 완료
            </CompletionButton>
            <CalenderModal calender={calender}>
                <CalenderOpacity onClick={onCalender} />
                <AlertModal>
                    <select onChange={handleSelect} value={dateSelected}>
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
        </PageWrapper>
    );
};

const PageWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: none;
    ${(props) =>
        props.open &&
        css`
            display: block;
        `}
`;

export default DesiredDate;
