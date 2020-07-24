import React, { useState } from 'react';
import styled from 'styled-components';
import Aux from '../../hoc/_Aux';
import Range from '../../App/components/Range';
import { Form, Button, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addZg } from '../../store/actions';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Swal from 'sweetalert2';
import { uuid } from 'uuidv4';
import { Redirect, useHistory } from 'react-router-dom';
import moment from 'moment';

const Container = styled.div`
    display: flex;
`;
const InfoSection = styled.div`
    width: 50%;
`;
const RangeContainer = styled.div`
    width: 50%;
`;
const ItemContainer = styled.div`
    margin: 30px 0;
`;

const Label = styled.h6`
    font-size: 17px;
    font-weight: 400;
    margin-bottom: 10px;
`;
const StyledButton = styled(Button)`
    width: 100%;
`;
const Dashboard = (props) => {
    const [breakId, setBreakId] = useState(0);
    const [note, setNote] = useState('');
    const [isGold, setIsGold] = useState(false);
    const [alert, setAlert] = useState(false);
    const history = useHistory();
    const rangeData = {};

    const currentValue = (currVal, id) => {
        rangeData[id] = currVal;
    };

    const handleSubmit = () => {
        const zg = {
            id: uuid(),
            rangeData,
            createdAt: moment().format(),
            breakId,
            note,
            isGold,
        };
        const [currentDay] = props.currentDay;
        const blocks = currentDay.workBlocks;
        console.log(currentDay, blocks);
        const newBlocks = {
            ...currentDay,
            workBlocks: [...blocks, zg],
        };

        props.addZg(newBlocks);
        setBreakId(0);
        setNote('');
        setIsGold(false);

        Swal.fire({
            icon: 'success',
            title: 'Zapisano',
            backdrop: false,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
        }).then((e) => history.push('/day-summary'));
    };
    // if(props.auth.uid){}
    // if(!props.auth.uid) {
    //     return <Redirect to="/auth/signin-1">
    // }
    if (!props.auth.uid) {
        return <Redirect to="/auth/signin-1" />;
    }
    return (
        <Aux>
            <Container>
                <RangeContainer>
                    {props.listOfItemsToMonitoring &&
                        props.listOfItemsToMonitoring.map(
                            ({ id, color, title, minDesc, maxDesc }, index) => {
                                return (
                                    <Range
                                        first={index === 0}
                                        id={id}
                                        color={color}
                                        title={title}
                                        minDesc={minDesc}
                                        maxDesc={maxDesc}
                                        currentValue={currentValue}
                                    />
                                );
                            }
                        )}
                </RangeContainer>
                <InfoSection>
                    <ItemContainer>
                        <Label>Poprzednia przerwa</Label>
                        <Form.Control
                            as="select"
                            className="mb-3"
                            onChange={(e) => setBreakId(e.target.value)}>
                            <option>Default select</option>
                            {props.breaks &&
                                props.breaks.map(({ id, name }) => (
                                    <option key={id} value={id}>
                                        {name}
                                    </option>
                                ))}
                        </Form.Control>
                    </ItemContainer>
                    <ItemContainer>
                        <Form.Check
                            custom
                            type="checkbox"
                            id="checkbox1"
                            label="Czy była to złota godzina ?"
                            onChange={(e) => setIsGold(e.target.checked)}
                        />
                    </ItemContainer>
                    <ItemContainer>
                        <Label>Notka</Label>
                        <Form.Control
                            as="textarea"
                            rows="3"
                            onChange={(e) => setNote(e.target.value)}
                        />
                    </ItemContainer>
                    <div
                        aria-live="polite"
                        aria-atomic="true"
                        style={{
                            position: 'relative',
                            minHeight: '100px',
                        }}
                    />

                    <StyledButton variant="primary" onClick={handleSubmit}>
                        Zapisz
                    </StyledButton>
                </InfoSection>
            </Container>
            {alert && (
                <Alert
                    variant="success"
                    onDismiss={() => setAlert(false)}
                    style={{
                        position: 'absolute',
                        top: '0px',
                        right: '15px',
                        width: '300px',
                    }}>
                    Dodano
                </Alert>
            )}
        </Aux>
    );
};
const mapStateToProps = (state) => {
    return {
        breaks: state.firestore.ordered.breaks,
        listOfItemsToMonitoring: state.firestore.ordered.monitoring,
        auth: state.firebase.auth,
        currentDay: state.firestore.ordered.days,
    };
};
export default compose(
    connect(
        mapStateToProps,
        { addZg }
    ),
    firestoreConnect([
        {
            collection: 'breaks',
        },
        {
            collection: 'days',
            doc: localStorage.getItem('day_id'),
        },
        {
            collection: 'monitoring',
        },
    ])
)(Dashboard);
