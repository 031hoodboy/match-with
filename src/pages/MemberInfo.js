import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Client } from '../client';
import {
    AlertModal, AlertSelect, AlertSelectWrapper, AlertTitle, ArrowWrapper, BackAltert, BackArrow, CompletionButton, DoneAltert,
    DoneOpacity, FirstInputBlockTitle, Header, InputBlock, InputBlockTitle, InputBlockWrapper, InputTitle, LastButtonInput, Line, Notice, Opacity, PageBlock, PageWrapper, RightArrow
} from '../components/Pagestyles';
import styled, {css} from 'styled-components';

const MemberInfo = () => {
    const [goBack, SetGoBack] = useState(false);
    const onGoBack = () => {
        SetGoBack(!goBack);
    };

    const [done, setDone] = useState(false);
    const onDone = () => {
        setDone(!done);
    };

    const [calender, setCalender] = useState(false);
    const onCalender = () => setCalender(!calender);

    const [level, setLevel] = useState(null);
    const [username, setUsername] = useState(null);
    const [phoneNo, setPhoneNo] = useState(null);
    const [date, setDate] = useState(null);
    const [regionName, setRegionName] = useState(null);


    const dateHandler = (e) => {
        e.preventDefault();
        setDate(e.target.value);
        console.log(e.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            const result = await Client.get('/auth');
            setLevel(result.data.user.level);
            setUsername(result.data.user.username);
            setPhoneNo(result.data.user.phoneNo);
            setRegionName(result.data.user.regionName);
        };

        fetchData();
    }, []);


    // const onSignup = async () => {
    //     try {
    //         const signup = {
    //             username: name,
    //             phoneId,
    //             naverAccessToken,
    //         };
    //         const { data } = await Client.post(`/auth`, signup);
    //     } catch (err) {
    //         onValidateModal();
    //     }
    // };

    return (
        <PageWrapper>
            <Header>
                <ArrowWrapper onClick={onGoBack}>
                    <BackArrow />
                    개인 등록
                </ArrowWrapper>
            </Header>
            <PageBlock>
                <FirstInputBlockTitle>개인 풋살 정보</FirstInputBlockTitle>
                <InputBlockWrapper>
                    <InputBlock placeholder="이름을 입력해주세요." value={username}></InputBlock>
                    <InputBlock placeholder="연락처를 입력해주세요." value={phoneNo}></InputBlock>
                    <Link to="/member-info" style={{ textDecoration: 'none' }}>
                        <LastButtonInput>
                            <InputTitle>풋살 레벨을 선택해주세요.</InputTitle>
                            <RightArrow />
                        </LastButtonInput>
                    </Link>
                </InputBlockWrapper>
                <InputBlockTitle>희망 풋살 매칭 일시</InputBlockTitle>
                <InputBlockWrapper>
                    <Link to="/member-info" style={{ textDecoration: 'none' }}>
                        <LastButtonInput onClick={onCalender}>
                            <InputTitle value={date}>
                                {date}
                            </InputTitle>
                            <RightArrow />
                        </LastButtonInput>
                    </Link>
                </InputBlockWrapper>
                <InputBlockTitle>활동 지역</InputBlockTitle>
                <InputBlockWrapper>
                    <Link to="/member-info" style={{ textDecoration: 'none' }}>
                        <LastButtonInput>
                            <InputTitle>지역을 선택해주세요.</InputTitle>
                            <RightArrow />
                        </LastButtonInput>
                    </Link>
                </InputBlockWrapper>
            </PageBlock>
            <Notice>
                * 개인 등록에 대한 안내 및 주의사항입니다.
                <br />* 매칭 연결를 위해 개인정보를 수집합니다.
            </Notice>
            <CompletionButton onClick={onDone}>
                개인 정보 등록 완료
            </CompletionButton>
            <BackAltert open={goBack}>
                <Opacity onClick={onGoBack} />
                <AlertModal>
                    <AlertTitle>개인 정보 등록을 취소하시겠습니까?</AlertTitle>
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
            <CalenderModal calender={calender}>
                <CalenderOpacity onClick={onCalender} />
                <AlertModal>
                    <input type="date" id="start" name="start" onChange={dateHandler} />
                </AlertModal>
            </CalenderModal>
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
                            to="/matching-date"
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

export const CalenderModal = styled(BackAltert)`
    ${(props) =>
        props.calender &&
        css`
            display: flex;
        `}
`;

export const CalenderOpacity = styled.div`
    width: 100vw;
    height: 100vh;
    background: #000;
    opacity: 0.2;
    z-index: 2;
`;

export default MemberInfo;
