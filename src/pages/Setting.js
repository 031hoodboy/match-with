import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
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
    Client,
    DoneAltert,
    DoneOpacity,
    Header,
    LastButtonInput,
    Line,
    Opacity,
    PageBlock,
    PageWrapper,
} from '..';

export const Setting = withRouter(({ history }) => {
    const [logoutOpen, setLogoutOpen] = useState(false);
    const onLogoutOpen = () => {
        setLogoutOpen(!logoutOpen);
    };

    const [resignOpen, setResignOpen] = useState(false);
    const onResignOpen = () => {
        setResignOpen(!resignOpen);
    };

    const onResign = async () => {
        await Client.delete('/auth');
        onLogout();
    };

    const onLogout = () => {
        localStorage.removeItem('matchwith-session-id');
        history.push('/start');
    };

    return (
        <PageWrapper>
            <Header>
                <Link
                    to="/main"
                    style={{ textDecoration: 'none', color: '#fff' }}
                >
                    <ArrowWrapper>
                        <BackArrow />
                        설정
                    </ArrowWrapper>
                </Link>
            </Header>
            <PageBlock>
                <InputBlockWrapper>
                    <ButtonInput onClick={onLogoutOpen}>로그아웃</ButtonInput>
                    <LastButtonInput onClick={onResignOpen}>
                        탈퇴하기
                    </LastButtonInput>
                </InputBlockWrapper>
            </PageBlock>
            <Notice>
                Ver. 1.0.0
                <br />
                Copyright 2021 By Match With.
            </Notice>
            <BackAltert open={logoutOpen}>
                <Opacity onClick={onLogoutOpen} />
                <AlertModal>
                    <AlertTitle>로그아웃 하시겠습니까?</AlertTitle>
                    <Line />
                    <AlertSelectWrapper>
                        <AlertSelect onClick={onLogoutOpen}>아니오</AlertSelect>
                        <AlertSelect onClick={onLogout}>예</AlertSelect>
                    </AlertSelectWrapper>
                </AlertModal>
            </BackAltert>
            <DoneAltert done={resignOpen}>
                <DoneOpacity onClick={onResignOpen} />
                <AlertModal>
                    <AlertTitle>
                        탈퇴시 기입된 모든 정보가 초기화됩니다.
                        <br />
                        정말로 탈퇴하시겠습니까?
                    </AlertTitle>
                    <Line />
                    <AlertSelectWrapper>
                        <AlertSelect onClick={onResignOpen}>아니오</AlertSelect>
                        <AlertSelect onClick={onResign}>예</AlertSelect>
                    </AlertSelectWrapper>
                </AlertModal>
            </DoneAltert>
        </PageWrapper>
    );
});

const InputBlockWrapper = styled.div`
    display: flex;
    flex-direction: column;
    border-top: 0.4px solid #707070;
    border-bottom: 0.4px solid #707070;
    background: #fff;
    margin-top: 33px;
`;

const Notice = styled.div`
    position: absolute;
    bottom: 12%;
    font-size: 16px;
    color: #4b4c4d;
    width: 85%;
    line-height: 24px;
    text-align: center;
`;
