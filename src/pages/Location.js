import React, {useState} from 'react';
import styled, {css, keyframes} from 'styled-components';
import {PageWrapper} from '../components/Pagestyles';
import ArrowImg from '../assets/arrow.png';
import {Link} from 'react-router-dom';
import { MdCheckCircle } from 'react-icons/md';

const MemberInfo = () => {

    const [goBack, setGoBack] = useState(false);

    const onGoBack = () => {
        setGoBack(!goBack)
    }

    const [select, setSelect] = useState(false);
    const onSelect = () => {
        setSelect(!select);
    }

    const [select2, setSelect2] = useState(false);
    const onSelect2 = () => {
        setSelect2(!select2);
    }

    const [select3, setSelect3] = useState(false);
    const onSelect3 = () => {
        setSelect3(!select3);
    }

    const [select4, setSelect4] = useState(false);
    const onSelect4 = () => {
        setSelect4(!select4);
    }

    const [select5, setSelect5] = useState(false);
    const onSelect5 = () => {
        setSelect5(!select5);
    }

    const [select6, setSelect6] = useState(false);
    const onSelect6 = () => {
        setSelect6(!select6);
    }

    const [select7, setSelect7] = useState(false);
    const onSelect7 = () => {
        setSelect7(!select7);
    }

    return (
        <PageWrapper>
            <Header>
                <Link to="/reservation" style={{textDecoration: "none", color: "#fff"}}>
                    <ArrowWrapper onClick={onGoBack} >
                        <BackArrow/>
                        지역 선택
                    </ArrowWrapper>
                </Link>
            </Header>
            <ResevationBlock>
                <ResevationTitle>천안시</ResevationTitle>
                <BookerWrapper>
                    <NameInput onClick={onSelect}>
                        목천읍
                        <CheckCircle select={select} >
                            {select && <MdCheckCircle />}
                        </CheckCircle>
                    </NameInput>
                    <ContactInput onClick={onSelect2}>
                        풍세면
                        <CheckCircle select={select2} >
                            {select2 && <MdCheckCircle />}
                        </CheckCircle>
                    </ContactInput>
                    <ContactInput onClick={onSelect3}>
                        광덕면
                        <CheckCircle select={select3} >
                            {select3 && <MdCheckCircle />}
                        </CheckCircle>
                    </ContactInput>
                    <ContactInput onClick={onSelect4}>
                        북면
                        <CheckCircle select={select4} >
                            {select4 && <MdCheckCircle />}
                        </CheckCircle>
                    </ContactInput>
                    <ContactInput onClick={onSelect5}>
                        성남면
                        <CheckCircle select={select5} >
                            {select5 && <MdCheckCircle />}
                        </CheckCircle>
                    </ContactInput>
                    <ContactInput onClick={onSelect6}>
                        수신면
                        <CheckCircle select={select6} >
                            {select6 && <MdCheckCircle />}
                        </CheckCircle>
                    </ContactInput>
                    <ContactInput onClick={onSelect7}>
                        병천면
                        <CheckCircle select={select7} >
                            {select7 && <MdCheckCircle />}
                        </CheckCircle>
                    </ContactInput>
                    <ContactInput>동면</ContactInput>
                    <ContactInput>중앙동</ContactInput>
                    <ContactInput>문성동</ContactInput>
                    <ContactInput>원성 1동</ContactInput>
                    <ContactInput>원성 2동</ContactInput>
                    <ContactInput>일봉동</ContactInput>
                    <ContactInput>신방동</ContactInput>
                    <ContactInput>청룡동</ContactInput>
                    <TeamInput>신안동</TeamInput>
                </BookerWrapper>
            </ResevationBlock>
        </PageWrapper>
    )
}

const Header = styled.div`
    width: 90vw;
    height: 9vh;
    padding: 3% 5%;
    background: #40B65E;
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
    background: #F2F3F5;
`;

const ResevationTitle = styled.div`
    margin: 18px 5vw 15px 5vw;
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
    color: #4B4C4D;
    ::placeholder {color:#4B4C4D;}
`;

const ContactInput = styled(NameInput)`

`;

const TeamInput = styled(NameInput)`
    border: none;
`;

const BackAltert = styled.div`
    position: absolute;
    display: none;
    ${props => props.open && css`
        display:flex;
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
const CheckCircle = styled.div`
  border-radius: 16px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 3px;
  cursor: pointer;
  ${props =>
    props.select &&
    css`
      color: #40B65E;
    `}
`;

export default MemberInfo;