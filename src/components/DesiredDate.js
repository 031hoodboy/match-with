import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Client } from '../client';
import Location from './Location';
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
    InputBlockTitle,
    InputBlockWrapper,
    InputTitle,
    LastButtonInput,
    Line,
    LocationBlock,
    Opacity,
    PageBlock,
    RightArrow,
    TimeModal,
    TimeOpacity,
} from './Pagestyles';
import styled, { css } from 'styled-components';

const DesiredDate = ({ desireOpen, onDesireOpen, setDesire }) => {
    const onClick = (desire) => () => {
        setDesire(desire);
        onDesireOpen();
    };

    const [time, setTime] = useState(null);
    const timeHandler = (e) => {
        e.preventDefault();
        setTime(e.target.value);
    };

    const [datePick, setDatePick] = useState(false);
    const onDatePick = () => setDatePick(!datePick);

    const [timer, setTimer] = useState(false);
    const onTimer = () => setTimer(!timer);

    const selectList = ['월', '화', '수', '목', '금', '토', '일'];
    const [Selected, setSelected] = useState('');

    const handleSelect = (e) => {
        setSelected(e.target.value);
    };

    return (
        <PageWrapper open={!desireOpen}>
            <Header>
                <Link
                    to="member-info"
                    style={{ textDecoration: 'none', color: '#fff' }}
                >
                    <ArrowWrapper onClick={onDesireOpen}>
                        <BackArrow />
                        희망 풋살 매칭 일시
                    </ArrowWrapper>
                </Link>
            </Header>
            <PageBlock>
                <FirstInputBlockTitle>매칭 요일</FirstInputBlockTitle>
                <InputBlockWrapper>
                    <LastButtonInput onClick={onDatePick}>
                        <InputTitle value={Selected}>
                            {Selected ? Selected : '매칭 요일을 선택해주세요.'}
                        </InputTitle>
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
            <CompletionButton style={{ background: '#40B65E' }}>
                매칭일시 입력 완료
            </CompletionButton>
            <DesireModal datePick={datePick}>
                <CalenderOpacity onClick={onDatePick} />
                <AlertModal>
                    <select onChange={handleSelect} value={Selected}>
                        {selectList.map((item) => (
                            <option value={item} key={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </AlertModal>
            </DesireModal>
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

const Header = styled.div`
    width: 90vw;
    height: 9vh;
    padding: 3% 5%;
    background: #40b65e;
    display: flex;
    align-items: flex-end;
    font-size: 15px;
    color: #fff;
    box-shadow: rgb(0 0 0 / 10%) 0px 3px 6px;
`;

const DesireModal = styled.div`
    position: absolute;
    display: none;
    z-index: 5;
    ${(props) =>
        props.datePick &&
        css`
            display: flex;
        `}
`;

export default DesiredDate;
