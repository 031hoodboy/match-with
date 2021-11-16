import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import {
    Alert,
    AlertModal,
    ArrowWrapper,
    BackArrow,
    CalenderModal,
    CalenderOpacity,
    Client,
    CompletionButton,
    FirstInputBlockTitle,
    Header,
    InputBlockTitle,
    InputBlockWrapper,
    InputTitle,
    LastButtonInput,
    Location,
    LocationBlock,
    MatchingTeam,
    Notice,
    PageBlock,
    PageWrapper,
    RightArrow,
    TimeModal,
    ButtonInput,
    TimeOpacity,
    ButtonWrapper,
} from '..';

export const Matching = withRouter(({ history }) => {
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
            if (result.data.teams.length !== 0) return;
            return Alert('소속된 팀이 없습니다');
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
            await Client.post(`/matchs`, dateInfo);
            onDone();
        } catch (err) {}
    };

    const onCancel = () => {
        Alert('매칭 예약을 중단하시겠습니까?', [
            { label: '취소', onClick: (onClose) => onClose() },
            {
                label: '예',
                onClick: (onClose) => {
                    onClose();
                    history.push('/main');
                },
            },
        ]);
    };

    const onDone = () => {
        Alert('신청하신 예약정보 확인 후\n카카오톡으로 안내 드리겠습니다.', [
            {
                label: '확인',
                onClick: (onClose) => {
                    onClose();
                    history.push('/main');
                },
            },
        ]);
    };

    return (
        <PageWrapper>
            <Header>
                <ArrowWrapper onClick={onCancel}>
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
                        </InputTitle>
                        <RightArrow />
                    </LastButtonInput>
                </InputBlockWrapper>
                <InputBlockTitle>희망 매칭 일시 </InputBlockTitle>
                <InputBlockWrapper>
                    <label>
                        <ButtonInput>
                            {date ? date : '매칭 일을 선택해주세요.'}
                            <TimeInputWithIcon
                                type="date"
                                id="start"
                                name="start"
                                onChange={dateHandler}
                            />
                        </ButtonInput>
                    </label>
                    <label>
                        <LastButtonInput>
                            <InputTitle>
                                {time ? time : '매칭 시작 시간을 선택해주세요.'}
                            </InputTitle>
                            <TimeInputWithIcon
                                type="time"
                                id="start"
                                name="start"
                                onChange={timeHandler}
                            />
                        </LastButtonInput>
                    </label>
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
                <ButtonWrapper>
                    <CompletionButton onClick={onPushMatching}>
                        매칭 신청 완료
                    </CompletionButton>
                </ButtonWrapper>
            </PageBlock>

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
});

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
