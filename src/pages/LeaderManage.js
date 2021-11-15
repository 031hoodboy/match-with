import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
    AlertModal,
    AlertSelect,
    AlertSelectWrapper,
    AlertTitle,
    ArrowWrapper,
    BackAltert,
    BackArrow,
    ButtonInput,
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
    Opacity,
    PageBlock,
    PageWrapper,
} from '..';

export const LeaderManage = () => {
    const [goBack, SetGoBack] = useState(false);
    const onGoBack = () => SetGoBack(!goBack);

    const [done, setDone] = useState(false);
    const onDone = () => setDone(!done);

    return (
        <PageWrapper>
            <Header>
                <ArrowWrapper onClick={onGoBack}>
                    <BackArrow />
                    소속 팀
                </ArrowWrapper>
            </Header>
            <PageBlock>
                <FirstInputBlockTitle>팀명 정보</FirstInputBlockTitle>
                <InputBlockWrapper>
                    <LastInputBlock placeholder="팀 명을 입력해주세요."></LastInputBlock>
                </InputBlockWrapper>
                <InputBlockTitle>팀 대표</InputBlockTitle>
                <InputBlockWrapper>
                    <LastButtonInput>
                        <InputTitle>Lv.1 | 가나다 | 010-1234-5678</InputTitle>
                    </LastButtonInput>
                </InputBlockWrapper>
                <InputBlockTitle>매칭 지역</InputBlockTitle>
                <InputBlockWrapper>
                    <ButtonInput>
                        <InputTitle>Lv.1 | 가나다 | 010-1234-5678</InputTitle>
                    </ButtonInput>
                    <ButtonInput>
                        <InputTitle>Lv.1 | 가나다 | 010-1234-5678</InputTitle>
                    </ButtonInput>
                    <LastButtonInput>
                        <InputTitle>Lv.1 | 가나다 | 010-1234-5678</InputTitle>
                    </LastButtonInput>
                </InputBlockWrapper>
            </PageBlock>
            <CompletionButtonWrapper onClick={onDone}>
                <CompletionSmallButton>해체</CompletionSmallButton>
                <CompletionLargeButton>팀 정보 수정하기</CompletionLargeButton>
            </CompletionButtonWrapper>
            <BackAltert open={goBack}>
                <Opacity onClick={onGoBack} />
                <AlertModal>
                    <AlertTitle>팀 관리를 중단하시겠습니까?</AlertTitle>
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
                    <AlertTitle>소속 팀을 해체시키겠습니까?</AlertTitle>
                    <Line />
                    <AlertSelectWrapper>
                        <AlertSelect onClick={onDone}>아니오</AlertSelect>
                        <Link
                            to="/main"
                            style={{ textDecoration: 'none', color: '#000' }}
                        >
                            <AlertSelect>예</AlertSelect>
                        </Link>
                    </AlertSelectWrapper>
                </AlertModal>
            </DoneAltert>
        </PageWrapper>
    );
};

const CompletionButtonWrapper = styled.div`
    width: 90vw;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    font-size: 16px;
    position: fixed;
    bottom: 12vh;
    left: 5%;
    background: none;
`;

const CompletionSmallButton = styled.div`
    width: 30vw;
    height: 50px;
    background: #c9e8d6;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #40b65e;
    font-size: 16px;
    &:active {
        transform: scale(0.98);
    }
`;

const CompletionLargeButton = styled.div`
    width: 55vw;
    height: 50px;
    background: #40b65e;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 16px;
    &:active {
        transform: scale(0.98);
    }
`;
