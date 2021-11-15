import styled from 'styled-components';
import { confirmAlert } from 'react-custom-confirm-alert';

export const Alert = (
    message,
    buttons = [
        {
            label: '확인',
            onClick: (onClose) => onClose(),
        },
    ]
) => {
    confirmAlert({
        message,
        buttons,
        customUI: ({ message, onClose, buttons }) => (
            <>
                {/* <Opacity onClick={onClose} /> */}
                <Opacity onClick={onClose} />
                <AlertModal>
                    <AlertTitle>{message}</AlertTitle>
                    <Line />
                    <AlertSelectWrapper>
                        {buttons.map(({ onClick, label }) => (
                            <AlertSelect onClick={() => onClick(onClose)}>
                                {label}
                            </AlertSelect>
                        ))}
                    </AlertSelectWrapper>
                </AlertModal>
            </>
        ),
    });
};

export const AlertModal = styled.div`
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

export const AlertTitle = styled.div`
    margin-top: 7%;
`;

export const Line = styled.div`
    width: 100%;
    margin-top: 7%;
    border-bottom: 1px solid #707070;
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

export const Opacity = styled.div`
    position: absolute;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: #000;
    opacity: 0.2;
    z-index: 3;
`;
