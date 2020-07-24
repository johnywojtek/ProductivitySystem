import React, { useState, useEffect } from 'react';
import { Row, Col, Nav, Tab, Dropdown, SplitButton } from 'react-bootstrap';
import styled from 'styled-components';
import { FaCheck, FaPlus } from 'react-icons/fa';
import Aux from '../../hoc/_Aux';
import Task from '../../App/components/Task';
import { addTask, reorderTasks } from '../../store/actions';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Swal from 'sweetalert2';
import moment from 'moment';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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
const listContainer = styled.div`
    width: 100%;
    padding: 2rem;
`;
const Dashboard = (props) => {
    const [taskValue, setTaskValue] = useState('');
    const [key, setKey] = useState(1);
    const [items, setItems] = useState([]);
    const [taskId, setTaskId] = useState(null);

    const onTaskSubmit = () => {
        if (taskValue.length > 0) {
            let newItems = [];
            const newItem = {
                id: Date.now() + Math.random() + '',
                value: taskValue,
                done: false,
                createdAt: moment().format(),
            };
            if (items.length) {
                newItems = [...items, newItem];
            } else {
                newItems = [newItem];
            }

            props.addTask(newItems, taskId);

            setTaskValue('');
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Dodaj treść zadania',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
            });
        }
    };

    // prawdopodobnie do zmiany poniewa tworzy wiele instancji listenera
    useEffect(
        () => {
            if (props.tasks) {
                const item = props.tasks.find((e) => e.dayId == key);
                setItems(item.tasks);
                setTaskId(item.id);
            }
        },
        [props.tasks, key]
    );
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

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        props.reorderTasks(result, taskId);
        return result;
    };

    const grid = 4;

    const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: 'none',
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,

        // change background colour if dragging
        background: isDragging ? 'lightgreen' : '#fff',

        // styles we need to apply on draggables
        ...draggableStyle,
    });

    const getListStyle = (isDraggingOver) => ({
        background: isDraggingOver ? 'lightblue' : 'lightgrey',
        padding: grid,
        width: '100%',
    });
    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const updatedItems = reorder(
            items,
            result.source.index,
            result.destination.index
        );

        setItems(updatedItems);
    };
    const panel = [
        { id: 0, name: 'poniedziałek' },
        { id: 1, name: 'wtorek' },
        { id: 2, name: 'środa' },
        { id: 3, name: 'czwartek' },
        { id: 4, name: 'piątek' },
        { id: 5, name: 'sobota' },
        { id: 6, name: 'niedziela' },
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
                            <SplitButton
                                // onClick={}
                                title="Dodaj Okno nauki"
                                variant="primary"
                                id={`dropdown-split-variants-primary`}>
                                <Dropdown.Item>
                                    1. Zapisuje strony które obejrzę na małej
                                    karteczce
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    2. Oglądam okno 20min 2x lub 1.75x +
                                    zaznaczam bookmarki
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    3. Zapisuje w evernote rzeczy z bookmarków
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    4. Zapisuje strony które obejrzę na małej
                                    karteczce
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    5. Oglądam okno 20min 2x lub 1.75x +
                                    zaznaczam bookmarki
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    6. Zapisuje w evernote rzeczy z bookmarków
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    7. Porządkuję notatkę (czytam + porządkuję +
                                    zaznaczam (CMD + i) rzeczy które dodam do
                                    Anki by później nie zastanawiać się co
                                    dodać)
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    8. Dodaję notatkę do anki
                                </Dropdown.Item>
                            </SplitButton>
                        </Tab.Content>
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
                            <DragDropContext onDragEnd={onDragEnd}>
                                <Droppable droppableId="droppable">
                                    {(provided, snapshot) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            style={getListStyle(
                                                snapshot.isDraggingOver
                                            )}>
                                            {items.length &&
                                                items.map((item, index) => (
                                                    <Draggable
                                                        key={item.id}
                                                        draggableId={item.id}
                                                        index={index}>
                                                        {(
                                                            provided,
                                                            snapshot
                                                        ) => (
                                                            <Task
                                                                taskId={taskId}
                                                                currentTaskId={
                                                                    item.id
                                                                }
                                                                isDone={
                                                                    item.done
                                                                }
                                                                number={index}
                                                                refe={
                                                                    provided.innerRef
                                                                }
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                style={getItemStyle(
                                                                    snapshot.isDragging,
                                                                    provided
                                                                        .draggableProps
                                                                        .style
                                                                )}
                                                                value={
                                                                    item.value
                                                                }
                                                            />
                                                        )}
                                                    </Draggable>
                                                ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Aux>
    );
};

const mapStateToProps = (state) => {
    return {
        tasks: state.firestore.ordered.tasks,
        auth: state.firebase.auth,
    };
};

export default compose(
    connect(
        mapStateToProps,
        { addTask, reorderTasks }
    ),
    firestoreConnect((props) => {
        if (!props.auth.uid) return [];
        return [
            { collection: 'tasks', where: [['uid', '==', props.auth.uid]] },
        ];
    })
)(Dashboard);
