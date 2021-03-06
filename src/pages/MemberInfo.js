import React, { useCallback, useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled, { css } from 'styled-components';
import {
    Alert,
    AlertModal,
    AlertSelect,
    AlertSelectWrapper,
    AlertTitle,
    ArrowWrapper,
    BackAltert,
    BackArrow,
    ButtonInput,
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
} from '..';

export const MemberInfo = withRouter(({ location, history }) => {
    const [goBack, SetGoBack] = useState(false);
    const onGoBack = () => SetGoBack(!goBack);

    const [calender, setCalender] = useState(false);
    const onCalender = () => setCalender(!calender);

    const [level, setLevel] = useState(null);
    const [username, setUsername] = useState(null);
    const [phoneNo, setPhoneNo] = useState(null);
    const [, setDate] = useState(null);
    const [, setRegionName] = useState(null);

    const [locations, setLocations] = useState([null]);

    const [locationOpen, setLocationOpen] = useState(true);
    const onLocationOpen = () => setLocationOpen(!locationOpen);

    const dateHandler = (e) => {
        e.preventDefault();
        setDate(e.target.value);
    };

    const [times, setTimes] = useState([]);
    const [, setTime] = useState(null);
    const timeHandler = (e) => {
        e.preventDefault();
        setTime(e.target.value);
    };

    const [correction, setCorrection] = useState(false);
    const onCorrection = () => setCorrection(!correction);
    const onCorrectionTrue = () => setCorrection(true);

    const [already, setAlready] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const result = await Client.get('/auth');
            const timeresult = await Client.get('/times');
            setLevel(result.data.user.level);
            setUsername(result.data.user.username);
            setPhoneNo(result.data.user.phoneNo);
            setRegionName(result.data.user.regionName);
            setTimes(timeresult.data.times);
            if (result.data.user.regionName) {
                setLocations([result.data.user.regionName]);
            }

            if (result.data.user.registeredAt) {
                onCorrectionTrue();
                setAlready(true);
            }
        };

        fetchData();
    }, []);

    const onPush = async () => {
        const pushInfo = {
            level,
            username,
            phoneNo,
            regionName: locations[0],
            times,
        };

        try {
            if (times.length === 0) {
                Alert('?????? ?????? ?????? ????????? ??????????????????');
            } else {
                await Client.post(`/auth`, pushInfo);
                onAlert();
                return history.push('/main');
            }
        } catch (err) {}
    };

    const onAlert = () => {
        already
            ? Alert('???????????? ????????? ?????????????????????.')
            : Alert('???????????? ????????? ?????????????????????.');
    };

    const selectList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const handleSelect = (e) => setLevel(e.target.value);

    const [timer, setTimer] = useState(false);
    const onTimer = () => setTimer(!timer);

    const [desireOpen, setDesire] = useState(false);
    const onDesireOpen = () => setDesire(!desireOpen);

    const removeTime = useCallback(
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
                    {already ? '?????? ?????? ??????' : '?????? ??????'}
                </ArrowWrapper>
            </Header>
            <PageBlock>
                <FirstInputBlockTitle>?????? ?????? ??????</FirstInputBlockTitle>
                <InputBlockWrapper>
                    <InputBlock
                        placeholder="????????? ??????????????????."
                        value={username}
                    ></InputBlock>
                    <InputBlock
                        placeholder="???????????? ??????????????????."
                        value={phoneNo}
                    ></InputBlock>
                    <Link to="/member-info" style={{ textDecoration: 'none' }}>
                        <LastButtonInput>
                            <LevelSelect onChange={handleSelect} value={level}>
                                {selectList.map((item) => (
                                    <option value={item} key={item}>
                                        Lv. {item}
                                    </option>
                                ))}
                            </LevelSelect>
                        </LastButtonInput>
                    </Link>
                </InputBlockWrapper>
                <InputBlockTitle>?????? ?????? ?????? ??????</InputBlockTitle>

                <InputBlockWrapper>
                    {times.map((time) => (
                        <ButtonInput>
                            <InputTitle>
                                {time.dayOfWeek}&nbsp;&nbsp;|&nbsp;&nbsp;
                                {time.startTime}&nbsp;~&nbsp;
                                {time.endTime}
                            </InputTitle>
                            <span onClick={() => removeTime(time.startTime)}>
                                X
                            </span>
                        </ButtonInput>
                    ))}
                    <LastButtonInput onClick={onDesireOpen}>
                        <InputTitle>
                            ?????? ?????? ?????? ????????? ??????????????????.
                        </InputTitle>
                        <RightArrow />
                    </LastButtonInput>
                </InputBlockWrapper>

                <InputBlockTitle>?????? ??????</InputBlockTitle>
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
                    * Lv1~Lv3 ????????? ????????? ??? <br />
                    * Lv4~Lv6 ????????? ????????? ??? <br />
                    * Lv7~Lv8 ????????? ????????? ??? <br />* Lv9~Lv10 ?????? ?????? ??????
                    ????????? ?????????
                    <br />* ?????? ????????? ?????? ??????????????? ???????????????.
                    <br /> * ?????? ??????, ?????? ????????? ????????? ??????????????? ??????
                    ????????? ????????????.
                </Notice>
                <ButtonWrapper>
                    <CompletionButton
                        // onClick={() => {
                        //     onPushDate();
                        //     onPushInfo();
                        // }}
                        onClick={onPush}
                    >
                        {already
                            ? '?????? ?????? ?????? ??????'
                            : '?????? ?????? ?????? ??????'}
                    </CompletionButton>
                </ButtonWrapper>
            </PageBlock>

            <BackAltert open={goBack}>
                <Opacity onClick={onGoBack} />
                <AlertModal>
                    <AlertTitle>
                        {already
                            ? '?????? ?????? ????????? ?????????????????????????'
                            : '?????? ?????? ????????? ?????????????????????????'}
                    </AlertTitle>
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
            <CorrectionAltert open={correction}>
                <Opacity onClick={onCorrection} />
                <AlertModal>
                    <AlertTitle>
                        ????????? ??????????????? ????????????.
                        <br />
                        ??????????????? ???????????????????
                    </AlertTitle>
                    <Line />
                    <AlertSelectWrapper>
                        <Link
                            to="/main"
                            style={{ textDecoration: 'none', color: '#000' }}
                        >
                            <AlertSelect onClick={onCorrection}>
                                ?????????
                            </AlertSelect>
                        </Link>
                        <AlertSelect onClick={onCorrection}>???</AlertSelect>
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
