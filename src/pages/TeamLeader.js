import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
    InputTitle,
    LastButtonInput,
    Line,
    Notice,
    Opacity,
    PageBlock,
    PageWrapper,
    RightArrow,
} from '../components/Pagestyles';

const TeamLeader = () => {
    const [goBack, SetGoBack] = useState(false);
    const onGoBack = () => {
        SetGoBack(!goBack);
    };

    const [done, setDone] = useState(false);
    const onDone = () => {
        setDone(!done);
    };

    return (
        <PageWrapper>
            <Header>
                <Link
                    to="/team-register"
                    style={{ textDecoration: 'none', color: '#fff' }}
                >
                    <ArrowWrapper>
                        <BackArrow />팀 대표 입력
                    </ArrowWrapper>
                </Link>
            </Header>
            <PageBlock>
                <FirstInputBlockTitle>팀 대표 인적사항</FirstInputBlockTitle>
                <InputBlockWrapper>
                    <ButtonInput>홍길동</ButtonInput>
                    <ButtonInput>010-1234-5678</ButtonInput>
                    <LastButtonInput onClick={onDone}>
                        <InputTitle>풋살 레벨을 선택해주세요.</InputTitle>
                        <RightArrow />
                    </LastButtonInput>
                </InputBlockWrapper>
            </PageBlock>
            <Notice>* 레벨에 따른 간략한 소개 문구</Notice>
            <CompletionButton onClick={onDone}>
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

export default TeamLeader;
