import React from 'react';
import styled, { css } from 'styled-components';
import ArrowImg from '../assets/arrow.png';

export const Level = ({ levelOpen, onLevelOpen, setLevel }) => {
    const onClick = (level) => () => {
        setLevel(level);
        onLevelOpen();
    };

    return (
        <PageWrapper open={!levelOpen}>
            <Header>
                <ArrowWrapper onClick={onLevelOpen}>
                    <BackArrow />
                    레벨 선택
                </ArrowWrapper>
            </Header>
            <ResevationBlock>
                <BookerWrapper>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                        <ContactInput onClick={onClick(level)} key={level}>
                            {level}
                        </ContactInput>
                    ))}
                </BookerWrapper>
            </ResevationBlock>
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

const ResevationBlock = styled.div`
    width: 100%;
    height: 88vh;
    background: #f2f3f5;
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
