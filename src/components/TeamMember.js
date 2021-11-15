import React, { useState, useCallback, useEffect } from 'react';
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

const TeamMember = ({ teamOpen, onTeamOpen, setTeamOpen, setMembers }) => {
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
    const [level, setLevelSelected] = useState();

    const [memberName, setMemberName] = useState(null);

    const [phoneNo, setPhoneNo] = useState(null);

    // useEffect(() => {

    // }, [setPhoneNo, setMemberName, setLevelSelected]);

    const registerNewMember = useCallback(() => {
        onTeamOpen();
        setMembers((prevMembers) => [
            ...prevMembers,
            {
                level,
                memberName,
                phoneNo,
            },
        ]);
        onReset();
    }, [level, memberName, phoneNo, setMembers, onTeamOpen]);

    const phoneNoHandler = (e) => {
        setPhoneNo(() => e.target.value);
    };

    const memberNameHandeler = (e) => {
        setMemberName(() => e.target.value);
    };

    const handleSelect = (e) => {
        setLevelSelected(e.target.value);
    };

    const onReset = () => {
        setPhoneNo('');
        setMemberName('');
        setLevelSelected('');
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
                        value={memberName}
                    ></InputBlock>
                    <InputBlock
                        onChange={phoneNoHandler}
                        placeholder="연락처를 입력해주세요."
                        value={phoneNo}
                    ></InputBlock>
                    <LastButtonInput>
                        <LevelSelect
                            onChange={handleSelect}
                            placeholder="클릭해달래요"
                            value={level}
                        >
                            <option
                                value=""
                                disabled
                                selected
                                style={{ color: '#40b65e' }}
                            >
                                풋살 레벨을 선택해주세요.
                            </option>
                            {selectList.map((item) => (
                                <option value={item} key={item}>
                                    Lv. {item}
                                </option>
                            ))}
                        </LevelSelect>
                    </LastButtonInput>
                </InputBlockWrapper>
                <Notice>
                    * 입력된 연락처의 가입 회원이 있을 경우 해당 회원의 <br />
                    &nbsp;&nbsp;소속팀에 자동으로 추가됩니다.
                </Notice>
            </PageBlock>
            <CompletionButton onClick={registerNewMember}>
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
                    <select onChange={handleSelect} value={level}>
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

const LevelSelect = styled.select`
    border: none;
    background: transparent;
    outline: none;
    color: #4b4c4d;
    width: 100%;
`;
export default TeamMember;
