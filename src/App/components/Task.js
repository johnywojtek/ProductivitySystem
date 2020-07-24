import React, { useRef } from 'react';
import styled from 'styled-components';

import Checkbox from './Checkbox';

const Number = styled.span`
    margin-right: 1rem;
    font-size: 1.3rem;
`;

const Container = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move',
};
const Card = (props) => {
    const { currentTaskId, taskId, value, number, isDone, refe } = props;

    return (
        <div
            ref={refe}
            {...props}
            className="media friendlist-box align-items-center justify-content-center m-b-20">
            <Number>{number}</Number>
            <div className="m-r-10 photo-table">
                <Checkbox
                    currentTaskId={currentTaskId}
                    taskId={taskId}
                    isDone={isDone}
                />
            </div>
            <div className="media-body">
                <h6 className="m-0 d-inline">{value}</h6>
                <span className="float-right d-flex  align-items-center">
                    <i className="fa fa-caret-up f-22 m-r-10 text-c-green" />
                    3784
                </span>
            </div>
        </div>
    );
};
export default Card;
