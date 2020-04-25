import React, { useState, useEffect } from 'react';
import { Row, Col, Nav, Tab } from 'react-bootstrap';
import styled from 'styled-components';
import { FaCheck, FaPlus } from 'react-icons/fa';
import Aux from '../../hoc/_Aux';
import Task from '../../App/components/Task';
import { addTask } from '../../store/actions';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 2rem;
    margin-bottom: 1rem;
    border: 1px solid black;
    border-radius: 4px;
    svg {
        margin: 0 0.5rem;
        font-size: 1rem;
        fill: black;
        cursor: pointer;
        &:hover {
            fill: green;
        }
    }
`;
const Input = styled.input`
    width: 100%;
    padding: 0 1rem;
    height: auto;
    border: none;
    font-size: 0.8rem;
`;
const Dashboard = (props) => {
    const [taskValue, setTaskValue] = useState('');
    const [key, setKey] = useState(1);

    const onTaskSubmit = () => {
        // console.log(taskValue);
        props.addTask(taskValue, key);
        setTaskValue('');
    };

    const renderTasks = () => {
        return (
            <>
                <Task />
                <Task />
                <Task />
                <Task />
            </>
        );
    };

    // prawdopodobnie do zmiany poniewa tworzy wiele instancji listenera
    useEffect(
        () => {
            const listener = (event) => {
                if (event.code === 'Enter' || event.code === 'NumpadEnter') {
                    onTaskSubmit();
                }
            };
            document.addEventListener('keydown', listener);
            return () => {
                document.removeEventListener('keydown', listener);
            };
        },
        [onTaskSubmit]
    );

    const panel = [
        { id: 1, name: 'poniedziałek' },
        { id: 2, name: 'wtorek' },
        { id: 3, name: 'środa' },
        { id: 4, name: 'czwartek' },
        { id: 5, name: 'piątek' },
        { id: 6, name: 'sobota' },
        { id: 7, name: 'niedziela' },
    ];

    return (
        <Aux>
            <Tab.Container
                defaultActiveKey={1}
                activeKey={key}
                onSelect={(key) => setKey(parseInt(key))}>
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            {panel.map(({ id, name }) => (
                                <Nav.Item key={id}>
                                    <Nav.Link eventKey={id}>
                                        {name.charAt(0).toUpperCase() +
                                            name.slice(1)}
                                    </Nav.Link>
                                </Nav.Item>
                            ))}
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content activeKey={key}>
                            <InputContainer>
                                <Input
                                    placeholder="Wpisz nazwę zadania"
                                    value={taskValue}
                                    onChange={(e) =>
                                        setTaskValue(e.target.value)
                                    }
                                />
                                <FaPlus onClick={onTaskSubmit} />
                            </InputContainer>
                            {panel.map(({ id, name }) => (
                                <Tab.Pane key={id} eventKey={id}>
                                    {props.data.tasks &&
                                        props.data.tasks.map((e) => {
                                            if (e.dayId === key) {
                                                return (
                                                    <Task
                                                        key={e.id}
                                                        id={e.id}
                                                        value={e.value}
                                                        done={e.done}
                                                    />
                                                );
                                            }
                                        })}
                                </Tab.Pane>
                            ))}
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
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
            orderBy: ['done', 'asc'],
        },
    ])
)(Dashboard);
