import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { Client } from '../client';
import Level from '../components/Level';
import DesiredDate from '../components/DesiredDate';
import Location from '../components/Location';
import {
    AlertModal,
    AlertSelect,
    AlertSelectWrapper,
    AlertTitle,
    ArrowWrapper,
    BackAltert,
    BackArrow,
    CompletionButton,
    FirstInputBlockTitle,
    Header,
    InputBlock,
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
} from '../components/Pagestyles';

const MemberInfo = withRouter(({ location, history }) => {
    const [goBack, SetGoBack] = useState(false);
    const onGoBack = () => {
        SetGoBack(!goBack);
    };

    const [done, setDone] = useState(false);
    const onDone = () => {
        setDone(!done);
    };

    const [calender, setCalender] = useState(false);
    const onCalender = () => setCalender(!calender);

    const [level, setLevel] = useState(null);
    const [desire, setDesire] = useState(null);

    const [username, setUsername] = useState(null);
    const [phoneNo, setPhoneNo] = useState(null);
    const [date, setDate] = useState(null);
    const [regionName, setRegionName] = useState(null);

    const [locationOpen, setLocationOpen] = useState(true);
    const onLocationOpen = () => setLocationOpen(!locationOpen);

    const [levelOpen, setlevelOpen] = useState(true);
    const onLevelOpen = () => setlevelOpen(!levelOpen);

    const [desireOpen, setDesireOpen] = useState(true);
    const onDesireOpen = () => setDesireOpen(!desireOpen);

    const setLocations = ([regionName]) => setRegionName(regionName);

    const dateHandler = (e) => {
        e.preventDefault();
        setDate(e.target.value);
        console.log(e.target.value);
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
                level,
                username,
                phoneNo,
                regionName,
            };
            const { data } = await Client.post(`/auth`, pushInfo);
            console.log(data);
        } catch (err) {
            console.log('error');
        }
    };

    const onPushDate = async () => {
        const dateInfo = {
            startDate: date,
            regionName,
            startTime: '0',
        };

        try {
            const { data } = await Client.post(`/reservations`, dateInfo);
            console.log(data);
        } catch (err) {
            console.log('error');
        }
    };

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
                        <LastButtonInput onClick={onLevelOpen}>
                            <InputTitle>
                                {level
                                    ? `Lv. ${level}`
                                    : '풋살 레벨을 선택해주세요.'}
                            </InputTitle>
                            <RightArrow />
                        </LastButtonInput>
                    </Link>
                </InputBlockWrapper>
                <InputBlockTitle>희망 풋살 매칭 일시</InputBlockTitle>
                <InputBlockWrapper>
                    <Link to="/member-info" style={{ textDecoration: 'none' }}>
                        <LastButtonInput onClick={onCalender}>
                            <InputTitle value={date}>
                                {date
                                    ? date
                                    : '희망 풋살 매칭 일시를 선택해주세요.'}
                            </InputTitle>
                            <RightArrow />
                        </LastButtonInput>
                    </Link>
                </InputBlockWrapper>
                <InputBlockTitle>활동 지역</InputBlockTitle>
                <InputBlockWrapper>
                    <LastButtonInput onClick={onLocationOpen}>
                        <InputTitle>
                            {regionName || '지역을 선택해주세요.'}
                        </InputTitle>
                        <RightArrow />
                    </LastButtonInput>
                </InputBlockWrapper>
            </PageBlock>
            <Notice>
                * 개인 등록에 대한 안내 및 주의사항입니다.
                <br />* 매칭 연결를 위해 개인정보를 수집합니다.
            </Notice>
            <CompletionButton onClick={onDesireOpen}>
                개인 정보 등록 완료
            </CompletionButton>
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
                    locations={[regionName]}
                    setLocations={setLocations}
                    isOnce={true}
                />
            </LocationBlock>
            <LocationBlock>
                <Level
                    onLevelOpen={onLevelOpen}
                    levelOpen={levelOpen}
                    setLevel={setLevel}
                />
            </LocationBlock>
            <LocationBlock>
                <DesiredDate
                    onDesireOpen={onDesireOpen}
                    desireOpen={desireOpen}
                    setDesire={setDesire}
                />
            </LocationBlock>
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

export default MemberInfo;
