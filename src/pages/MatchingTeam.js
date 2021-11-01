import React, {useState} from 'react';
import styled, {css, keyframes} from 'styled-components';
import {
    PageWrapper,
    Header,
    ArrowWrapper,
    BackArrow,
    PageBlock,
    InputBlockWrapper,
    ButtonInput,
    LastButtonInput,
    FirstInputBlockTitle,
    Notice, 
    BackAltert,
    Opacity,
    AlertModal,
    AlertTitle,
    Line,
    AlertSelectWrapper,
    AlertSelect,
} from '../components/Pagestyles';
import {Link} from 'react-router-dom';

const MatchingTeam = () => {

    const [goBack, SetGoBack] = useState(false);
    const onGoBack = () => {
        SetGoBack(!goBack)
    }
    
    return (
        <PageWrapper>
            <Header>
                <Link to="/matching" style={{textDecoration: "none", color: "#fff"}}>
                <ArrowWrapper>
                    <BackArrow/>
                        신청 팀 선택
                </ArrowWrapper>
                </Link>
            </Header>
            <PageBlock>
                <FirstInputBlockTitle>등록 팀 목록</FirstInputBlockTitle>
                <InputBlockWrapper>
                    <ButtonInput onClick={onGoBack}>팀명 A</ButtonInput>
                    <ButtonInput onClick={onGoBack}>팀명 B</ButtonInput>
                    <LastButtonInput>팀명 C</LastButtonInput>
                </InputBlockWrapper>
            </PageBlock>
            <Notice>
                * 경기매칭은 본인이 대표로 소속된 팀으로만 신청이 <br/>
                    가능 합니다.
            </Notice>
            <BackAltert open={goBack}>
                <Opacity onClick={onGoBack}/>
                <AlertModal>
                    <AlertTitle>
                        신청하신 [팀명]은 팀원 수가 <br/>
                        매칭 최소 조건에 충족되지 않습니다.
                    </AlertTitle>
                    <Line/>
                    <AlertSelectWrapper>
                        <AlertSelect onClick={onGoBack}>확인</AlertSelect>
                    </AlertSelectWrapper>
                </AlertModal>
            </BackAltert>
        </PageWrapper>
    )
}

export default MatchingTeam;