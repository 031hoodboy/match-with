import React, {useState} from 'react';
import styled, {css, keyframes} from 'styled-components';
import {
    PageWrapper,
    Header,
    ArrowWrapper,
    BackArrow,
    PageBlock,
    InputBlockWrapper,
    InputBlock,
    LastButtonInput,
    InputTitle,
    RightArrow,
    FirstInputBlockTitle,
    Notice,
    CompletionButton,
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

const TeamMember = () => {

    const [goBack, SetGoBack] = useState(false);
    const onGoBack = () => {
        SetGoBack(!goBack)
    }

    const [done, setDone] = useState(false);
    const onDone = () => {
        setDone(!done)
    }

    return (
        <PageWrapper>
            <Header>
                <Link to="/team-register" style={{textDecoration: "none", color: "#fff"}}>
                    <ArrowWrapper>
                        <BackArrow/>
                        팀 동료 입력
                    </ArrowWrapper>
                </Link>
            </Header>
            <PageBlock>
                <FirstInputBlockTitle>팀 동료 인적사항</FirstInputBlockTitle>
                <InputBlockWrapper>
                    <InputBlock placeholder="이름을 입력해주세요."></InputBlock>
                    <InputBlock placeholder="연락처를 입력해주세요."></InputBlock>
                    <LastButtonInput onClick={onDone}>
                        <InputTitle>풋살 레벨을 선택해주세요.</InputTitle>
                        <RightArrow/>
                    </LastButtonInput>
                </InputBlockWrapper>
                
            </PageBlock>
            <Notice>
                * 입력된 연락처의 가입 회원이 있을 경우 해당 회원의 <br/>
                &nbsp;&nbsp;소속팀에 자동으로 추가됩니다.
            </Notice>
            <CompletionButton onClick={onDone}>
                인적사항 입력 완료                
            </CompletionButton>
            <BackAltert open={goBack}>
                <Opacity onClick={onGoBack}/>
                <AlertModal>
                    <AlertTitle>
                        풋살장 예약을 중단하시겠습니까?
                    </AlertTitle>
                    <Line/>
                    <AlertSelectWrapper>
                        <AlertSelect onClick={onGoBack}>아니오</AlertSelect>
                        <Link to="/main" style={{textDecoration: "none", color: "#000"}}>
                            <AlertSelect>예</AlertSelect>
                        </Link>
                    </AlertSelectWrapper>
                </AlertModal>
            </BackAltert>
            <DoneAltert done={done}>
                <DoneOpacity onClick={onDone}/>
                <AlertModal>
                    <AlertTitle>
                        신청하신 예약정보 확인 후 <br/>
                        카카오톡으로 안내 드리겠습니다.
                    </AlertTitle>
                    <Line/>
                    <AlertSelectWrapper>
                        <Link to="/main" style={{textDecoration: "none", color: "#000"}}>
                            <AlertSelect>확인</AlertSelect>
                        </Link>
                    </AlertSelectWrapper>
                </AlertModal>
            </DoneAltert>
        </PageWrapper>
    )
}

export default TeamMember;