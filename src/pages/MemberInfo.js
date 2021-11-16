import React, { useEffect, useState, useCallback } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled, { css } from 'styled-components';
import {
    AlertModal,
    AlertSelect,
    AlertSelectWrapper,
    AlertTitle,
    ArrowWrapper,
    BackAltert,
    BackArrow,
    ButtonWrapper,
    Client,
    CompletionButton,
    DesiredDate,
    FirstInputBlockTitle,
    Header,
    InputBlock,
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
    TimeOpacity,
    ButtonInput,
} from '..';

export const MemberInfo = withRouter(({ location, history }) => {
    const [goBack, SetGoBack] = useState(false);
    const onGoBack = () => SetGoBack(!goBack);

    const [calender, setCalender] = useState(false);
    const onCalender = () => setCalender(!calender);

    // eslint-disable-next-line
    const [level, setLevel] = useState(null);
    const [username, setUsername] = useState(null);
    const [phoneNo, setPhoneNo] = useState(null);
    const [date, setDate] = useState(null);
    // eslint-disable-next-line
    const [regionName, setRegionName] = useState(null);

    const [locations, setLocations] = useState([null]);
    const [locationOpen, setLocationOpen] = useState(true);
    const onLocationOpen = () => setLocationOpen(!locationOpen);

    const dateHandler = (e) => {
        e.preventDefault();
        setDate(e.target.value);
    };

    const [times, setTimes] = useState([]);
    const [time, setTime] = useState(null);
    const timeHandler = (e) => {
        e.preventDefault();
        setTime(e.target.value);
    };

    const [correction, setCorrection] = useState(false);
    const onCorrection = () => setCorrection(!correction);
    const onCorrectionTrue = () => setCorrection(true);

    useEffect(() => {
        const fetchData = async () => {
            const result = await Client.get('/auth');
            setLevel(result.data.user.level);
            setUsername(result.data.user.username);
            setPhoneNo(result.data.user.phoneNo);
            setRegionName(result.data.user.regionName);
        };
        onCorrectionTrue();
        fetchData();
    }, []);

    const onPush = async () => {
        const dateInfo = {
            startDate: 'date',
            regionNames: locations,
            startTime: 'time',
            times,
        };
        const pushInfo = {
            level: levelSelected,
            username,
            phoneNo,
            regionName: locations[0],
        };
        console.log(dateInfo);

        try {
            await Client.post(`/auth`, pushInfo);
            await Client.post(`/reservations`, dateInfo);
            return history.push('/main');
        } catch (err) {}
    };
    const selectList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const [levelSelected, setLevelSelected] = useState(null);
    const handleSelect = (e) => setLevelSelected(e.target.value);

    const [timer, setTimer] = useState(false);
    const onTimer = () => setTimer(!timer);

    const [desireOpen, setDesire] = useState(false);
    const onDesireOpen = () => setDesire(!desireOpen);

    const removeMember = useCallback(
        (startTime) => {
            setTimes((times) => times.filter((e) => e.startTime !== startTime));
        },
        // eslint-disable-next-line
        [times]
    );
    return (
        <PageWrapper>
            <Header>
                <ArrowWrapper onClick={onGoBack}>
                    <BackArrow />
                    개인 등록
                </ArrowWrapper>
            </Header>
            <PageBlock>
                <FirstInputBlockTitle>개인 풋살 정보</FirstInputBlockTitle>
                <InputBlockWrapper>
                    <InputBlock
                        placeholder="이름을 입력해주세요."
                        value={username}
                    ></InputBlock>
                    <InputBlock
                        placeholder="연락처를 입력해주세요."
                        value={phoneNo}
                    ></InputBlock>
                    <Link to="/member-info" style={{ textDecoration: 'none' }}>
                        <LastButtonInput>
                            {/* {levelSelected
                                ? `Lv. ${levelSelected}`
                                : '풋살 레벨을 선택해주세요.'} */}
                            <LevelSelect
                                onChange={handleSelect}
                                placeholder="클릭해달래요"
                                value={levelSelected}
                            >
                                <option
                                    value=""
                                    disabled
                                    selected
                                    style={{ color: '#40b65e' }}
                                >
                                    풋살 레벨을 선택해주세요.
                                </option>
                                {selectList.map((item) => (
                                    <option value={item} key={item}>
                                        Lv. {item}
                                    </option>
                                ))}
                            </LevelSelect>
                        </LastButtonInput>
                    </Link>
                </InputBlockWrapper>
                <InputBlockTitle>희망 풋살 매칭 일시</InputBlockTitle>
                <InputBlockWrapper>
                    {times.map((time) => (
                        <ButtonInput>
                            <InputTitle>
                                {time.dayOfWeek}&nbsp;&nbsp;|&nbsp;&nbsp;
                                {time.startTime}&nbsp;~&nbsp;
                                {time.endTime}
                            </InputTitle>
                            <span onClick={() => removeMember(time.startTime)}>
                                X
                            </span>
                        </ButtonInput>
                    ))}
                    <LastButtonInput onClick={onDesireOpen}>
                        <InputTitle>
                            희망 풋살 매칭 일시를 선택해주세요.
                        </InputTitle>
                        <RightArrow />
                    </LastButtonInput>
                </InputBlockWrapper>
                <InputBlockTitle>활동 지역</InputBlockTitle>
                <InputBlockWrapper>
                    <LastButtonInput onClick={onLocationOpen}>
                        <InputTitle>
                            {locations[0] === null
                                ? '지역을 선택해주세요.'
                                : locations.length <= 1
                                ? locations[0]
                                : `${locations.slice(
                                      locations.length - 1
                                  )} 외 ${locations.length - 1}개`}
                        </InputTitle>
                        <RightArrow />
                    </LastButtonInput>
                </InputBlockWrapper>
                <Notice>
                    * 개인 등록에 대한 안내 및 주의사항입니다.
                    <br />* 매칭 연결를 위해 개인정보를 수집합니다.
                </Notice>
                <ButtonWrapper>
                    <CompletionButton
                        // onClick={() => {
                        //     onPushDate();
                        //     onPushInfo();
                        // }}
                        onClick={onPush}
                    >
                        개인 정보 등록 완료
                    </CompletionButton>
                </ButtonWrapper>
            </PageBlock>

            <BackAltert open={goBack}>
                <Opacity onClick={onGoBack} />
                <AlertModal>
                    <AlertTitle>개인 정보 등록을 취소하시겠습니까?</AlertTitle>
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
            <CorrectionAltert open={correction}>
                <Opacity onClick={onCorrection} />
                <AlertModal>
                    <AlertTitle>
                        등록된 개인정보가 있습니다.
                        <br />
                        개인정보를 수정하십니까?
                    </AlertTitle>
                    <Line />
                    <AlertSelectWrapper>
                        <Link
                            to="/main"
                            style={{ textDecoration: 'none', color: '#000' }}
                        >
                            <AlertSelect onClick={onCorrection}>
                                아니오
                            </AlertSelect>
                        </Link>
                        <AlertSelect onClick={onCorrection}>예</AlertSelect>
                    </AlertSelectWrapper>
                </AlertModal>
            </CorrectionAltert>
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
            <LocationBlock>
                <Location
                    locationOpen={locationOpen}
                    onLocationOpen={onLocationOpen}
                    locations={locations}
                    setLocations={setLocations}
                    isOnce
                />
            </LocationBlock>
            <DesiredDateBlock>
                <DesiredDate
                    desireOpen={desireOpen}
                    onDesireOpen={onDesireOpen}
                    times={times}
                    setTimes={setTimes}
                />
            </DesiredDateBlock>
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
});

export const CalenderModal = styled.div`
    position: absolute;
    display: none;
    ${(props) =>
        props.calender &&
        css`
            display: flex;
        `}
`;

export const CalenderOpacity = styled.div`
    width: 100vw;
    height: 100vh;
    background: #000;
    opacity: 0.2;
    z-index: 2;
`;

const TimeModal = styled.div`
    position: absolute;
    display: none;
    ${(props) =>
        props.timer &&
        css`
            display: flex;
        `}
`;

const DesiredDateBlock = styled.div`
    position: absolute;
`;

const LevelSelect = styled.select`
    border: none;
    background: transparent;
    outline: none;
    color: #4b4c4d;
    width: 100%;
`;

const CorrectionAltert = styled.div`
    position: fixed;
    display: none;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    ${(props) =>
        props.open &&
        css`
            display: flex;
        `}
`;
