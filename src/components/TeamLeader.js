import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import {
    ArrowWrapper,
    BackArrow,
    ButtonInput,
    Client,
    CompletionButton,
    FirstInputBlockTitle,
    Header,
    InfoInputBlockWrapper,
    LastButtonInput,
    Notice,
    ButtonWrapper,
    PageBlock,
} from '..';

export const TeamLeader = ({ leaderModal, onLeaderModal, SetUserLevel }) => {
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

    const selectList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const [level, setLevelSelected] = useState();
    const handleSelect = (e) => {
        setLevelSelected(e.target.value);
    };

    const registerNewMember = useCallback(() => {
        onLeaderModal();
        SetUserLevel(level);
    }, [level, SetUserLevel, onLeaderModal]);

    return (
        <PageWrapper open={leaderModal}>
            <Header>
                <ArrowWrapper onClick={onLeaderModal}>
                    <BackArrow />팀 대표 입력
                </ArrowWrapper>
            </Header>
            <PageBlock>
                <FirstInputBlockTitle>팀 대표 인적사항</FirstInputBlockTitle>
                <InfoInputBlockWrapper>
                    <ButtonInput>{username}</ButtonInput>
                    <ButtonInput>{phoneNo}</ButtonInput>
                    <LastButtonInput>
                        <LevelSelect
                            onChange={handleSelect}
                            placeholder="클릭해달래요"
                            value={level}
                        >
                            <option
                                value=""
                                disabled
                                selected
                                style={{ color: '#40b65e' }}
                            >
                                풋살 레벨을 선택해주세요.
                            </option>
                            {selectList.map((item) => (
                                <option value={item} key={item}>
                                    Lv. {item}
                                </option>
                            ))}
                        </LevelSelect>
                    </LastButtonInput>
                </InfoInputBlockWrapper>
                <Notice>* 레벨에 따른 간략한 소개 문구</Notice>
                <ButtonWrapper>
                    <CompletionButton onClick={registerNewMember}>
                        인적사항 입력 완료
                    </CompletionButton>
                </ButtonWrapper>
            </PageBlock>
        </PageWrapper>
    );
};

const PageWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    ${(props) =>
        props.open &&
        css`
            display: block;
        `}
`;

const LevelSelect = styled.select`
    border: none;
    background: transparent;
    outline: none;
    color: #4b4c4d;
    width: 100%;
`;
