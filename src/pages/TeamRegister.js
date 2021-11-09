import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
} from '../components/Pagestyles';
import TeamMember from '../components/TeamMember';

const Reservation = () => {
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

    const [members, setMembers] = useState([]);

    console.log(teamOpen);

    const [teamName, setTeamName] = useState(null);
    const teamNameHandeler = (e) => {
        setTeamName(e.target.value);
    };

    const onPushMemberInfo = async () => {
        try {
            const teamInfo = {
                teamName,
                members,
            };
            const { data } = await Client.post(`/teams`, teamInfo);
            console.log(data);
        } catch (err) {
            console.log('error');
        }
    };
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
                        onChange={teamNameHandeler}
                        placeholder="팀 명을입력해주세요."
                    ></LastInputBlock>
                </InputBlockWrapper>
                <InputBlockTitle>팀 대표</InputBlockTitle>
                <InputBlockWrapper>
                    <Link to="/team-leader" style={{ textDecoration: 'none' }}>
                        <LastButtonInput>
                            <InputTitle>
                                팀 대표 정보를 입력해주세요.
                            </InputTitle>
                            <RightArrow />
                        </LastButtonInput>
                    </Link>
                </InputBlockWrapper>
                <InputBlockTitle>팀 동료</InputBlockTitle>
                <InputBlockWrapper>
                    <LastButtonInput onClick={onTeamOpen}>
                        <InputTitle>팀 동료 정보를 입력해주세요.</InputTitle>
                        <RightArrow />
                    </LastButtonInput>
                </InputBlockWrapper>
            </PageBlock>
            <Notice>
                * 팀 등록에 대한 안내 및 주의사항입니다.
                <br />* 매칭 연결를 위해 팀 원들의 개인정보를 수집합니다.
            </Notice>
            <CompletionButton
                onClick={() => {
                    onPushMemberInfo();
                    onDone();
                }}
            >
                팀 등록 완료
            </CompletionButton>
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
            <LocationBlock>
                <TeamMember
                    teamOpen={teamOpen}
                    onTeamOpen={onTeamOpen}
                    setTeamOpen={setTeamOpen}
                    members={members}
                    setMembers={setMembers}
                />
            </LocationBlock>
        </PageWrapper>
    );
};

export default Reservation;
