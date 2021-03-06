import React, { useEffect, useState } from 'react';
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
    Client,
    CompletionButton,
    FirstInputBlockTitle,
    Header,
    InfoInputBlockWrapper,
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
} from '..';

export const TeamInfo = withRouter(({ location, history }) => {
    const [goBack, SetGoBack] = useState(false);
    const onGoBack = () => SetGoBack(!goBack);

    const [calender, setCalender] = useState(false);
    const onCalender = () => setCalender(!calender);

    const [, setLevel] = useState(null);
    const [username, setUsername] = useState(null);
    const [phoneNo, setPhoneNo] = useState(null);
    const [date, setDate] = useState(null);
    const [, setRegionName] = useState(null);

    const [locations, setLocations] = useState([]);
    const [locationOpen, setLocationOpen] = useState(true);
    const onLocationOpen = () => setLocationOpen(!locationOpen);

    const [levelInput, letLevelInput] = useState(null);
    const [levelOpen, setlevelOpen] = useState(false);
    const onLevelOpen = () => setlevelOpen(!levelOpen);

    const dateHandler = (e) => {
        e.preventDefault();
        setDate(e.target.value);
    };

    const levelHandler = (e) => {
        e.preventDefault();
        letLevelInput(e.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            const result = await Client.get('/auth');
            setLevel(result.data.user.level);
            setUsername(result.data.user.username);
            setPhoneNo(result.data.user.phoneNo);
            setRegionName(result.data.user.regionName);
        };

        fetchData();
    }, []);

    const onPushInfo = async () => {
        try {
            const pushInfo = {
                level: levelInput,
                username,
                phoneNo,
                regionName: locations[0],
            };

            await Client.post(`/auth`, pushInfo);
        } catch (err) {}
    };

    return (
        <PageWrapper>
            <Header>
                <ArrowWrapper onClick={onGoBack}>
                    <BackArrow />
                    ?????? ??????
                </ArrowWrapper>
            </Header>
            <PageBlock>
                <FirstInputBlockTitle>?????? ?????? ??????</FirstInputBlockTitle>
                <InfoInputBlockWrapper>
                    <InputBlock
                        placeholder="????????? ??????????????????."
                        value={username}
                    ></InputBlock>
                    <InputBlock
                        placeholder="???????????? ??????????????????."
                        value={phoneNo}
                    ></InputBlock>
                    <Link to="/member-info" style={{ textDecoration: 'none' }}>
                        <LastButtonInput onClick={onLevelOpen}>
                            <InputTitle>
                                {levelInput
                                    ? `Lv. ${levelInput}`
                                    : '?????? ????????? ??????????????????.'}
                            </InputTitle>
                            <RightArrow />
                        </LastButtonInput>
                    </Link>
                </InfoInputBlockWrapper>
                <InputBlockTitle>?????? ?????? ?????? ??????</InputBlockTitle>
                <InputBlockWrapper>
                    <Link to="/member-info" style={{ textDecoration: 'none' }}>
                        <LastButtonInput onClick={onCalender}>
                            <InputTitle value={date}>
                                {date
                                    ? date
                                    : '?????? ?????? ?????? ????????? ??????????????????.'}
                            </InputTitle>
                            <RightArrow />
                        </LastButtonInput>
                    </Link>
                </InputBlockWrapper>
                <InputBlockTitle>?????? ??????</InputBlockTitle>
                <InputBlockWrapper>
                    <LastButtonInput onClick={onLocationOpen}>
                        <InputTitle>
                            {locations.length <= 0
                                ? '????????? ??????????????????.'
                                : `${locations.slice(
                                      locations.length - 1
                                  )} ??? ${locations.length - 1}???`}
                        </InputTitle>
                        <RightArrow />
                    </LastButtonInput>
                </InputBlockWrapper>
                <Notice>
                    * ?????? ????????? ?????? ?????? ??? ?????????????????????.
                    <br />* ?????? ????????? ?????? ??????????????? ???????????????.
                </Notice>
            </PageBlock>
            <CompletionButton onClick={onPushInfo}>
                ?????? ?????? ?????? ??????
            </CompletionButton>
            <BackAltert open={goBack}>
                <Opacity onClick={onGoBack} />
                <AlertModal>
                    <AlertTitle>?????? ?????? ????????? ?????????????????????????</AlertTitle>
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
            {/* <DoneAltert done={done}>
                <DoneOpacity onClick={onDone} />
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
            </DoneAltert> */}
            <LocationBlock>
                <Location
                    locationOpen={locationOpen}
                    onLocationOpen={onLocationOpen}
                    locations={locations}
                    setLocations={setLocations}
                />
            </LocationBlock>
            <LevelModal level={levelOpen}>
                <LevelOpacity onClick={onLevelOpen} />
                <AlertModal>
                    <input
                        type="number"
                        id="tentacles"
                        name="tentacles"
                        min="1"
                        max="10"
                        onChange={levelHandler}
                    />
                </AlertModal>
            </LevelModal>
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

const LevelModal = styled.div`
    position: absolute;
    display: none;
    ${(props) =>
        props.level &&
        css`
            display: flex;
        `}
`;

const LevelOpacity = styled.div`
    width: 100vw;
    height: 100vh;
    background: #000;
    opacity: 0.2;
    z-index: 2;
`;
