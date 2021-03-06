import styled, { css } from 'styled-components';
import ArrowImg from '../assets/arrow.png';
import RightArrowImg from '../assets/rightarrow.png';

export const PageWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Header = styled.div`
    width: 90vw;
    padding: 10vw 5vw 5vw 5vw;
    background: #40b65e;
    display: flex;
    align-items: flex-end;
    font-size: 15px;
    color: #fff;
    box-shadow: rgb(0 0 0 / 10%) 0px 3px 6px;
`;

export const BackArrow = styled.div`
    width: 8px;
    height: 16px;
    background-image: url(${ArrowImg});
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center;
    margin-right: 20px;
    margin-top: 3px;
`;

export const ArrowWrapper = styled.div`
    display: flex;
`;

export const PageBlock = styled.div`
    width: 100%;
    min-height: 89vh;
    height: 100%;
    background: #f2f3f5;
`;

export const FirstInputBlockTitle = styled.div`
    padding: 18px 5vw 15px 5vw;
    font-size: 14px;
`;

export const InputBlockTitle = styled(FirstInputBlockTitle)`
    padding: 15px 5vw 15px 5vw;
`;

export const InputBlockWrapper = styled.div`
    display: flex;
    flex-direction: column;
    border-top: 0.4px solid #707070;
    border-bottom: 0.4px solid #707070;
    background: #fff;
    min-height: 50px;
    overflow: scroll;
`;

export const InputBlock = styled.input`
    border: none;
    outline: none;
    margin: 0 5vw;
    padding: 4vw 0;
    border-bottom: 0.4px solid #707070;
    font-size: 14px;
    color: #4b4c4d;
    ::placeholder {
        color: #4b4c4d;
    }
`;

export const LastInputBlock = styled(InputBlock)`
    border: none;
`;

export const ButtonInput = styled.div`
    display: flex;
    margin: 0 5vw;
    padding: 4vw 0;
    border-bottom: 0.4px solid #707070;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    color: #4b4c4d;
    ${({ isLast }) =>
        isLast &&
        css`
            border-bottom: none;
        `}
`;

export const LastButtonInput = styled(ButtonInput)`
    border: none;
`;

export const CompletionButton = styled.div`
    width: 90vw;
    height: 50px;
    background: #c9e8d6;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 16px;
    margin: 0 auto;
    &:active {
        transform: scale(0.98);
    }
    ${({ active }) =>
        active !== false &&
        css`
            background-color: #40b65e;
        `}
`;

export const ButtonWrapper = styled.div`
    width: 100%;
    padding: 5vh 0 10vh 0;
    background: #f2f3f5;
`;

export const Notice = styled.div`
    /* position: absolute; */
    /* bottom: 20%; */
    font-size: 14px;
    color: #4b4c4d;
    /* width: 85%; */
    line-height: 24px;
    padding: 1rem;
    /* left: 5%; */
`;

export const BackAltert = styled.div`
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

export const Opacity = styled.div`
    width: 100vw;
    height: 100vh;
    background: #000;
    opacity: 0.2;
    z-index: 2;
    position: fixed;
    display: none;
    top: 0;
    left: 0;
`;

export const AlertModal = styled.div`
    width: 80vw;
    height: 15vh;
    min-height: 135px;
    padding: 0vw 5vw;
    background: #fff;
    z-index: 3;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    position: fixed;
    top: 40%;
    left: 5%;
`;

export const Line = styled.div`
    width: 100%;
    margin-top: 7%;
    border-bottom: 1px solid #707070;
`;

export const AlertTitle = styled.div`
    margin-top: 7%;
`;

export const AlertSelectWrapper = styled.div`
    width: 100%;
    display: flex;
    text-align: center;
    justify-content: space-around;
    margin-bottom: 7%;
`;

export const AlertSelect = styled.div`
    width: 100px;
    height: 200%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const RightArrow = styled.div`
    width: 8px;
    height: 16px;
    background-image: url(${RightArrowImg});
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center;
    margin-right: 8px;
`;

export const InputTitle = styled.div`
    font-size: 14px;
    color: #4b4c4d;
`;

export const DoneAltert = styled(BackAltert)`
    ${(props) =>
        props.done &&
        css`
            display: flex;
        `}
`;

export const DoneOpacity = styled.div`
    width: 100vw;
    height: 100vh;
    background: #000;
    opacity: 0.2;
    z-index: 2;
`;

export const LocationBlock = styled.div`
    position: absolute;
`;

export const CalenderModal = styled.div`
    position: absolute;
    top: 0;
    display: none;
    ${(props) =>
        props.calender &&
        css`
            display: flex;
        `}
`;

export const TimeModal = styled.div`
    position: absolute;
    display: none;
    top: 0;
    ${(props) =>
        props.timer &&
        css`
            display: flex;
        `}
`;

export const TimeOpacity = styled.div`
    width: 100vw;
    height: 100vh;
    background: #000;
    opacity: 0.2;
    z-index: 2;
`;

export const CalenderOpacity = styled.div`
    width: 100vw;
    height: 100vh;
    background: #000;
    opacity: 0.2;
    z-index: 3;
`;

export const InfoInputBlockWrapper = styled(InputBlockWrapper)`
    min-height: calc(24vw + 54px);
`;
