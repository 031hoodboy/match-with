import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { endpoint } from '..';
import ArrowImg from '../assets/arrow.png';
import { PageWrapper } from '../components/Pagestyles';

const MemberInfo = withRouter(({ location, history }) => {
    const [goBack, SetGoBack] = useState(false);
    const onGoBack = () => {
        SetGoBack(!goBack);
    };

    const [validate, setValidate] = useState(false);
    const onValidateModal = () => {
        setValidate(!validate);
    };

    const [name, setName] = useState('');
    const [phoneId, setPhoneId] = useState();
    const nameHandler = (e) => {
        e.preventDefault();
        setName(e.target.value);
    };

    const [phoneNo, setPhoneNo] = useState('');
    const phoneNoHandler = (e) => {
        e.preventDefault();
        setPhoneNo(e.target.value);
    };

    const [certifyNum, setCertifyNum] = useState('');
    const certifyNumHandler = (e) => {
        e.preventDefault();
        const { value } = e.target;
        setCertifyNum(value);
        if (value.length >= 6) onValidate(value);
    };

    const [naverAccessToken, setNaverAccessToken] = useState(null);

    // 기존 사용자가 있을 경우, 자동 로그인
    const tryLogin = useCallback(
        async (naverAccessToken) => {
            try {
                const url = `${endpoint}/auth/naver/login`;
                const { data } = await axios.post(url, { naverAccessToken });
                localStorage.setItem('matchwith-session-id', data.sessionId);
                history.push('/main');
            } catch (err) {
                console.log('ghldnsasd');
            }
        },
        [history]
    );

    const onNaverAccessKey = useCallback(async () => {
        try {
            const code = new URLSearchParams(location.search).get('code');
            const { data } = await axios(`${endpoint}/auth/naver/accessToken`, {
                params: { code },
            });
            localStorage.setItem('accessToken', data.accessToken);
            setNaverAccessToken(data.accessToken);
            await tryLogin(data.accessToken);
        } catch (err) {
            history.push('/start');
        }
    }, [history, location.search, tryLogin]);

    useEffect(() => onNaverAccessKey(), [onNaverAccessKey]);

    const onPhoneNo = async () => {
        await axios.get(`${endpoint}/auth/phone`, { params: { phoneNo } });
    };

    const onValidate = async (code) => {
        try {
            const { data } = await axios.post(`${endpoint}/auth/phone`, {
                phoneNo,
                code,
            });

            setPhoneId(data.phoneId);
        } catch (err) {
            onValidateModal();
        }
    };

    const onSignup = async () => {
        try {
            const signup = {
                username: name,
                phoneId,
                naverAccessToken,
            };

            const { data } = await axios.post(
                `${endpoint}/auth/naver/signup`,
                signup
            );

            localStorage.setItem('matchwith-session-id', data.sessionId);
            history.push('/main');
        } catch (err) {
            onValidateModal();
        }
    };


    return (
        <PageWrapper>
            <Header>
                <ArrowWrapper onClick={onGoBack}>
                    <BackArrow />
                    기본 정보
                </ArrowWrapper>
            </Header>
            <ResevationBlock>
                <ResevationTitle>이름</ResevationTitle>
                <BookerWrapper>
                    <NameInput
                        placeholder="이름을 입력해주세요."
                        value={name}
                        onChange={nameHandler}
                    />
                </BookerWrapper>
                <ResevationTitle>전화번호</ResevationTitle>
                <PhoneWrapper>
                    <PhoneInputWrapper>
                        <PhoneInput
                            placeholder="전화번호를 입력해주세요."
                            value={phoneNo}
                            onChange={phoneNoHandler}
                        />
                        <PhoneButton onClick={onPhoneNo} type="button">
                            인증요청
                        </PhoneButton>
                    </PhoneInputWrapper>
                    <CitationInput
                        placeholder="인증번호를 입력해주세요."
                        value={certifyNum}
                        onChange={certifyNumHandler}
                    />
                </PhoneWrapper>
            </ResevationBlock>
            <Notice>
                <Checkbox type="checkbox" /> &nbsp;번호 활용에 대한 동의 체크
                박스
            </Notice>
            <CompletionButton onClick={onSignup}>
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
                            to="/start"
                            style={{ textDecoration: 'none', color: '#000' }}
                        >
                            <AlertSelect>예</AlertSelect>
                        </Link>
                    </AlertSelectWrapper>
                </AlertModal>
            </BackAltert>
            <BackAltert open={validate}>
                <Opacity onClick={onValidateModal} />
                <AlertModal>
                    <AlertTitle>인증번호가 올바르지 않습니다</AlertTitle>
                    <Line />
                    <AlertSelectWrapper>
                        <AlertSelect onClick={onValidateModal}>
                            확인
                        </AlertSelect>
                    </AlertSelectWrapper>
                </AlertModal>
            </BackAltert>
        </PageWrapper>
    );
});

const Header = styled.div`
    width: 90vw;
    height: 9vh;
    padding: 3% 5%;
    background: #40b65e;
    display: flex;
    align-items: flex-end;
    font-size: 15px;
    color: #fff;
    box-shadow: rgb(0 0 0 / 10%) 0px 3px 6px;
`;

const BackArrow = styled.div`
    width: 8px;
    height: 16px;
    background-image: url(${ArrowImg});
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center;
    margin-right: 20px;
    margin-top: 3px;
`;

const ArrowWrapper = styled.div`
    display: flex;
`;

const ResevationBlock = styled.form`
    width: 100%;
    height: 88vh;
    background: #fff;
`;

const ResevationTitle = styled.div`
    margin: 18px 5vw 15px 5vw;
    font-size: 14px;
`;

const BookerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    background: #fff;
`;

const NameInput = styled.input`
    border: none;
    outline: none;
    margin: 0 5vw;
    padding: 4vw 0;
    border-bottom: 0.4px solid #afb4be;
    font-size: 14px;
    color: #4b4c4d;
    ::placeholder {
        color: #a2a4a8;
    }
`;

const CompletionButton = styled.div`
    width: 90vw;
    height: 50px;
    background: #c9e8d6;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 16px;
    position: fixed;
    bottom: 12vh;
    left: 5%;
    &:active {
        transform: scale(0.98);
    }
`;

const Notice = styled.div`
    position: absolute;
    bottom: 20%;
    font-size: 14px;
    color: #4b4c4d;
    width: 85%;
    line-height: 24px;
    display: flex;
    align-items: center;
`;

const BackAltert = styled.div`
    position: absolute;
    display: none;
    ${(props) =>
        props.open &&
        css`
            display: flex;
        `}
`;

const Opacity = styled.div`
    width: 100vw;
    height: 100vh;
    background: #000;
    opacity: 0.2;
    z-index: 2;
`;

const AlertModal = styled.div`
    width: 80vw;
    height: 15vh;
    min-height: 135px;
    padding: 0vw 5vw;
    background: #fff;
    z-index: 3;
    position: absolute;
    top: 40%;
    left: 5%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    text-align: center;
`;

const Line = styled.div`
    width: 100%;
    margin-top: 7%;
    border-bottom: 1px solid #707070;
`;

const AlertTitle = styled.div`
    margin-top: 7%;
`;

const AlertSelectWrapper = styled.div`
    width: 100%;
    display: flex;
    text-align: center;
    justify-content: space-around;
    margin-bottom: 7%;
`;

const AlertSelect = styled.div`
    width: 100px;
    height: 200%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const PhoneWrapper = styled(BookerWrapper)``;

const PhoneInputWrapper = styled.div`
    display: flex;
`;

const PhoneInput = styled(NameInput)`
    width: calc(100% - 114px);
`;

const PhoneButton = styled.button`
    outline: none;
    border: none;
    width: 114px;
    height: 50px;
    margin-right: 5vw;
    border-radius: 25px;
    background: #c9e8d6;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    & :active {
        transform: scale(0.98);
    }
`;

const CitationInput = styled(NameInput)``;

const Checkbox = styled.input``;

export default MemberInfo;
