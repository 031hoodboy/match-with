import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import { endpoint } from '..';

const Profile = () => {
    const [goBack, SetGoBack] = useState(false);
    const onGoBack = () => {
        SetGoBack(!goBack);
    };

    const [done, setDone] = useState(false);
    const onDone = () => {
        setDone(!done);
    };

    const Client = axios.create({
        baseURL: endpoint,
        timeout: 180000,
        withCredentials: false,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      });

      const sessionId = localStorage.getItem('accessToken');
      console.log(sessionId);

    useEffect(() => { 
        const fetchData = async () => {

            const result = await axios.get(`${endpoint}/auth`); 
            console.log(result.data); 
        } 

        fetchData(); 
    },[]);

    Client.interceptors.request.use(getInterceptorRequest.bind(this));


    function getInterceptorRequest(config) {
        const accessKey = sessionId;
        config.baseURL = endpoint;
        config.headers = { authorization: accessKey };
      
        return config;
      }



    // import { Toast } from 'antd-mobile';
    // import axios from 'axios';
    // import { baseURL } from '..';
    
    // export const Client = axios.create();
    // export class ToastError extends Error {
    //   name = 'ToastError';
    
    //   constructor(content) {
    //     super();
    //     Toast.show({
    //       icon: 'fail',
    //       content,
    //     });
    //   }
    // }
    
    // Client.interceptors.request.use(getInterceptorRequest.bind(this));
    // Client.interceptors.response.use(
    //   getInterceptorResponse.bind(this),
    //   getInterceptorResponseError.bind(this)
    // );
    
    // function getInterceptorRequest(config) {
    //   const accessKey = getAccessKey();
    //   config.baseURL = ${baseURL};
    //   config.headers = { authorization: accessKey };
    
    //   return config;
    // }
    
    // function getInterceptorResponse(res) {
    //   if (!res) throw new ToastError('서버와 연결할 수 없습니다.');
    
    //   const { data } = res;
    //   if (data.opcode !== 0) throw new ToastError(data.message);
    //   return res;
    // }
    
    // function getInterceptorResponseError(err) {
    //   if (!err.response) throw new ToastError('서버와 연결할 수 없습니다.');
    
    //   const { data } = err.response;
    //   if (data.opcode === 0) return err;
    //   throw new ToastError(data.message);
    // }
    
    // export function getAccessKey() {
    //   const sessionId = localStorage.getItem('weblink-session-id');
    //   if (!sessionId) return;
    //   return Bearer ${sessionId};
    // }

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
                <FirstInputBlockTitle>Lv. 1 닉네임입니다.</FirstInputBlockTitle>
                <InputBlockWrapper>
                    <ButtonInput>ghdrlfehd</ButtonInput>
                    <ButtonInput>010-1234-5689</ButtonInput>
                    <LastButtonInput>천안시 동남구</LastButtonInput>
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
