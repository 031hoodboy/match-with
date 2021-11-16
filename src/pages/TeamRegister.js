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
    Client,
    CompletionButton,
    FirstInputBlockTitle,
    Header,
    InputBlockTitle,
    InputBlockWrapper,
    InputTitle,
    LastButtonInput,
    LastInputBlock,
    Line,
    LocationBlock,
    Notice,
    Opacity,
    PageBlock,
    PageWrapper,
    RightArrow,
    TeamLeader,
    TeamMember,
    ButtonWrapper,
} from '..';

export const TeamRegister = withRouter(({ location, history, match }) => {
    const [goBack, SetGoBack] = useState(false);
    const onGoBack = () => {
        SetGoBack(!goBack);
    };

    const [teamOpen, setTeamOpen] = useState(false);
    const onTeamOpen = () => setTeamOpen(!teamOpen);

    const [leaderModal, setLeaderModal] = useState(false);
    const onLeaderModal = () => setLeaderModal(!leaderModal);

    const [members, setMembers] = useState([]);

    const [userLevel, SetUserLevel] = useState('');

    const [dissection, setDissection] = useState(false);
    const onDissection = () => setDissection(!dissection);

    const [teamName, setTeamName] = useState('');
    const teamNameHandeler = (e) => {
        setTeamName(e.target.value);
    };

    useEffect(() => {
        if (!match.params.id) return;
        Client.get(`/teams/${match.params.id}`).then((e) => {
            const storedTeam = e.data.team;
            SetUserLevel(storedTeam.userLevel);
            setTeamName(storedTeam.teamName);
            setMembers(storedTeam.members);
        });
    }, [match]);

    const [username, setUsername] = useState(null);
    const [phoneNo, setPhoneNo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await Client.get('/auth');
            setUsername(result.data.user.username);
            setPhoneNo(result.data.user.phoneNo);
        };
        fetchData();
    }, []);

    const onPushMemberInfo = async () => {
        try {
            const teamInfo = {
                teamName,
                userLevel,
                members,
            };

            await Client.post(
                match.params.id ? `/teams/${match.params.id}` : `/teams`,
                teamInfo
            );
            match.params.id
                ? Alert('팀 수정이 완료되었습니다.')
                : Alert('팀 등록이 완료되었습니다.');

            history.push('/main');
        } catch (err) {}
    };

    const onDelTeamInfo = async () => {
        try {
            await Client.delete(`/teams/${match.params.id}`);
            history.push('/profile');
            Alert('팀이 해체되었습니다.');
        } catch (err) {}
    };

    const removeMember = useCallback(
        (phoneNo) => {
            setMembers((prevMembers) =>
                prevMembers.filter((e) => e.phoneNo !== phoneNo)
            );
        },
        // eslint-disable-next-line
        [members]
    );

    return (
        <PageWrapper>
            {match.params.id ? (
                <Header>
                    <Link
                        to="/profile"
                        style={{ color: '#fff', textDecoration: 'none' }}
                    >
                        <ArrowWrapper onClick={onGoBack}>
                            <BackArrow />팀 등록
                        </ArrowWrapper>
                    </Link>
                </Header>
            ) : (
                <Header>
                    <Link
                        to="/main"
                        style={{ color: '#fff', textDecoration: 'none' }}
                    >
                        <ArrowWrapper onClick={onGoBack}>
                            <BackArrow />팀 등록
                        </ArrowWrapper>
                    </Link>
                </Header>
            )}

            <PageBlock>
                <FirstInputBlockTitle>팀 명</FirstInputBlockTitle>
                <InputBlockWrapper>
                    <LastInputBlock
                        value={teamName}
                        onChange={teamNameHandeler}
                        placeholder="팀명을입력해주세요."
                    ></LastInputBlock>
                </InputBlockWrapper>
                <InputBlockTitle>팀 대표</InputBlockTitle>
                <InputBlockWrapper>
                    <LastButtonInput onClick={onLeaderModal}>
                        <InputTitle>
                            Lv. {userLevel}&nbsp;&nbsp;|&nbsp;&nbsp;
                            {username}
                            &nbsp;&nbsp;|&nbsp;&nbsp;
                            {phoneNo}
                        </InputTitle>
                        <RightArrow />
                    </LastButtonInput>
                </InputBlockWrapper>
                <InputBlockTitle>팀 동료</InputBlockTitle>
                <InputBlockWrapper>
                    {members.map((member) => (
                        <ButtonInput>
                            <InputTitle>
                                Lv. {member.level}&nbsp;&nbsp;|&nbsp;&nbsp;
                                {member.memberName}
                                &nbsp;&nbsp;|&nbsp;&nbsp;
                                {member.phoneNo}
                            </InputTitle>
                            <span onClick={() => removeMember(member.phoneNo)}>
                                X
                            </span>
                        </ButtonInput>
                    ))}
                    <LastButtonInput onClick={onTeamOpen}>
                        <InputTitle>팀 동료 정보를 입력해주세요.</InputTitle>
                        <RightArrow />
                    </LastButtonInput>
                </InputBlockWrapper>
                <Notice>
                    * 팀 등록은 본인이 팀의 대표가 되어 팀을 등록하게 됩니다.
                    <br />* 매칭 연결를 위해 팀 원들의 개인정보를 수집합니다.
                </Notice>
                <ButtonWrapper>
                    {match.params.id ? (
                        <BottomActionButtonWrapper>
                            <StaticSmallActionButton onClick={onDissection}>
                                해체
                            </StaticSmallActionButton>
                            <StaticActionButton
                                active
                                onClick={onPushMemberInfo}
                            >
                                수정 완료
                            </StaticActionButton>
                        </BottomActionButtonWrapper>
                    ) : (
                        <CompletionButton
                            onClick={() => {
                                onPushMemberInfo();
                            }}
                        >
                            팀 등록 완료
                        </CompletionButton>
                    )}
                </ButtonWrapper>
            </PageBlock>

            <BackAltert open={goBack}>
                <Opacity onClick={onGoBack} />
                <AlertModal>
                    <AlertTitle>팀 등록을 중단하시겠습니까?</AlertTitle>
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
            <DissectionAltert open={dissection}>
                <Opacity onClick={onDissection} />
                <AlertModal>
                    <AlertTitle>팀을 해체하시겠습니까?</AlertTitle>
                    <Line />
                    <AlertSelectWrapper>
                        <AlertSelect onClick={onDissection}>아니오</AlertSelect>
                        <Link
                            to="/main"
                            style={{ textDecoration: 'none', color: '#000' }}
                        >
                            <AlertSelect onClick={onDelTeamInfo}>
                                예
                            </AlertSelect>
                        </Link>
                    </AlertSelectWrapper>
                </AlertModal>
            </DissectionAltert>
            <LocationBlock>
                <TeamMember
                    teamOpen={teamOpen}
                    onTeamOpen={onTeamOpen}
                    setTeamOpen={setTeamOpen}
                    members={members}
                    setMembers={setMembers}
                />
            </LocationBlock>
            <LocationBlock>
                <TeamLeader
                    leaderModal={leaderModal}
                    onLeaderModal={onLeaderModal}
                    setLeaderModal={setLeaderModal}
                    SetUserLevel={SetUserLevel}
                    userLevel={userLevel}
                />
            </LocationBlock>
        </PageWrapper>
    );
});

const StaticActionButton = styled(CompletionButton)`
    position: static;
    flex: 1;
    min-width: fit-content;
    padding: 0px 12px;
`;

const StaticSmallActionButton = styled(StaticActionButton)`
    flex-grow: 0;
    flex-shrink: 0;
    min-width: 100px;
    background: #c9e8d6;
    color: #40b65e;
`;

const BottomActionButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5%;
    box-sizing: border-box;
    & > * {
        margin: 6px;
    }
`;

const DissectionAltert = styled.div`
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
