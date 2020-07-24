import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Moment from 'react-moment';
import Aux from '../../hoc/_Aux';
import { Form, Button, Dropdown, Card } from 'react-bootstrap';
import Range from '../../App/components/Range';
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
    /* display: flex; */
    /* align-items: center; */
    /* justify-content: center; */
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
    const [mistakesNote, setMistakesNote] = useState('');
    const [goodThingsNote, setGoodThingsNote] = useState('');
    const [learnedNote, setLearnedNote] = useState('');
    localStorage.removeItem('summaryId');
    if (props.day) {
        var [currentDay] = props.day;
    }

    useEffect(
        () => {
            if (currentDay) {
                setMistakesNote(currentDay.daySummary.mistakes_note);
                setGoodThingsNote(currentDay.daySummary.good_things_note);
                setLearnedNote(currentDay.daySummary.learned_note);
            }
        },
        [currentDay]
    );

    const handleSubmit = () => {
        const data = {
            planned_work_blocks: currentDay.daySummary.planned_work_blocks,
            mistakes_note: mistakesNote,
            good_things_note: goodThingsNote,
            learned_note: learnedNote,
        };

        props.updateSummary(data);
    };

    const dateToFormat = new Date();

    return (
        <Aux>
            <Container>
                <Label>
                    Podsumowanie dnia:
                    <Span>
                        <Moment format="dddd DD/MM YYYY">{dateToFormat}</Moment>
                    </Span>
                </Label>
                <ItemContainer>
                    <h1>
                        Start Dnia:
                        {currentDay &&
                            moment(currentDay.created_at).format('HH:mm')}
                    </h1>
                    <h1>
                        Ilość Godzin zaplanowanych:
                        {currentDay &&
                            currentDay.daySummary.planned_work_blocks}
                    </h1>
                    <h1>
                        Ilość Godzin zrobionych:
                        {currentDay && currentDay.workBlocks.length}
                    </h1>

                    <div
                        className="progress"
                        style={{
                            border: '1px solid ',
                            borderImageSlice: 1,
                            borderImageSource:
                                'linear-gradient(-135deg, #1de9b6 0%, #1dc4e9 100%)',
                        }}>
                        <div
                            className="progress-bar progress-c-theme"
                            role="progressbar"
                            style={{
                                width: `${currentDay &&
                                    (currentDay.workBlocks.length * 100) /
                                        currentDay.daySummary
                                            .planned_work_blocks}%`,
                            }}>
                            {currentDay &&
                                Math.round(
                                    (currentDay.workBlocks.length * 100) /
                                        currentDay.daySummary
                                            .planned_work_blocks
                                )}
                            %
                        </div>
                    </div>
                </ItemContainer>
                <CardsContainer>
                    {currentDay &&
                        currentDay.workBlocks.map((zg, index) => {
                            return (
                                <div className="border p-1 m-1" key={zg.id}>
                                    <Card.Body className="border-bottom">
                                        <div className="row align-items-center justify-content-center">
                                            <div className="col-auto">
                                                <h4>{index + 1}</h4>
                                            </div>
                                            <div className="col-auto">
                                                {zg.isGold && <StyledGold />}
                                            </div>
                                            <div className="col text-right">
                                                <h4>
                                                    od{' '}
                                                    {moment(zg.createdAt)
                                                        .subtract(50, 'minutes')
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
                                            {props.monitoring &&
                                                Object.keys(zg.rangeData).map(
                                                    (item) => {
                                                        const current = props.monitoring.find(
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
                                                    }
                                                )}
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
            </Container>
        </Aux>
    );
};
const mapStateToProps = (state) => {
    return {
        day: state.firestore.ordered.days,
        monitoring: state.firestore.ordered.monitoring,
    };
};
export default compose(
    connect(
        mapStateToProps,
        { updateSummary }
    ),
    firestoreConnect([
        {
            collection: 'days',
            doc: localStorage.getItem('day_id'),
        },
        {
            collection: 'monitoring',
        },
    ])
)(DaySummary);
