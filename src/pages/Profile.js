import React, { useEffect, useState } from 'react';
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
    ButtonInput,
    CompletionButton,
    DoneAltert,
    DoneOpacity,
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
    RightArrow,
} from '../components/Pagestyles';

const Profile = () => {
    const [goBack, SetGoBack] = useState(false);
    const [done, setDone] = useState(false);
    const [level, setLevel] = useState(null);
    const [username, setUsername] = useState(null);
    const [phoneNo, setPhoneNo] = useState(null);
    const [regionName, setRegionName] = useState(null);

    const onGoBack = () => SetGoBack(!goBack);
    const onDone = () => setDone(!done);

    useEffect(() => {
        const fetchData = async () => {
            const result = await Client.get('/auth');
            console.log(result.data);
            setLevel(result.data.user.level);
            console.log(level);
            setUsername(result.data.user.username);
            console.log(username);
            setPhoneNo(result.data.user.phoneNo);
            console.log(phoneNo);
            setRegionName(result.data.user.regionName);
        };

        fetchData();
    }, [level, username, phoneNo]);


    return (
        <PageWrapper>
            <Header>
                <Link
                    to="/main"
                    style={{ textDecoration: 'none', color: '#fff' }}
                >
                    <ArrowWrapper>
                        <BackArrow />내 프로필
                    </ArrowWrapper>
                </Link>
            </Header>
            <PageBlock>
                <FirstInputBlockTitle>Lv. {level} 닉네임입니다.</FirstInputBlockTitle>
                {regionName? 
                <>
                    <InputBlockWrapper>
                        <ButtonInput>{username}</ButtonInput>
                        <ButtonInput>{phoneNo}</ButtonInput>
                        <LastButtonInput>{regionName? regionName : "asd"}</LastButtonInput>
                    </InputBlockWrapper>
                    <InputBlockTitle>소속 팀 (2개)</InputBlockTitle>
                    <InputBlockWrapper>
                        <Link to="/profile" style={{ textDecoration: 'none' }}>
                            <LastButtonInput
                                style={{ borderBottom: '1px solid #707070' }}
                            >
                                <InputTitle>[대표] | 팀명입니다</InputTitle>
                                <RightArrow />
                            </LastButtonInput>
                        </Link>
                        <Link to="/profile" style={{ textDecoration: 'none' }}>
                            <LastButtonInput>
                                <InputTitle>천안 FCB</InputTitle>
                                <RightArrow />
                            </LastButtonInput>
                        </Link>
                    </InputBlockWrapper>
                </>
                : 
                    <InputBlockWrapper>
                        <Link to="/member-info" style={{ textDecoration: 'none' }}>
                            <LastButtonInput>
                                <InputTitle>등록된 개인정보가 없습니다.</InputTitle>
                                <RightArrow />
                            </LastButtonInput>
                        </Link>
                    </InputBlockWrapper>
                }
            </PageBlock>
            <CompletionButton onClick={onDone}>
                소속 팀 추가하기
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
        </PageWrapper>
    );
};

export default Profile;
