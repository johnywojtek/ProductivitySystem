import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Moment from 'react-moment';
import Aux from '../../hoc/_Aux';
import { Form, Button, Dropdown, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { updateSummary } from '../../store/actions';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import moment from 'moment';
import { GiGoldBar } from 'react-icons/gi';
import _ from 'lodash';

const Container = styled.div`
    /* display: flex; */
`;
const ItemContainer = styled.div`
    display: flex;
    align-items: center;
    /* justify-content: center; */
`;
const DropdownContainer = styled.div`
    width: 50px;
    margin-left: 30px;
`;
const CardsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
`;

const Label = styled.h6`
    font-size: 17px;
    font-weight: 400;
    margin: 0 20px;
    margin-bottom: 10px;
`;
const Span = styled.span`
    margin-left: 10px;
`;
const StyledButton = styled(Button)`
    width: 100%;
    margin-top: 10px;
`;

const StyledGold = styled(GiGoldBar)`
    font-size: 50px;
    filter: drop-shadow(5px 5px 10px #ffd700);
    color: #ffd700;
`;
const DaySummary = (props) => {
    const [zgValue, setZgValue] = useState('');
    const [mistakesNote, setMistakesNote] = useState('');
    const [goodThingsNote, setGoodThingsNote] = useState('');
    const [learnedNote, setLearnedNote] = useState('');
    //nie dziala
    useEffect(
        () => {
            if (props.data.daySummary) {
                setMistakesNote(props.data.daySummary[0].mistakesNote);
                setGoodThingsNote(props.data.daySummary[0].goodThingsNote);
                setLearnedNote(props.data.daySummary[0].learnedNote);
            }
        },
        [props.data]
    );

    const handleSubmit = () => {
        const data = {
            mistakesNote,
            goodThingsNote,
            learnedNote,
            zgValue,
        };

        localStorage.getItem('summaryId')
            ? props.updateSummary(data, localStorage.getItem('summaryId'))
            : props.updateSummary(data);
    };

    const dateToFormat = new Date();
    // console.log(props.data);

    return (
        <Aux>
            <Container>
                <Label>
                    Podsumowanie dnia:
                    <Span>
                        <Moment format="dddd MMMM YYYY">{dateToFormat}</Moment>
                    </Span>
                </Label>

                <>
                    <ItemContainer>
                        <Label>Ilość zaplanowanych ZG:</Label>
                        <DropdownContainer>
                            <Form.Control
                                as="select"
                                className="mb-3"
                                onChange={(e) => setZgValue(e.target.value)}
                                value={zgValue}>
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
                        <Label>Ilość Wykonanych ZG: </Label>
                        <Label>{props.data.zg && props.data.zg.length}</Label>
                    </ItemContainer>
                    <CardsContainer>
                        {props.data.zg &&
                            props.data.zg.map((zg, index) => {
                                return (
                                    <div className="border p-1 m-1" key={zg.id}>
                                        <Card.Body className="border-bottom">
                                            <div className="row align-items-center justify-content-center">
                                                <div className="col-auto">
                                                    <h4>{index + 1}</h4>
                                                </div>
                                                <div className="col-auto">
                                                    {zg.isGold && (
                                                        <StyledGold />
                                                    )}
                                                </div>
                                                <div className="col text-right">
                                                    <h4>
                                                        od{' '}
                                                        {moment(zg.createdAt)
                                                            .subtract(
                                                                50,
                                                                'minutes'
                                                            )
                                                            .format('HH:mm')}
                                                    </h4>
                                                    <h4>
                                                        do{' '}
                                                        {moment(
                                                            zg.createdAt
                                                        ).format('HH:mm')}
                                                    </h4>
                                                </div>
                                                <p className=" mb-0">
                                                    <span className="text-muted">
                                                        {zg.note}
                                                    </span>
                                                </p>
                                            </div>
                                        </Card.Body>

                                        <Card.Body>
                                            <div className="row align-items-center justify-content-center card-active">
                                                {props.data.monitoring &&
                                                    Object.keys(
                                                        zg.rangeData
                                                    ).map((item) => {
                                                        const current = props.data.monitoring.find(
                                                            (
                                                                currentMonitoring
                                                            ) =>
                                                                currentMonitoring.id ===
                                                                item
                                                        );
                                                        return (
                                                            <div
                                                                className="col-6"
                                                                key={item}>
                                                                <h6 className="text-center  m-b-5 m-t-10">
                                                                    <span className="text-muted ">
                                                                        {
                                                                            current.title
                                                                        }
                                                                    </span>
                                                                </h6>
                                                                <div
                                                                    className="progress"
                                                                    style={{
                                                                        border:
                                                                            '1px solid ',
                                                                        borderImageSlice: 1,
                                                                        borderImageSource:
                                                                            'linear-gradient(-135deg, #1de9b6 0%, #1dc4e9 100%)',
                                                                    }}>
                                                                    <div
                                                                        className="progress-bar progress-c-theme"
                                                                        role="progressbar"
                                                                        style={{
                                                                            width: `${
                                                                                zg
                                                                                    .rangeData[
                                                                                    item
                                                                                ]
                                                                            }%`,
                                                                        }}>
                                                                        {
                                                                            zg
                                                                                .rangeData[
                                                                                item
                                                                            ]
                                                                        }
                                                                        %
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                            </div>
                                        </Card.Body>
                                    </div>
                                );
                            })}
                    </CardsContainer>
                    <Form.Group controlId="1">
                        <Form.Label>Czego się dzisiaj nauczyłem ?</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows="3"
                            value={learnedNote}
                            onChange={(e) => setLearnedNote(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="1">
                        <Form.Label>
                            Jakie były błedy ktore popełniłem danego dnia ?
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows="3"
                            value={mistakesNote}
                            onChange={(e) => setMistakesNote(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="1">
                        <Form.Label>
                            Co zrobiłem dobrze i mogę zrobić aby być bardziej
                            skutecznym ?
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows="3"
                            value={goodThingsNote}
                            onChange={(e) => setGoodThingsNote(e.target.value)}
                        />
                    </Form.Group>

                    <StyledButton variant="primary" onClick={handleSubmit}>
                        Zapisz
                    </StyledButton>
                    <StyledButton
                        variant="secondary"
                        onClick={() => localStorage.removeItem('summaryId')}>
                        Zakończ dzień
                    </StyledButton>
                </>
            </Container>
        </Aux>
    );
};
const mapStateToProps = (state) => {
    return {
        data: state.firestore.ordered,
    };
};
export default compose(
    connect(
        mapStateToProps,
        { updateSummary }
    ),
    firestoreConnect([
        {
            collection: 'zg',
            where: [
                'createdAt',
                '>',
                moment()
                    .hour(1)
                    .format(),
            ],
            orderBy: ['createdAt', 'asc'],
        },
        {
            collection: 'daySummary',
            doc: localStorage.getItem('summaryId'),
        },
        {
            collection: 'monitoring',
        },
    ])
)(DaySummary);
