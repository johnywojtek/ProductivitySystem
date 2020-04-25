import React, { useState, useEffect } from 'react';
import { Row, Col, Nav, Tab, Dropdown, SplitButton } from 'react-bootstrap';
import styled from 'styled-components';
import { FaCheck, FaPlus } from 'react-icons/fa';
import Aux from '../../hoc/_Aux';
import Task from '../../App/components/Task';
import { addTask } from '../../store/actions';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Swal from 'sweetalert2';
import Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import update from 'immutability-helper';

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
        if (taskValue.length > 0) {
            props.addTask(taskValue, key);
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
        { id: 8, name: 'Projekt EWS' },
        { id: 9, name: 'Kalendarz' },
        { id: 10, name: 'Projekt Neuron Foundation' },
        { id: 11, name: 'Projekt ERP' },
        { id: 12, name: 'Projekt BY' },
        { id: 13, name: 'Okno nauki' },
        { id: 14, name: 'Angielski' },
        { id: 15, name: 'Nauka' },
    ];
    const [cards, setCards] = useState([
        {
            id: 1,
            value: 'Write a cool JS library',
        },
        {
            id: 2,
            value: 'Make it generic enough',
        },
        {
            id: 3,
            value: 'Write README',
        },
        {
            id: 4,
            value: 'Create some examples',
        },
        {
            id: 5,
            value:
                'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
        },
        {
            id: 6,
            value: '???',
        },
        {
            id: 7,
            value: 'PROFIT',
        },
    ]);
    const moveCard = (dragIndex, hoverIndex) => {
        const dragCard = cards[dragIndex];
        console.log(dragCard);

        setCards(
            update(cards, {
                $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
            })
        );
    };
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
                                onClick={() => {
                                    props.addTask(
                                        'Zapisuje strony które obejrzę na małej karteczce',
                                        key
                                    );
                                    props.addTask(
                                        'Oglądam okno 20min 2x lub 1.75x + zaznaczam bookmarki',
                                        key
                                    );
                                    props.addTask(
                                        'Zapisuje w evernote rzeczy z bookmarków',
                                        key
                                    );
                                    props.addTask(
                                        'Zapisuje strony które obejrzę na małej karteczce',
                                        key
                                    );
                                    props.addTask(
                                        'Oglądam okno 20min 2x lub 1.75x + zaznaczam bookmarki',
                                        key
                                    );
                                    props.addTask(
                                        'Zapisuje w evernote rzeczy z bookmarków',
                                        key
                                    );
                                }}
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
                            {panel.map(({ id, name }) => (
                                <Tab.Pane key={id} eventKey={id}>
                                    <DndProvider backend={Backend}>
                                        {props.data.tasks &&
                                            cards
                                                // .filter((e) => e.dayId === key)
                                                .map((e, i) => {
                                                    return (
                                                        <Task
                                                            index={i}
                                                            moveCard={moveCard}
                                                            key={e.id}
                                                            id={e.id}
                                                            value={e.value}
                                                            number={i + 1}
                                                            done={e.done}
                                                        />
                                                    );
                                                })}
                                    </DndProvider>
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
