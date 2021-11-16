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
} from '..';

export const TeamMember = ({ teamOpen, onTeamOpen, setMembers }) => {
    const selectList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const [level, setLevelSelected] = useState();
    const [memberName, setMemberName] = useState(null);
    const [phoneNo, setPhoneNo] = useState([]);

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
                    * 입력된 연락처의 가입 회원이 있을 경우 해당 회원의 <br />
                    &nbsp;&nbsp;소속팀에 자동으로 추가됩니다.
                </Notice>
                <ButtonWrapper>
                    <CompletionButton onClick={registerNewMember}>
                        인적사항 입력 완료
                    </CompletionButton>
                </ButtonWrapper>
            </PageBlock>
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
