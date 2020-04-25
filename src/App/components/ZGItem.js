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

const ZGItem = (props) => {
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
        <div className="col-6" key={item}>
            <h6 className="text-center  m-b-10">
                <span className="text-muted m-r-5">{current.title}</span>
            </h6>
            <div
                className="progress"
                style={{
                    border: '1px solid black',
                }}>
                <div
                    className="progress-bar progress-c-theme"
                    role="progressbar"
                    style={{
                        width: `${zg.rangeData[item]}%`,
                    }}>
                    {zg.rangeData[item]}%
                </div>
            </div>
        </div>
    );
};

export default ZGItem;
