import axios from 'axios';
import { endpoint } from '.';

export const Client = axios.create();

Client.interceptors.request.use(getInterceptorRequest.bind(this));
Client.interceptors.response.use(
    getInterceptorResponse.bind(this),
    getInterceptorResponseError.bind(this)
);

function getInterceptorRequest(config) {
    const accessKey = getAccessKey();
    config.baseURL = endpoint;
    config.headers = {
        authorization: accessKey,
    };

    return config;
}

function getInterceptorResponse(res) {
    if (!res) throw new Error('서버와 연결할 수 없습니다.');

    const { data } = res;
    if (data.opcode !== 0) throw new Error(data.message);
    return res;
}

function getInterceptorResponseError(err) {
    alert(
        err?.response?.data?.message ||
            err?.message ||
            '알 수 없는 오류가 발생했습니다'
    );

    if (!err.response) throw new Error('서버와 연결할 수 없습니다.');

    const { data } = err.response;
    if (data.opcode === 0) return err;
    throw new Error(data.message);
}

export function getAccessKey() {
    const sessionId = localStorage.getItem('matchwith-session-id');
    if (!sessionId) return;
    return `Bearer ${sessionId}`;
}
