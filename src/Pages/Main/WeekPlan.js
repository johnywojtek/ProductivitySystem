import React, { useState } from 'react';
import styled from 'styled-components';
import Aux from '../../hoc/_Aux';

import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addWeekPlan } from '../../store/actions';

const Container = styled.div`
    /* display: flex; */
`;

const Label = styled.h6`
    font-size: 17px;
    font-weight: 400;
    margin-bottom: 10px;
`;
const StyledButton = styled(Button)`
    width: 100%;
    margin-top: 10px;
`;

const Dashboard = props => {
    const [note, setNote] = useState('');

    const handleSubmit = () => {
        const zg = {
            note
        };
        props.addWeekPlan(zg);
    };

    return (
        <Aux>
            <Container>
                <Label>Notka</Label>
                <Form.Control
                    as="textarea"
                    rows="15"
                    onChange={e => setNote(e.target.value)}
                />
                <StyledButton variant="primary" onClick={handleSubmit}>
                    Zapisz
                </StyledButton>
            </Container>
        </Aux>
    );
};

export default connect(null, { addWeekPlan })(Dashboard);
