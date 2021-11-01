import React, {useState} from 'react';
import styled from 'styled-components';
import {
    PageWrapper,
    Header,
    ArrowWrapper,
    BackArrow,
    PageBlock,
    ButtonInput,
    LastButtonInput,
    BackAltert,
    Opacity,
    AlertModal,
    AlertTitle,
    Line,
    AlertSelectWrapper,
    AlertSelect,
    DoneAltert,
    DoneOpacity,
} from '../components/Pagestyles';
import {Link} from 'react-router-dom';

const Setting = () => {

    const [logout, setLogout] = useState(false);
    const onLogout = () => {
        setLogout(!logout)
    }

    const [resign, setResign] = useState(false);
    const onResign = () => {
        setResign(!resign)
    }

    return (
        <PageWrapper>
            <Header>
                <Link to="/main" style={{textDecoration: "none", color: "#fff"}}>
                    <ArrowWrapper>
                        <BackArrow/>
                        설정
                    </ArrowWrapper>
                </Link>
            </Header>
            <PageBlock>
                <InputBlockWrapper>
                    <ButtonInput onClick={onLogout}>로그아웃</ButtonInput>
                    <LastButtonInput onClick={onResign}>탈퇴하기</LastButtonInput>             
                </InputBlockWrapper>
            </PageBlock>
            <Notice>
                Ver. 0.0.0<br/>
                Copyrightⓒ2021 By Match With.
            </Notice>
            <BackAltert open={logout}>
                <Opacity onClick={onLogout}/>
                <AlertModal>
                    <AlertTitle>
                        로그아웃 하시겠습니까?
                    </AlertTitle>
                    <Line/>
                    <AlertSelectWrapper>
                        <AlertSelect onClick={onLogout}>아니오</AlertSelect>
                        <Link to="/start" style={{textDecoration: "none", color: "#000"}}>
                            <AlertSelect>예</AlertSelect>
                        </Link>
                    </AlertSelectWrapper>
                </AlertModal>
            </BackAltert>
            <DoneAltert done={resign}>
                <DoneOpacity onClick={onResign}/>
                <AlertModal>
                    <AlertTitle>
                        탈퇴시 기입된 모든 정보가 초기화됩니다.<br/>
                        정말로 탈퇴하시겠습니까?
                    </AlertTitle>
                    <Line/>
                    <AlertSelectWrapper>
                        <AlertSelect onClick={onResign}>아니오</AlertSelect>
                        <Link to="/" style={{textDecoration: "none", color: "#000"}}>
                            <AlertSelect>예</AlertSelect>
                        </Link>
                    </AlertSelectWrapper>
                </AlertModal>
            </DoneAltert>
        </PageWrapper>
    )
}

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
    color: #4B4C4D;
    width: 85%;
    line-height: 24px;
    text-align: center;
`;

export default Setting;