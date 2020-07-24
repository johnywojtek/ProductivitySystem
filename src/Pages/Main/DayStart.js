import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Button, Form } from 'react-bootstrap';
import styled from 'styled-components';
import { dayStart } from '../../store/actions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Swal from 'sweetalert2';

const DropdownContainer = styled.div`
    width: 70px;
    /* margin-left: 30px; */
`;

const Label = styled.h6`
    font-size: 17px;
    font-weight: 400;
    margin: 0 20px;
    margin-bottom: 10px;
`;
const Container = styled.div``;
const DayStart = ({ uid, dayStart }) => {
    const [dropdownValue, setDropdownValue] = useState(0);
    const history = useHistory();

    const onButtonClick = () => {
        if (dropdownValue === 0) {
            alert('Hej dzisiaj 0 godzin ????');
        } else {
            dayStart(uid, dropdownValue);
            Swal.fire({
                icon: 'success',
                title: 'Dzień rozpoczęty ! Do dzieła !! :)) ',
                backdrop: false,
                toast: true,
                position: 'center',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
            });
            history.push('/');
        }
    };
    return (
        <Container>
            <h1>Witaj rozpocznij nowy dzień ! {uid}</h1>
            <Label>Ilość zaplanowanych ZG:</Label>
            <DropdownContainer>
                <Form.Control
                    as="select"
                    className="mb-3"
                    onChange={(e) => setDropdownValue(e.target.value)}
                    value={dropdownValue}>
                    <option>0</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                </Form.Control>
            </DropdownContainer>
            <Button variant="primary" onClick={onButtonClick}>
                Rozpoczynam !
            </Button>
        </Container>
    );
};

const mapStateToProps = (state) => {
    return {
        uid: state.firebase.auth.uid,
    };
};

export default compose(
    connect(
        mapStateToProps,
        { dayStart }
    )
)(DayStart);
