import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import {
    ArrowWrapper,
    BackArrow,
    CompletionButton,
    FirstInputBlockTitle,
    Header,
    InfoInputBlockWrapper,
    InputBlock,
    LastButtonInput,
    Notice,
    PageBlock,
    ButtonWrapper,
    Opacity,
    AlertModal,
    AlertTitle,
    Line,
    AlertSelectWrapper,
    AlertSelect,
} from '..';
import { Alert } from '../alert';

export const TeamMember = ({ teamOpen, onTeamOpen, setMembers }) => {
    const selectList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const [level, setLevelSelected] = useState(null);
    const [memberName, setMemberName] = useState(null);
    const [phoneNo, setPhoneNo] = useState([null]);

    const phoneNoHandler = (e) => {
        const regex = /^[0-9\b -]{0,13}$/;
        if (regex.test(e.target.value)) {
            setPhoneNo(e.target.value);
        }
    };

    useEffect(() => {
        if (phoneNo.length === 10) {
            setPhoneNo(phoneNo.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
        }

        if (phoneNo.length === 13) {
            setPhoneNo(
                phoneNo
                    .replace(/-/g, '')
                    .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
            );
        }
    }, [phoneNo]);
    const [addMember, setAddMember] = useState(false);
    const onAddMember = () => setAddMember(!addMember);

    const registerNewMember = useCallback(() => {
        if (
            memberName === '' ||
            level === '' ||
            phoneNo === '' ||
            memberName === null ||
            level === null ||
            phoneNo === null
        ) {
            // setAddMember(true);
            Alert('팀 동료의 인적사항이 입력되지 않았습니다.');
        } else {
            onTeamOpen();

            setMembers((prevMembers) => [
                ...prevMembers,
                {
                    level,
                    memberName,
                    phoneNo,
                },
            ]);
        }
        onReset();
    }, [onTeamOpen, memberName, level, phoneNo, setMembers]);

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
                <InfoInputBlockWrapper>
                    <InputBlock
                        onChange={memberNameHandeler}
                        placeholder="이름을 입력해주세요."
                        value={memberName}
                    ></InputBlock>
                    <InputBlock
                        type="tel"
                        onChange={phoneNoHandler}
                        placeholder="연락처를 입력해주세요."
                        value={phoneNo}
                        maxlength="13"
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
                </InfoInputBlockWrapper>
                <Notice>
                    * Lv1~Lv3 비선출 기본기 下 <br />
                    * Lv4~Lv6 비선출 기본기 中 <br />
                    * Lv7~Lv8 비선출 기본기 上 <br />* Lv9~ Lv10 선수 출신 또는
                    수준급 동호인
                </Notice>
                <ButtonWrapper>
                    <CompletionButton onClick={registerNewMember}>
                        인적사항 입력 완료
                    </CompletionButton>
                </ButtonWrapper>
            </PageBlock>
            <DissectionAltert open={addMember}>
                <Opacity onClick={onAddMember} />
                <AlertModal>
                    <AlertTitle>추가 안됨 ;-;</AlertTitle>
                    <Line />
                    <AlertSelectWrapper>
                        <AlertSelect onClick={onAddMember}>예</AlertSelect>
                    </AlertSelectWrapper>
                </AlertModal>
            </DissectionAltert>
        </PageWrapper>
    );
};

const PageWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    ${(props) =>
        props.open &&
        css`
            display: block;
        `}
`;

const LevelSelect = styled.select`
    border: none;
    background: transparent;
    outline: none;
    color: #4b4c4d;
    width: 100%;
`;

const DissectionAltert = styled.div`
    position: fixed;
    display: none;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    ${(props) =>
        props.open &&
        css`
            display: flex;
        `}
`;
