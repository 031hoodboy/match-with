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
    CompletionButton,
    FirstInputBlockTitle,
    Header,
    InputBlockTitle,
    InputBlockWrapper,
    InputTitle,
    LastButtonInput,
    Line,
    Opacity,
    PageBlock,
    PageWrapper,
    LastInputBlock,
    ButtonInput,
    RightArrow,
} from '../components/Pagestyles';

const EditTeamInfo = () => {
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
                <ArrowWrapper onClick={onGoBack}>
                    <BackArrow />
                    소속 팀 정보 수정
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
                        <RightArrow />
                    </LastButtonInput>
                </InputBlockWrapper>
                <InputBlockTitle>매칭 지역</InputBlockTitle>
                <InputBlockWrapper>
                    <ButtonInput>
                        <InputTitle>Lv.1 | 가나다 | 010-1234-5678</InputTitle>
                        <RightArrow />
                    </ButtonInput>
                    <ButtonInput>
                        <InputTitle>Lv.1 | 가나다 | 010-1234-5678</InputTitle>
                        <RightArrow />
                    </ButtonInput>
                    <ButtonInput>
                        <InputTitle>Lv.1 | 가나다 | 010-1234-5678</InputTitle>
                        <RightArrow />
                    </ButtonInput>
                    <LastButtonInput>
                        <InputTitle>팀 동료 정보를 입력해주세요.</InputTitle>
                        <RightArrow />
                    </LastButtonInput>
                </InputBlockWrapper>
            </PageBlock>
            <CompletionButton
                onClick={onDone}
                style={{ background: '#40B65E' }}
            >
                팀 정보 수정 완료
            </CompletionButton>
            <BackAltert open={goBack}>
                <Opacity onClick={onGoBack} />
                <AlertModal>
                    <AlertTitle>
                        소속 팀 정보 수정을 <br /> 취소 하시겠습니까?
                    </AlertTitle>
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
};

export default EditTeamInfo;
