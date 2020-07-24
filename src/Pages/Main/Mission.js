import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import styled from 'styled-components';
import { FaArrowRight, FaPlus } from 'react-icons/fa';
import Aux from '../../hoc/_Aux';
import Task from '../../App/components/Task';
import { changeLevel } from '../../store/actions';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const Container = styled.div`
    height: 50vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const StyledNumberInput = styled(Form.Control)`
    width: 20rem;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    &[type='number'] {
        -moz-appearance: textfield;
    }
`;
const Dashboard = ({ loading, user, changeLevel }) => {
    const [levelValue, setLevelValue] = useState('');
    const handleSubmit = () => {
        if (!levelValue.length) {
            alert('Podaj poziom');
        } else {
            changeLevel(parseInt(levelValue), user.id);
        }
    };
    if (loading) {
        return <h1>Loading</h1>;
    }
    if (user.currentLevel === false) {
        const invalidChars = ['-', 'e', '+', 'E', '.', ','];
        return (
            <Container>
                <Form.Group className="text-center">
                    <Form.Label>Podaj swój aktualny poziom</Form.Label>
                    <StyledNumberInput
                        size="lg"
                        type="number"
                        className="mb-3"
                        value={levelValue}
                        onChange={(e) => setLevelValue(e.target.value)}
                        onKeyDown={(evt) =>
                            invalidChars.includes(evt.key) &&
                            evt.preventDefault()
                        }
                    />
                    <Button
                        variant="primary"
                        className="w-100"
                        onClick={handleSubmit}>
                        Dalej <FaArrowRight />
                    </Button>
                </Form.Group>
            </Container>
        );
    }
    return (
        <Aux>
            <h1>Hi</h1>
        </Aux>
    );
};

const mapStateToProps = (state) => {
    if (state.firestore.ordered.users) {
        return {
            user: state.firestore.ordered.users.find(
                (user) => user.id === state.firebase.auth.uid
            ),
        };
    }
    return {
        loading: true,
    };
};

export default compose(
    connect(
        mapStateToProps,
        { changeLevel }
    ),
    firestoreConnect([
        {
            collection: 'users',
        },
    ])
)(Dashboard);
