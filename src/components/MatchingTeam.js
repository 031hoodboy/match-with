import React, { useState, useEffect } from 'react';
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
    ButtonInput,
    FirstInputBlockTitle,
    Header,
    InputBlockWrapper,
    LastButtonInput,
    Line,
    Notice,
    Opacity,
    PageBlock,
} from './Pagestyles';
import styled, { css } from 'styled-components';
const MatchingTeam = ({
    matchingModalOpen,
    onMatchingModalOpen,
    setMatching,
}) => {
    const [goBack, SetGoBack] = useState(false);
    const onGoBack = () => {
        SetGoBack(!goBack);
    };

    const [allTeams, setAllTeams] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await Client.get('/teams');
            setAllTeams(result.data.teams);
            console.log(result.data.teams);
        };

        fetchData();
    }, []);
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
                    {allTeams.map((teams) => (
                        <ButtonInput onClick={onGoBack}>
                            {teams.teamName}
                            {teams.members.map((members) => (
                                <div>{members.memberName}</div>
                            ))}
                        </ButtonInput>
                    ))}
                    <LastButtonInput>팀명 C</LastButtonInput>
                </InputBlockWrapper>
            </PageBlock>
            <Notice>
                * 경기매칭은 본인이 대표로 소속된 팀으로만 신청이 <br />
                가능 합니다.
            </Notice>
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

export default MatchingTeam;
