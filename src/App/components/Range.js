import React, { useState } from 'react';

import styled from 'styled-components';

import { Range as ReactRange, getTrackBackground } from 'react-range';

const Container = styled.div`
    margin: ${({ first }) => (first ? '0px 10px 10px 10px' : '10px')};
    border: 1.5px solid ${({ color }) => `hsl(${color} 60%)`};
    padding: 20px;
    border-radius: 7px;
`;

const InfoContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Label = styled.h5`
    display: flex;
`;
const Value = styled.h6`
    font-size: 17px;
    font-weight: 400;
    margin: 0 auto;
`;
const InfoDesc = styled.h5`
    font-size: 13px;
    width: 300px;
    text-align: ${({ alignRight }) => alignRight && 'right'};
`;

const Range = ({ id, title, color, minDesc, maxDesc, first, currentValue }) => {
    const [values, setValues] = useState([0]);

    let currColor = values;

    if (values[0] <= 20) {
        currColor = [20];
    } else if (values[0] >= 70) {
        currColor = [70];
    } else {
        currColor = values;
    }

    currentValue(values[0], id);
    return (
        <Container color={color} first={first}>
            <Label>{title}</Label>
            <InfoContainer>
                <InfoDesc>0% – {minDesc}</InfoDesc>
                <Value>{values[0]}%</Value>
                <InfoDesc alignRight>{maxDesc} – 100%</InfoDesc>
            </InfoContainer>

            <ReactRange
                values={values}
                step={10}
                min={0}
                max={100}
                onChange={(values) => setValues(values)}
                renderTrack={({ props, children }) => (
                    <div
                        onMouseDown={props.onMouseDown}
                        onTouchStart={props.onTouchStart}
                        style={{
                            ...props.style,
                            height: '36px',
                            display: 'flex',
                            width: '100%',
                        }}>
                        <div
                            ref={props.ref}
                            style={{
                                height: '20px',
                                width: '100%',
                                borderRadius: '4px',
                                background: getTrackBackground({
                                    values: values,
                                    colors: [
                                        `hsl(${color} ${currColor[0]}%)`,
                                        '#ccc',
                                    ],
                                    min: 0,
                                    max: 100,
                                }),
                                alignSelf: 'center',
                            }}>
                            {children}
                        </div>
                    </div>
                )}
                renderThumb={({ props, isDragged }) => (
                    <div
                        {...props}
                        style={{
                            ...props.style,
                        }}
                    />
                )}
            />
        </Container>
    );
};

export default Range;
