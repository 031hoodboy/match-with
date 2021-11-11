import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Location from '../components/Location';
import MatchingTeam from '../components/MatchingTeam';
import { Client } from '../client';
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
    TimeModal,
    TimeOpacity,
    CalenderModal,
    CalenderOpacity,
} from '../components/Pagestyles';

const Matching = () => {
    const [goBack, SetGoBack] = useState(false);
    const onGoBack = () => {
        SetGoBack(!goBack);
    };

    const [done, setDone] = useState(false);
    const onDone = () => {
        setDone(!done);
    };

    const [time, setTime] = useState(null);
    const timeHandler = (e) => {
        e.preventDefault();
        setTime(e.target.value);
    };

    const [timer, setTimer] = useState(false);
    const onTimer = () => setTimer(!timer);

    const [date, setDate] = useState(null);
    const dateHandler = (e) => {
        e.preventDefault();
        setDate(e.target.value);
    };

    const [calender, setCalender] = useState(false);
    const onCalender = () => setCalender(!calender);

    const [locations, setLocations] = useState([]);
    const [locationOpen, setLocationOpen] = useState(true);
    const onLocationOpen = () => setLocationOpen(!locationOpen);

    const [matching, setMatching] = useState([]);
    const [matchingModalOpen, setMatchingModalOpen] = useState(false);
    const onMatchingModalOpen = () => setMatchingModalOpen(!matchingModalOpen);
    const [matchtingTeamName, setMatchingTeamName] = useState();
    const [matchtingTeamId, setMatchtingTeamId] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const result = await Client.get('/teams');
            console.log(result.data.teams.length);
            if (result.data.teams.length !== 0) return;

            alert('소속된 팀이 없습니다');
        };

        fetchData();
    }, []);

    const onPushMatching = async () => {
        const dateInfo = {
            teamId: matchtingTeamId,
            startDate: date,
            startTime: time,
            regionNames: locations,
        };

        try {
            console.log(dateInfo);
            const { data } = await Client.post(`/matchs`, dateInfo);
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
                    매칭 신청 팀
                </ArrowWrapper>
            </Header>
            <PageBlock>
                <FirstInputBlockTitle>매칭 신청 팀</FirstInputBlockTitle>
                <InputBlockWrapper>
                    <LastButtonInput onClick={onMatchingModalOpen}>
                        <InputTitle>
                            {matchtingTeamName
                                ? `[${matchtingTeamName}]`
                                : '신청 팀을 선택해주세요'}
                            {/* {matchtingTeamId} */}
                        </InputTitle>
                        <RightArrow />
                    </LastButtonInput>
                </InputBlockWrapper>
                <InputBlockTitle>희망 매칭 일시 </InputBlockTitle>
                <InputBlockWrapper>
                    <LastButtonInput
                        style={{ borderBottom: '1px solid #707070' }}
                    >
                        <InputTitle onClick={onCalender}>
                            {date ? date : '매칭 일을 선택해주세요.'}
                        </InputTitle>
                        <RightArrow />
                    </LastButtonInput>
                    <LastButtonInput onClick={onTimer}>
                        <InputTitle>
                            {time ? time : '매칭 시작 시간을 선택해주세요.'}
                        </InputTitle>
                        <RightArrow />
                    </LastButtonInput>
                </InputBlockWrapper>
                <InputBlockTitle>매칭 지역</InputBlockTitle>
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
                <Notice>
                    * 매칭에 대한 안내 및 주의사항입니다.
                    <br />* 매칭현황 공유를 위해 신청자의 개인정보를 수집합니다.
                </Notice>
            </PageBlock>
            <CompletionButton onClick={(() => onPushMatching, onDone)}>
                매칭 신청 완료
            </CompletionButton>
            <BackAltert open={goBack}>
                <Opacity onClick={onGoBack} />
                <AlertModal>
                    <AlertTitle>매칭 예약을 중단하시겠습니까?</AlertTitle>
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
            <LocationBlock>
                <MatchingTeam
                    matchingModalOpen={matchingModalOpen}
                    onMatchingModalOpen={onMatchingModalOpen}
                    setMatchingTeamName={setMatchingTeamName}
                    setMatchtingTeamId={setMatchtingTeamId}
                    matching={matching}
                    setMatching={setMatching}
                />
            </LocationBlock>
        </PageWrapper>
    );
};

export default Matching;
