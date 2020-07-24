import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { FaCheck } from 'react-icons/fa';
import { toggleTask } from '../../store/actions';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

const icon = keyframes`
 from {
      opacity: 0;
      transform: scale(0.3);
    }
    to {
      opacity: 1;
      transform: scale(1)
    }
`;
const check = keyframes`
 0% {
      width: 2rem;
      height: 2rem;
      border-width: 5px;
    }
    10% {
      width: 2rem;
      height: 2rem;
      opacity: 0.1;
      background: rgba(0,0,0,0.2);
      border-width: 15px;
    }
    12% {
      width: 2rem;
      height: 2rem;
      opacity: 0.4;
      background: rgba(0,0,0,0.1);
      border-width: 0;
    }
    50% {
      width: 2.3rem;
      height: 2.3rem;
      background: #00d478;
      border: 0;
      opacity: 0.6;
    }
    100% {
      width: 2.3rem;
      height: 2.3rem;
      background: #00d478;
      border: 0;
      opacity: 1;
    }
`;

const Container = styled.div`
    width: 2.3rem;
    height: 2.3rem;
`;

const LabelCheck = styled.span`
    display: inline-block;
    border-radius: 50%;
    border: 2px solid rgba(0, 0, 0, 0.1);
    background: white;
    vertical-align: middle;
    margin-right: 20px;
    width: 2.3rem;
    height: 2.3rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: border 0.3s ease;

    svg {
        opacity: 0.2;
        font-size: 1.3rem;
        fill: transparent;
        transition: opacity 0.3s 0.1s ease;
        stroke: rgba(0, 0, 0, 0.5);
        stroke-width: 20px;
        transition: all 0.3s ease;
    }

    &:hover {
        border: 3px solid rgba(0, 0, 0, 0.2);
    }
    ${({ checked }) =>
        checked &&
        css`
            animation: ${check} 0.5s cubic-bezier(0.895, 0.03, 0.685, 0.22)
                forwards;
            svg {
                opacity: 1;
                transform: scale(0);
                fill: white;
                -webkit-text-stroke: 0;
                animation: ${icon} 0.3s cubic-bezier(1, 0.008, 0.565, 1.65) 0.1s
                    1 forwards;
                stroke: white;
                stroke-width: 0;
            }
        `}
`;

const Checkbox = ({ taskId, currentTaskId, isDone, toggleTask }) => {
    const onCheckboxClick = () => {
        if (currentTaskId) {
            isDone
                ? toggleTask(taskId, currentTaskId, false)
                : toggleTask(taskId, currentTaskId, true);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Ups coś poszło nie tak',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
            });
        }
    };
    return (
        <Container onClick={onCheckboxClick}>
            <LabelCheck checked={isDone}>
                <FaCheck checked={isDone} />
            </LabelCheck>
        </Container>
    );
};

export default connect(
    null,
    { toggleTask }
)(Checkbox);
