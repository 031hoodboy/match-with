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
    InputBlockTitle,
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
} from '../components/Pagestyles';import ArrowImg from '../assets/arrow.png';
import {Link} from 'react-router-dom';
import RightArrowImg from '../assets/rightarrow.png';

const MatchingDate = () => {

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
                <ArrowWrapper onClick={onGoBack} >
                    <BackArrow/>
                    희망 풋살 매칭 일시
                </ArrowWrapper>
            </Header>
            <PageBlock>
                <FirstInputBlockTitle>매칭 요일</FirstInputBlockTitle>
                <InputBlockWrapper>
                    <Link to="/matching-date" style={{textDecoration: "none"}}>
                        <LastButtonInput>
                            <InputTitle>매칭 요일을 선택해주세요.</InputTitle>
                            <RightArrow/>
                        </LastButtonInput>
                    </Link>
                </InputBlockWrapper>
                <FirstInputBlockTitle>희망 매칭 일시 </FirstInputBlockTitle>
                <InputBlockWrapper>
                    <Link to="/matching-date" style={{textDecoration: "none"}}>
                        <LastButtonInput style={{ borderBottom: "1px solid #707070"}}>
                            <InputTitle>매칭 시작 시간을 선택해주세요.</InputTitle>
                            <RightArrow/>
                        </LastButtonInput>
                    </Link>
                    <Link to="/matching-date" style={{textDecoration: "none"}}>
                        <LastButtonInput>
                            <InputTitle>매칭 종료 시간을 선택해주세요.</InputTitle>
                            <RightArrow/>
                        </LastButtonInput>
                    </Link>
                </InputBlockWrapper>
            </PageBlock>
            <CompletionButton onClick={onDone}>
                매칭일시 입력 완료
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

export default MatchingDate;