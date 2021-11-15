import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
    Alert,
    AlertModal,
    AlertSelect,
    AlertSelectWrapper,
    AlertTitle,
    ArrowWrapper,
    BackAltert,
    BackArrow,
    ButtonInput,
    CompletionButton,
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

export const AffiliatedTeam = withRouter(({ history }) => {
    const [goBack, SetGoBack] = useState(false);
    const onGoBack = () => SetGoBack(!goBack);

    const onDeleteTeam = () => {
        Alert(
            ' 탈퇴시 기입된 모든 정보가 초기화됩니다.\n정말로 탈퇴하시겠습니까?',
            [
                { label: '취소', onClick: (onClose) => onClose() },
                {
                    label: '예',
                    onClick: (onClose) => {
                        onClose();
                        history.push('/main');
                    },
                },
            ]
        );
    };

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
                onClick={onDeleteTeam}
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
        </PageWrapper>
    );
});
