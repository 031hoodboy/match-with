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
} from '../components/Pagestyles';
import {Link} from 'react-router-dom';

const Matching = () => {

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
                    매칭 신청 팀
                </ArrowWrapper>
            </Header>
            <PageBlock>
                <FirstInputBlockTitle>예약자 정보</FirstInputBlockTitle>
                <InputBlockWrapper>
                    <Link to="/matching-team" style={{textDecoration: "none"}}>
                        <LastButtonInput>
                            <InputTitle>신청 팀을 선택해주세요.</InputTitle>
                            <RightArrow/>
                        </LastButtonInput>
                    </Link>
                </InputBlockWrapper>
                <InputBlockTitle>희망 매칭 일시 </InputBlockTitle>
                <InputBlockWrapper>
                    <Link to="/matching" style={{textDecoration: "none"}}>
                        <LastButtonInput style={{ borderBottom: "1px solid #707070"}}>
                            <InputTitle>매칭일을 선택해주세요.</InputTitle>
                            <RightArrow/>
                        </LastButtonInput>
                    </Link>
                    <Link to="/matching" style={{textDecoration: "none"}}>
                        <LastButtonInput>
                            <InputTitle>매칭 시작 시간을 선택해주세요.</InputTitle>
                            <RightArrow/>
                        </LastButtonInput>
                    </Link>
                </InputBlockWrapper>
                <InputBlockTitle>매칭 지역</InputBlockTitle>
                <InputBlockWrapper>
                    <Link to="/location" style={{textDecoration: "none"}}>
                        <LastButtonInput>
                            <InputTitle>지역을 선택해주세요.</InputTitle>
                            <RightArrow/>
                        </LastButtonInput>
                    </Link>
                </InputBlockWrapper>
            </PageBlock>
            <Notice>
                * 매칭에 대한 안내 및 주의사항입니다.<br/>
                * 매칭현황 공유를 위해 신청자의 개인정보를 수집합니다.
            </Notice>
            <CompletionButton onClick={onDone}>
                매칭 신청 완료
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

export default Matching;