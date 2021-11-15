import React, { useState, useEffect, useCallback } from 'react';
import { Link, withRouter } from 'react-router-dom';
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
    LastInputBlock,
    Line,
    Notice,
    Opacity,
    PageBlock,
    PageWrapper,
    RightArrow,
    LocationBlock,
    ButtonInput,
} from '../components/Pagestyles';
import TeamMember from '../components/TeamMember';
import TeamLeader from '../components/TeamLeader';
import styled from 'styled-components';

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
`;

const BottomActionButtonWrapper = styled.div`
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px;
    box-sizing: border-box;
    bottom: 0px;
    margin: -6px;
    left: 0px;
    right: 0px;
    padding-bottom: calc(12vh);
    & > * {
        margin: 6px;
    }
`;

const Reservation = withRouter(({ location, history, match }) => {
    const [goBack, SetGoBack] = useState(false);
    const onGoBack = () => {
        SetGoBack(!goBack);
    };

    const [done, setDone] = useState(false);
    const onDone = () => {
        setDone(!done);
    };

    const [teamOpen, setTeamOpen] = useState(false);
    const onTeamOpen = () => setTeamOpen(!teamOpen);

    const [leaderModal, setLeaderModal] = useState(false);
    const onLeaderModal = () => setLeaderModal(!leaderModal);

    const [members, setMembers] = useState([]);

    const [teamName, setTeamName] = useState('');
    const teamNameHandeler = (e) => {
        setTeamName(e.target.value);
    };

    useEffect(() => {
        if (!match.params.id) return;
        Client.get(`/teams/${match.params.id}`).then((e) => {
            const storedTeam = e.data.team;
            setTeamName(storedTeam.teamName);
            setMembers(storedTeam.members);
        });
    }, [match]);

    const onPushMemberInfo = async () => {
        try {
            const teamInfo = {
                teamName,
                members,
            };
            const { data } = await Client.post(
                match.params.id ? `/teams/${match.params.id}` : `/teams`,
                teamInfo
            );
            alert('팀 등록이 완료되었습니다.');
            history.push('/main');

            console.log(data);
        } catch (err) {
            console.log('error');
        }
    };

    const onDelTeamInfo = async () => {
        try {
            await Client.delete(`/teams/${match.params.id}`);
            history.push('/profile');
        } catch (err) {
            console.log('error');
        }
    };

    const removeMember = useCallback(
        (phoneNo) => {
            setMembers((prevMembers) =>
                prevMembers.filter((e) => e.phoneNo !== phoneNo)
            );
            console.log(members.filter((e) => e.phoneNo !== phoneNo));
        },
        [members]
    );

    return (
        <PageWrapper>
            <Header>
                <ArrowWrapper onClick={onGoBack}>
                    <BackArrow />팀 등록
                </ArrowWrapper>
            </Header>
            <PageBlock>
                <FirstInputBlockTitle>팀 명</FirstInputBlockTitle>
                <InputBlockWrapper>
                    <LastInputBlock
                        value={teamName}
                        onChange={teamNameHandeler}
                        placeholder="팀 명을입력해주세요."
                    ></LastInputBlock>
                </InputBlockWrapper>
                <InputBlockTitle>팀 대표</InputBlockTitle>
                <InputBlockWrapper>
                    <LastButtonInput onClick={onLeaderModal}>
                        <InputTitle>팀 대표 정보를 입력해주세요.</InputTitle>
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
                    * 팀 등록에 대한 안내 및 주의사항입니다.
                    <br />* 매칭 연결를 위해 팀 원들의 개인정보를 수집합니다.
                </Notice>
            </PageBlock>
            {match.params.id ? (
                <BottomActionButtonWrapper>
                    <StaticSmallActionButton onClick={onDelTeamInfo}>
                        해체
                    </StaticSmallActionButton>
                    <StaticActionButton active onClick={onPushMemberInfo}>
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
                />
            </LocationBlock>
        </PageWrapper>
    );
});

export default Reservation;
