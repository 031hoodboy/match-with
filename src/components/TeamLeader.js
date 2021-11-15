import React, { useState, useEffect, useCallback } from 'react';
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
    CompletionButton,
    DoneAltert,
    DoneOpacity,
    FirstInputBlockTitle,
    Header,
    InputBlockWrapper,
    InfoInputBlockWrapper,
    InputTitle,
    LastButtonInput,
    Line,
    Notice,
    Opacity,
    PageBlock,
    RightArrow,
} from './Pagestyles';
import styled, { css } from 'styled-components';

const TeamLeader = ({
    leaderModal,
    setLeaderModal,
    onLeaderModal,
    SetUserLevel,
}) => {
    const [goBack, SetGoBack] = useState(false);
    const onGoBack = () => {
        SetGoBack(!goBack);
    };

    const [done, setDone] = useState(false);
    const onDone = () => {
        setDone(!done);
    };
    // const [level, setLevel] = useState(null);
    const [username, setUsername] = useState(null);
    const [phoneNo, setPhoneNo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await Client.get('/auth');
            // setLevel(result.data.user.level);
            setUsername(result.data.user.username);
            setPhoneNo(result.data.user.phoneNo);
        };

        fetchData();
    }, []);
    console.log(leaderModal);

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
            </PageBlock>
            <CompletionButton onClick={registerNewMember}>
                인적사항 입력 완료
            </CompletionButton>
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

const LevelSelect = styled.select`
    border: none;
    background: transparent;
    outline: none;
    color: #4b4c4d;
    width: 100%;
`;

export default TeamLeader;
