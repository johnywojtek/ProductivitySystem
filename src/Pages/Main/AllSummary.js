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

const CardsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
`;
const InfContainer = styled.div`
    display: flex;
    flex-direction: column;
    span {
        margin: 1rem;
    }
`;

const StyledGold = styled(GiGoldBar)`
    font-size: 50px;
    filter: drop-shadow(5px 5px 10px #ffd700);
    color: #ffd700;
`;
const Summary = ({ days, monitoring }) => {
    return (
        <Aux>
            <Container>
                <>
                    {days &&
                        days.map((day) => {
                            return (
                                <div>
                                    {day.daySummary ? (
                                        <InfContainer>
                                            <h3>
                                                Dzień:
                                                {moment(day.created_at).format(
                                                    'DD MM '
                                                )}
                                            </h3>

                                            <span>
                                                {day.daySummary.mistakes_note}
                                            </span>

                                            <span>
                                                {day.daySummary.learned_note}
                                            </span>
                                            <span>
                                                {
                                                    day.daySummary
                                                        .good_things_note
                                                }
                                            </span>
                                        </InfContainer>
                                    ) : (
                                        <h1>brak Podsumowania dnia</h1>
                                    )}
                                    <CardsContainer>
                                        {day.workBlocks.map((zg) => {
                                            return (
                                                <div
                                                    className="border p-1 m-1"
                                                    key={zg.id}>
                                                    <Card.Body className="border-bottom">
                                                        <div className="row align-items-center justify-content-center">
                                                            <div className="col-auto">
                                                                {zg.isGold && (
                                                                    <StyledGold />
                                                                )}
                                                            </div>
                                                            <div className="col d-flex">
                                                                <span>
                                                                    od
                                                                    {moment(
                                                                        zg.createdAt
                                                                    )
                                                                        .subtract(
                                                                            50,
                                                                            'minutes'
                                                                        )
                                                                        .format(
                                                                            'DD MM HH:mm'
                                                                        )}
                                                                </span>
                                                                -
                                                                <span>
                                                                    do{' '}
                                                                    {moment(
                                                                        zg.createdAt
                                                                    ).format(
                                                                        'HH:mm'
                                                                    )}
                                                                </span>
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
                                                            {monitoring &&
                                                                Object.keys(
                                                                    zg.rangeData
                                                                ).map(
                                                                    (item) => {
                                                                        const current = monitoring.find(
                                                                            (
                                                                                currentMonitoring
                                                                            ) =>
                                                                                currentMonitoring.id ===
                                                                                item
                                                                        );
                                                                        return (
                                                                            <div
                                                                                className="col-6"
                                                                                key={
                                                                                    item
                                                                                }>
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
                                </div>
                            );
                        })}
                </>
            </Container>
        </Aux>
    );
};
const mapStateToProps = (state) => {
    return {
        days: state.firestore.ordered.days,
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
            orderBy: 'created_at',
        },
        {
            collection: 'monitoring',
        },
    ])
)(Summary);
