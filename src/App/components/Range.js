import React, { useState } from 'react';

import styled from 'styled-components';

import { Range as ReactRange, getTrackBackground } from 'react-range';

const Container = styled.div`
    margin: 10px;
    width: 50%;
`;

const InfoContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Label = styled.h5`
    display: flex;
`;
const Value = styled.h5`
    margin: 0 auto;
`;
const InfoDesc = styled.h5`
    font-size: 14px;
    width: 300px;
    text-align: ${({ alignRight }) => alignRight && 'right'};
`;

const Range = ({ title, color }) => {
    const [values, setValues] = useState([50]);
    let currColor = values;
    if (values[0] <= 20) {
        currColor = [20];
    } else if (values[0] >= 70) {
        currColor = [70];
    } else {
        currColor = values;
    }
    console.log(currColor);

    return (
        <Container>
            <Label>{title}</Label>
            <InfoContainer>
                <InfoDesc>0% – Wyczerpany</InfoDesc>
                <Value>{values[0]}%</Value>
                <InfoDesc alignRight>Mogę przebiec 6000km – 100%</InfoDesc>
            </InfoContainer>

            <ReactRange
                values={values}
                step={10}
                min={0}
                max={100}
                onChange={values => setValues(values)}
                renderTrack={({ props, children }) => (
                    <div
                        onMouseDown={props.onMouseDown}
                        onTouchStart={props.onTouchStart}
                        style={{
                            ...props.style,
                            height: '36px',
                            display: 'flex',
                            width: '100%'
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
                                        '#ccc'
                                    ],
                                    min: 0,
                                    max: 100
                                }),
                                alignSelf: 'center'
                            }}>
                            {children}
                        </div>
                    </div>
                )}
                renderThumb={({ props, isDragged }) => (
                    <div
                        {...props}
                        style={{
                            ...props.style
                        }}></div>
                )}
            />
        </Container>
    );
};

export default Range;
