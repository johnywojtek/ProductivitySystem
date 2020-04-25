import React, { useState, useEffect } from 'react';
import { Row, Col, Nav, Tab } from 'react-bootstrap';
import styled from 'styled-components';

import Aux from '../../hoc/_Aux';
import Task from '../../App/components/Task';
import { addTask } from '../../store/actions';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import moment from 'moment';

const Dashboard = (props) => {
    return (
        <Aux>
            {props.data.tasks ? (
                props.data.tasks[0] ? (
                    <Task
                        id={props.data.tasks[0].id}
                        value={props.data.tasks[0].value}
                        done={props.data.tasks[0].done}
                    />
                ) : (
                    <h1>Gratulacje wszystko zrobione !</h1>
                )
            ) : (
                <h1>Loading</h1>
            )}
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
        { addTask }
    ),
    firestoreConnect([
        {
            collection: 'tasks',
            where: [
                ['dayId', '==', moment().isoWeekday()],
                ['done', '==', false],
            ],
        },
    ])
)(Dashboard);
