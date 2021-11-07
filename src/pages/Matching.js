import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Location from '../components/Location';
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
    InputBlockTitle,
    InputBlockWrapper,
    InputTitle,
    LastButtonInput,
    Line,
    Notice,
    Opacity,
    PageBlock,
    PageWrapper,
    RightArrow,
    LocationBlock,
} from '../components/Pagestyles';

const Matching = () => {
    const [goBack, SetGoBack] = useState(false);
    const onGoBack = () => {
        SetGoBack(!goBack);
    };

    const [done, setDone] = useState(false);
    const onDone = () => {
        setDone(!done);
    };

    const [locations, setLocations] = useState([]);
    const [locationOpen, setLocationOpen] = useState(true);
    const onLocationOpen = () => setLocationOpen(!locationOpen);

    return (
        <PageWrapper>
            <Header>
                <ArrowWrapper onClick={onGoBack}>
                    <BackArrow />
                    매칭 신청 팀
                </ArrowWrapper>
            </Header>
            <PageBlock>
                <FirstInputBlockTitle>예약자 정보</FirstInputBlockTitle>
                <InputBlockWrapper>
                    <Link
                        to="/matching-team"
                        style={{ textDecoration: 'none' }}
                    >
                        <LastButtonInput>
                            <InputTitle>신청 팀을 선택해주세요.</InputTitle>
                            <RightArrow />
                        </LastButtonInput>
                    </Link>
                </InputBlockWrapper>
                <InputBlockTitle>희망 매칭 일시 </InputBlockTitle>
                <InputBlockWrapper>
                    <Link to="/matching" style={{ textDecoration: 'none' }}>
                        <LastButtonInput
                            style={{ borderBottom: '1px solid #707070' }}
                        >
                            <InputTitle>매칭일을 선택해주세요.</InputTitle>
                            <RightArrow />
                        </LastButtonInput>
                    </Link>
                    <Link to="/matching" style={{ textDecoration: 'none' }}>
                        <LastButtonInput>
                            <InputTitle>
                                매칭 시작 시간을 선택해주세요.
                            </InputTitle>
                            <RightArrow />
                        </LastButtonInput>
                    </Link>
                </InputBlockWrapper>
                <InputBlockTitle>매칭 지역</InputBlockTitle>
                <InputBlockWrapper>
                    <LastButtonInput onClick={onLocationOpen}>
                        <InputTitle>
                            {locations.length <= 0
                                ? '지역을 선택해주세요.'
                                : `${locations.slice(
                                      locations.length - 1
                                  )} 외 ${locations.length - 1}개`}
                        </InputTitle>
                        <RightArrow />
                    </LastButtonInput>
                </InputBlockWrapper>
            </PageBlock>
            <Notice>
                * 매칭에 대한 안내 및 주의사항입니다.
                <br />* 매칭현황 공유를 위해 신청자의 개인정보를 수집합니다.
            </Notice>
            <CompletionButton onClick={onDone}>매칭 신청 완료</CompletionButton>
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
            <LocationBlock>
                <Location
                    locationOpen={locationOpen}
                    onLocationOpen={onLocationOpen}
                    locations={locations}
                    setLocations={setLocations}
                />
            </LocationBlock>
        </PageWrapper>
    );
};

export default Matching;
