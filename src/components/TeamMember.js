import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Client } from '../client';

import {
    AlertModal,
    AlertSelect,
    AlertSelectWrapper,
    AlertTitle,
    ArrowWrapper,
    BackAltert,
    BackArrow,
    CompletionButton,
    DoneAltert,
    DoneOpacity,
    FirstInputBlockTitle,
    Header,
    InputBlock,
    InputBlockWrapper,
    InputTitle,
    LastButtonInput,
    Line,
    Notice,
    Opacity,
    PageBlock,
    RightArrow,
} from './Pagestyles';
import styled, { css } from 'styled-components';

const TeamMember = ({ teamOpen, onTeamOpen, setTeamOpen }) => {
    const [members, setMembersLocal] = useState([]);
    const [goBack, SetGoBack] = useState(false);
    const onGoBack = () => {
        SetGoBack(!goBack);
    };

    const [done, setDone] = useState(false);
    const onDone = () => {
        setDone(!done);
    };

    const [levelOpen, setlevelOpen] = useState(false);
    const onLevelOpen = () => setlevelOpen(!levelOpen);

    const selectList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const [levelSelected, setLevelSelected] = useState();
    const handleSelect = (e) => {
        setLevelSelected(e.target.value);
        setMembersLocal({ ...members, levelSelected });
    };

    const [memberName, setMemberName] = useState(null);
    const memberNameHandeler = (e) => {
        setMemberName(e.target.value);
        setMembersLocal({ ...members, memberName });
    };

    const [phoneNo, setPhoneNo] = useState(null);
    const phoneNoHandler = (e) => {
        setPhoneNo(e.target.value);
        setMembersLocal({ ...members, phoneNo });
    };

    const onPushMemberInfo = async () => {
        const members = {
            memberName,
            phoneNo,
            level: levelSelected,
        };
        try {
            const { data } = await Client.post(`/teams`, members);
            console.log(data);
        } catch (err) {
            console.log('error');
        }
    };

    return (
        <PageWrapper open={teamOpen}>
            <Header>
                <ArrowWrapper onClick={onTeamOpen}>
                    <BackArrow />팀 동료 입력
                </ArrowWrapper>
            </Header>
            <PageBlock>
                <FirstInputBlockTitle>팀 동료 인적사항</FirstInputBlockTitle>
                <InputBlockWrapper>
                    <InputBlock
                        onChange={memberNameHandeler}
                        placeholder="이름을 입력해주세요."
                    ></InputBlock>
                    <InputBlock
                        onChange={phoneNoHandler}
                        placeholder="연락처를 입력해주세요."
                    ></InputBlock>
                    <LastButtonInput onClick={onLevelOpen}>
                        <InputTitle>
                            {levelSelected
                                ? `Lv. ${levelSelected}`
                                : '풋살 레벨을 선택해주세요.'}
                        </InputTitle>
                        <RightArrow />
                    </LastButtonInput>
                </InputBlockWrapper>
            </PageBlock>
            <Notice>
                * 입력된 연락처의 가입 회원이 있을 경우 해당 회원의 <br />
                &nbsp;&nbsp;소속팀에 자동으로 추가됩니다.
            </Notice>
            <CompletionButton onClick={onTeamOpen}>
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
            <LevelModal level={levelOpen}>
                <LevelOpacity onClick={onLevelOpen} />
                <AlertModal>
                    <select onChange={handleSelect} value={levelSelected}>
                        {selectList.map((item) => (
                            <option value={item} key={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </AlertModal>
            </LevelModal>
        </PageWrapper>
    );
};

const PageWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: none;
    ${(props) =>
        props.open &&
        css`
            display: block;
        `}
`;

const LevelModal = styled.div`
    position: absolute;
    display: none;
    top: 0;
    ${(props) =>
        props.level &&
        css`
            display: flex;
        `}
`;

const LevelOpacity = styled.div`
    width: 100vw;
    height: 100vh;
    background: #000;
    opacity: 0.2;
    z-index: 2;
`;
export default TeamMember;
