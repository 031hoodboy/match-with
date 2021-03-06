import React, { useEffect, useState } from 'react';
import { MdCheckCircle } from 'react-icons/md';
import styled, { css } from 'styled-components';
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
    FirstInputBlockTitle,
    Header,
    InputBlockWrapper,
    Line,
    Notice,
    Opacity,
    PageBlock,
} from '..';

export const MatchingTeam = ({
    matchingModalOpen,
    onMatchingModalOpen,
    setMatchingTeamName,
    setMatchtingTeamId,
}) => {
    const [goBack, SetGoBack] = useState(false);
    const onGoBack = () => SetGoBack(!goBack);

    const [allTeams, setAllTeams] = useState([]);
    const [selectedTeam] = useState(undefined);

    useEffect(() => {
        const fetchData = async () => {
            const result = await Client.get('/teams');
            setAllTeams(result.data.teams);
        };
        fetchData();
    }, []);

    const onClick = ({ teamName, teamId }) => () => {
        setMatchingTeamName(teamName);
        setMatchtingTeamId(teamId);
        onMatchingModalOpen();
    };

    return (
        <PageWrapper open={matchingModalOpen}>
            <Header>
                <ArrowWrapper onClick={onMatchingModalOpen}>
                    <BackArrow />
                    신청 팀 선택
                </ArrowWrapper>
            </Header>
            <PageBlock>
                <FirstInputBlockTitle>등록 팀 목록</FirstInputBlockTitle>
                <InputBlockWrapper>
                    {allTeams.map((team, index) => (
                        <ButtonInput
                            onClick={onClick(team)}
                            key={team.teamName}
                            isLast={index === allTeams.length - 1}
                        >
                            {team.teamName}
                            <CheckCircle select={allTeams === team.teamName}>
                                {selectedTeam === team.teamName && (
                                    <MdCheckCircle />
                                )}
                            </CheckCircle>
                        </ButtonInput>
                    ))}
                </InputBlockWrapper>
                <Notice>
                    * 팀 인원이 6 명 이상이어야 매칭 진행이 가능합니다.
                    <br />* 경기매칭은 본인이 대표로 소속된 팀으로만 신청이
                    가능합니다.
                </Notice>
            </PageBlock>
            <BackAltert open={goBack}>
                <Opacity onClick={onGoBack} />
                <AlertModal>
                    <AlertTitle>
                        신청하신 [팀명]은 팀원 수가 <br />
                        매칭 최소 조건에 충족되지 않습니다.
                    </AlertTitle>
                    <Line />
                    <AlertSelectWrapper>
                        <AlertSelect onClick={onGoBack}>확인</AlertSelect>
                    </AlertSelectWrapper>
                </AlertModal>
            </BackAltert>
        </PageWrapper>
    );
};

const PageWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: none;
    ${(props) =>
        props.open &&
        css`
            display: block;
        `}
`;

const CheckCircle = styled.div`
    border-radius: 16px;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 3px;
    cursor: pointer;
    ${(props) =>
        props.select &&
        css`
            color: #40b65e;
        `}
`;
