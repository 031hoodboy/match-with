import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    AlertModal,
    AlertSelect,
    AlertSelectWrapper,
    AlertTitle,
    ArrowWrapper,
    BackAltert,
    BackArrow,
    ButtonInput,
    Client,
    DoneAltert,
    DoneOpacity,
    FirstInputBlockTitle,
    Header,
    InputBlockTitle,
    InputBlockWrapper,
    InputTitle,
    LastButtonInput,
    Line,
    Opacity,
    PageBlock,
    PageWrapper,
    RightArrow,
    ButtonWrapper,
    CompletionButton,
} from '..';

export const Profile = () => {
    const [goBack, SetGoBack] = useState(false);
    const [done, setDone] = useState(false);

    const [level, setLevel] = useState(null);
    const [username, setUsername] = useState(null);
    const [phoneNo, setPhoneNo] = useState(null);
    const [regionName, setRegionName] = useState(null);

    const onGoBack = () => SetGoBack(!goBack);
    const onDone = () => setDone(!done);
    const [allTeams, setAllTeams] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await Client.get('/auth');
            setLevel(result.data.user.level);
            setUsername(result.data.user.username);
            setPhoneNo(result.data.user.phoneNo);
            setRegionName(result.data.user.regionName);
        };

        const fetchTeamsData = async () => {
            const teams = await Client.get('/teams');
            setAllTeams(teams.data.teams);
        };

        fetchData();
        fetchTeamsData();
    }, []);

    return (
        <PageWrapper>
            <Header>
                <Link
                    to="/main"
                    style={{ textDecoration: 'none', color: '#fff' }}
                >
                    <ArrowWrapper>
                        <BackArrow />내 프로필
                    </ArrowWrapper>
                </Link>
            </Header>
            <PageBlock>
                <FirstInputBlockTitle>
                    Lv. {level} {username}
                </FirstInputBlockTitle>
                {regionName ? (
                    <>
                        <InputBlockWrapper>
                            <ButtonInput>{username}</ButtonInput>
                            <ButtonInput>{phoneNo}</ButtonInput>
                            <LastButtonInput>
                                {regionName ? regionName : 'asd'}
                            </LastButtonInput>
                        </InputBlockWrapper>
                        <InputBlockTitle>
                            소속 팀 ({allTeams.length})
                        </InputBlockTitle>
                        <InputBlockWrapper>
                            {allTeams.map((teams, index) => (
                                <Link
                                    to={`/team-register/${teams.teamId}`}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <ButtonInput
                                        isLast={index === allTeams.length - 1}
                                    >
                                        {teams.teamName}
                                        <RightArrow />
                                    </ButtonInput>
                                </Link>
                            ))}
                        </InputBlockWrapper>
                    </>
                ) : (
                    <>
                        <InputBlockWrapper>
                            <Link
                                to="/member-info"
                                style={{ textDecoration: 'none' }}
                            >
                                <LastButtonInput>
                                    <InputTitle>
                                        등록된 개인정보가 없습니다.
                                    </InputTitle>
                                    <RightArrow />
                                </LastButtonInput>
                            </Link>
                        </InputBlockWrapper>
                        <InputBlockTitle>
                            소속 팀 ({allTeams.length})
                        </InputBlockTitle>
                        <InputBlockWrapper>
                            {allTeams.map((teams, index) => (
                                <Link
                                    to={`/team-register/${teams.teamId}`}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <ButtonInput
                                        isLast={index === allTeams.length - 1}
                                    >
                                        {teams.teamName}
                                        <RightArrow />
                                    </ButtonInput>
                                </Link>
                            ))}
                        </InputBlockWrapper>
                    </>
                )}
                <ButtonWrapper>
                    <Link
                        to="/team-register"
                        style={{ textDecoration: 'none' }}
                    >
                        <CompletionButton>소속 팀 추가하기</CompletionButton>
                    </Link>
                </ButtonWrapper>
            </PageBlock>
            <BackAltert open={goBack}>
                <Opacity onClick={onGoBack} />
                <AlertModal>
                    <AlertTitle>풋살장 예약을 중단하시겠습니까?</AlertTitle>
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
        </PageWrapper>
    );
};
