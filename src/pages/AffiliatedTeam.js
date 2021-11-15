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

export const AffiliatedTeam = () => {
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
            <CompletionButton
                onClick={onDone}
                style={{ background: '#40B65E' }}
            >
                팀 탈퇴하기
            </CompletionButton>
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
                    <AlertTitle>
                        탈퇴시 기입된 모든 정보가 초기화됩니다.
                        <br />
                        정말로 탈퇴하시겠습니까?
                    </AlertTitle>
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
