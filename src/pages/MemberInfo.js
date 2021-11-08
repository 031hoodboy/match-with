import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled, { css } from 'styled-components';
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
    Line,
    Notice,
    Opacity,
    PageBlock,
    PageWrapper,
    RightArrow,
    LocationBlock,
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
    const [username, setUsername] = useState(null);
    const [phoneNo, setPhoneNo] = useState(null);
    const [date, setDate] = useState(null);
    const [regionName, setRegionName] = useState(null);

    const [locations, setLocations] = useState([]);
    const [locationOpen, setLocationOpen] = useState(true);
    const onLocationOpen = () => setLocationOpen(!locationOpen);

    const [levelInput, letLevelInput] = useState(null);
    const [levelOpen, setlevelOpen] = useState(false);
    const onLevelOpen = () => setlevelOpen(!levelOpen);

    const dateHandler = (e) => {
        e.preventDefault();
        setDate(e.target.value);
        console.log(e.target.value);
    };

    const levelHandler = (e) => {
        e.preventDefault();
        letLevelInput(e.target.value);
        console.log(e.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            const result = await Client.get('/auth');
            console.log(result.data);
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
                regionName: locations,
            };
            console.log('pushInfo', pushInfo);
            const { data } = await Client.post(`/auth`, pushInfo);
            console.log(data);
        } catch (err) {
            console.log('error');
        }
    };

    // const onPushInfo = async () => {
    //     try {
    //         const { data } = await Client.post(`/auth`, {
    //             level,
    //             username,
    //             phoneNo,
    //             regionName,
    //             date,
    //         });
    //     } catch (err) {
    //         history.push('/main');
    //     }
    // };
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
                                {levelInput
                                    ? `Lv. ${levelInput}`
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
                * 개인 등록에 대한 안내 및 주의사항입니다.
                <br />* 매칭 연결를 위해 개인정보를 수집합니다.
            </Notice>
            <CompletionButton onClick={onPushInfo}>
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
            {/* <DoneAltert done={done}>
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

export default MemberInfo;
