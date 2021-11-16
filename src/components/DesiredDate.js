import React, { useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import {
    ArrowWrapper,
    BackArrow,
    ButtonInput,
    ButtonWrapper,
    CompletionButton,
    FirstInputBlockTitle,
    Header,
    InputBlockTitle,
    InputBlockWrapper,
    InputTitle,
    LastButtonInput,
    PageBlock,
} from '..';
import { Alert } from '../alert';

export const DesiredDate = ({ desireOpen, onDesireOpen, setTimes }) => {
    const [startTime, setStartTime] = useState(null);
    const startTimeHandler = (e) => {
        e.preventDefault();
        setStartTime(e.target.value);
        console.log(e.target.value);
    };

    const [endTime, setEndTime] = useState(null);
    const endTimeHandler = (e) => {
        e.preventDefault();
        setEndTime(e.target.value);
        console.log(endTime);
    };

    const [timer, setTimer] = useState(false);
    const onTimer = () => setTimer(!timer);

    const selectList = ['월', '화', '수', '목', '금', '토', '일'];
    const [dayOfWeek, setDayOfWeek] = useState();

    const handleSelect = (e) => {
        setDayOfWeek(e.target.value);
    };

    const registerNewMember = useCallback(() => {
        onDesireOpen();
        if (
            dayOfWeek === '' ||
            startTime === '' ||
            endTime === '' ||
            dayOfWeek === null ||
            startTime === null ||
            endTime === null
        ) {
            // setAddMember(true);
            Alert('희망 풋살 매칭  입력되지 않았습니다.');
        } else {
            setTimes((times) => [...times, { dayOfWeek, startTime, endTime }]);
        }
        onReset();
    }, [dayOfWeek, endTime, onDesireOpen, setTimes, startTime]);

    const onReset = () => {
        setDayOfWeek('');
        setStartTime('');
        setEndTime('');
    };
    return (
        <PageWrapper desireOpen={desireOpen}>
            <Header>
                <ArrowWrapper onClick={onDesireOpen}>
                    <BackArrow />
                    희망 풋살 매칭 일시
                </ArrowWrapper>
            </Header>
            <PageBlock>
                <FirstInputBlockTitle>매칭 요일</FirstInputBlockTitle>
                <InputBlockWrapper>
                    <LastButtonInput>
                        <LevelSelect onChange={handleSelect} value={dayOfWeek}>
                            <option
                                value=""
                                disabled
                                selected
                                style={{ color: '#40b65e' }}
                            >
                                매칭 요일을 선택해주세요.
                            </option>
                            {selectList.map((item) => (
                                <option value={item} key={item}>
                                    {item}
                                </option>
                            ))}
                        </LevelSelect>
                    </LastButtonInput>
                </InputBlockWrapper>
                <InputBlockTitle>매칭 시간</InputBlockTitle>
                <InputBlockWrapper>
                    <ButtonInput onClick={onTimer}>
                        <InputTitle>
                            {startTime
                                ? startTime
                                : '매칭 시작 시간을 선택해주세요.'}
                        </InputTitle>
                        <TimeInputWithIcon
                            type="time"
                            id="start"
                            name="start"
                            onChange={startTimeHandler}
                        />
                    </ButtonInput>
                    <LastButtonInput onClick={onTimer}>
                        <InputTitle>
                            {endTime
                                ? endTime
                                : '매칭 종료 시간을 선택해주세요.'}
                        </InputTitle>
                        <TimeInputWithIcon
                            type="time"
                            id="start"
                            name="start"
                            onChange={endTimeHandler}
                        />
                    </LastButtonInput>
                </InputBlockWrapper>
                <Space />
                <ButtonWrapper>
                    <CompletionButton
                        onClick={registerNewMember}
                        style={{ background: '#40B65E' }}
                    >
                        매칭일시 입력 완료
                    </CompletionButton>
                </ButtonWrapper>
            </PageBlock>
        </PageWrapper>
    );
};

const PageWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: none;
    ${(props) =>
        props.desireOpen &&
        css`
            display: block;
        `}
`;

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

const LevelSelect = styled.select`
    border: none;
    background: transparent;
    outline: none;
    color: #4b4c4d;
    width: 100%;
`;

const Space = styled.div`
    width: 100%;
    height: 20vh;
`;
