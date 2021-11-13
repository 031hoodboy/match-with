import React, { useEffect, useState } from 'react';
import { MdCheckCircle } from 'react-icons/md';
import styled, { css } from 'styled-components';
import ArrowImg from '../assets/arrow.png';
import { Client } from '../client';
import { CompletionButton } from '../components/Pagestyles';

const Location = ({
    locationOpen,
    onLocationOpen,
    setLocations,
    isOnce,
    isSinglular = false,
}) => {
    const [locations, setLocationsLocal] = useState([]);

    const [allLocations, setAllLocations] = useState([]);
    const loadLocations = async () => {
        const { data } = await Client.get('/regions');
        setAllLocations(data.regions);
    };

    useEffect(() => loadLocations(), []);

    const onClick = ({ regionName }) => () => {
        const idxOf = locations.indexOf(regionName);
        if (idxOf !== -1) {
            locations.splice(idxOf, 1);
            return setLocations(locations);
        }

        if (!isOnce) {
            setLocations([...locations, regionName]);
            setLocationsLocal([...locations, regionName]);
        } else {
            setLocations([regionName]);
            setLocationsLocal(() => [regionName]);
            onLocationOpen();
        }
        check();
    };

    const check = () => {
        if (!isOnce || locations.length <= 0) return;
        onLocationOpen();
    };

    return (
        <PageWrapper open={!locationOpen}>
            <Header>
                <ArrowWrapper onClick={onLocationOpen}>
                    <BackArrow />
                    지역 선택
                </ArrowWrapper>
            </Header>
            <ResevationBlock>
                {allLocations.map((city) => (
                    <>
                        <ResevationTitle>{city.cityName}</ResevationTitle>
                        <BookerWrapper>
                            {city.regions.map((region) => (
                                <ContactInput
                                    onClick={onClick(region)}
                                    key={region.regionName}
                                >
                                    {region.regionName}
                                    <CheckCircle
                                        select={locations.includes(
                                            region.regionName
                                        )}
                                    >
                                        {locations.includes(
                                            region.regionName
                                        ) &&
                                            !isOnce && <MdCheckCircle />}
                                    </CheckCircle>
                                </ContactInput>
                            ))}
                        </BookerWrapper>
                    </>
                ))}
            </ResevationBlock>
            <CompletionButton
                onClick={onLocationOpen}
                style={{ background: '#40B65E' }}
            >
                지역 선택 완료
            </CompletionButton>
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
    background: #f2f3f5;
`;

const Header = styled.div`
    width: 90vw;
    height: 8vh;
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

const ResevationBlock = styled.div`
    width: 100%;
    height: calc(100vh - 230px);
    background: #f2f3f5;
`;

const ResevationTitle = styled.div`
    padding: 18px 5vw 15px 5vw;
    font-size: 14px;
`;

const BookerWrapper = styled.div`
    display: flex;
    height: 85%;
    overflow: scroll;
    flex-direction: column;
    border-top: 0.4px solid #707070;
    border-bottom: 0.4px solid #707070;
    background: #fff;
`;

const NameInput = styled.div`
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 5vw;
    padding: 2vh 0;
    border-bottom: 0.4px solid #707070;
    font-size: 14px;
    color: #4b4c4d;
    ::placeholder {
        color: #4b4c4d;
    }
`;

const ContactInput = styled(NameInput)``;

const CheckCircle = styled.div`
    border-radius: 16px;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 3px;
    cursor: pointer;
    ${(props) =>
        props.select &&
        css`
            color: #40b65e;
        `}
`;

export default Location;
