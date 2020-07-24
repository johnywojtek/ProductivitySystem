import React, { useState, useEffect } from 'react';
import { Row, Col, Nav, Tab, Dropdown, SplitButton } from 'react-bootstrap';
import styled from 'styled-components';
import { FaCheck, FaPlus } from 'react-icons/fa';
import Aux from '../../hoc/_Aux';
import Task from '../../App/components/Task';
import { addWeeklyTasks } from '../../store/actions';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import moment from 'moment';

// const InputContainer = styled.div`
//     display: flex;
//     align-items: center;
//     width: 100%;
//     height: 2rem;
//     margin-bottom: 1rem;
//     border: 1px solid black;
//     border-radius: 4px;
//     svg {
//         margin: 0 0.5rem;
//         font-size: 1rem;
//         fill: black;
//         cursor: pointer;
//         &:hover {
//             fill: green;
//         }
//     }
// `;
// const Input = styled.input`
//     width: 100%;
//     padding: 0 1rem;
//     height: auto;
//     border: none;
//     font-size: 0.8rem;
// `;
// const Dashboard = (props) => {
//     const [taskValue, setTaskValue] = useState('');
//     const [key, setKey] = useState(1);

//     const onTaskSubmit = () => {
//         if (taskValue.length > 0) {
//             props.addTask(taskValue, key);
//             setTaskValue('');
//         } else {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Dodaj treść zadania',
//                 toast: true,
//                 position: 'top-end',
//                 showConfirmButton: false,
//                 timer: 1000,
//                 timerProgressBar: true,
//             });
//         }
//     };

//     // prawdopodobnie do zmiany poniewa tworzy wiele instancji listenera
//     useEffect(
//         () => {
//             const listener = (event) => {
//                 if (event.code === 'Enter' || event.code === 'NumpadEnter') {
//                     onTaskSubmit();
//                 }
//             };
//             document.addEventListener('keydown', listener);
//             return () => {
//                 document.removeEventListener('keydown', listener);
//             };
//         },
//         [onTaskSubmit]
//     );

//     // const moveCard = (dragIndex, hoverIndex) => {
//     //     const dragCard = cards[dragIndex];
//     //     console.log(dragCard);

//     //     setCards(
//     //         update(cards, {
//     //             $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
//     //         })
//     //     );
//     // };
//     return (
//         <Aux>
//             <Tab.Container
//                 defaultActiveKey={1}
//                 activeKey={key}
//                 onSelect={(key) => setKey(parseInt(key))}>
//                 <Row>
//                     <Col>
//                         <Tab.Content activeKey={key}>
//                             <InputContainer>
//                                 <Input
//                                     placeholder="Wpisz nazwę zadania"
//                                     value={taskValue}
//                                     onChange={(e) =>
//                                         setTaskValue(e.target.value)
//                                     }
//                                 />
//                                 <FaPlus onClick={onTaskSubmit} />
//                             </InputContainer>
//                             {console.log(props.data)}
//                             {/* <Tab.Pane> */}
//                             {/* <DndProvider backend={Backend}> */}
//                             {props.data.tasks &&
//                                 props.data.tasks
//                                     // .filter((e) => e.dayId === key)
//                                     .map((e, i) => {
//                                         return (
//                                             <Task
//                                                 index={i}
//                                                 // moveCard={moveCard}
//                                                 key={e.id}
//                                                 id={e.id}
//                                                 value={e.value}
//                                                 number={i + 1}
//                                                 done={e.done}
//                                             />
//                                         );
//                                     })}
//                             {/* </DndProvider> */}
//                             {/* </Tab.Pane> */}
//                         </Tab.Content>
//                     </Col>
//                 </Row>
//             </Tab.Container>
//         </Aux>
//     );
// };

// fake data generator
const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map((k) => ({
        id: `item-${k + offset}-${new Date().getTime()}`,
        content: `item ${k + offset}`,
    }));

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle,
});
const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 250,
});

function QuoteApp(props) {
    const [state, setState] = useState([getItems(10), getItems(5, 10)]);
    useEffect(
        () => {
            if (props.tasks) {
                setState([
                    props.tasks[0].addionalTasks,
                    props.tasks[0].importantTasks,
                    props.tasks[0].secondaryTasks,
                    props.tasks[0].completedTasks,
                ]);
            }
        },
        [props.tasks]
    );

    function onDragEnd(result) {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }
        const sInd = +source.droppableId;
        const dInd = +destination.droppableId;

        if (sInd === dInd) {
            const items = reorder(state[sInd], source.index, destination.index);
            const newState = [...state];
            newState[sInd] = items;
            setState(newState);
        } else {
            const result = move(state[sInd], state[dInd], source, destination);
            const newState = [...state];
            newState[sInd] = result[sInd];
            newState[dInd] = result[dInd];

            setState(newState.filter((group) => group.length));
        }
    }

    const addTask = (value) => {
        console.log(props.data);
        const newItem = {
            id: Date.now() + Math.random() + '',
            value: 'test 2',
            done: false,
            createdAt: moment().format(),
        };

        props.addWeeklyTasks(
            [newItem],
            'addionalTasks',
            'IntkmyHyJ7LEklR63Xkr'
        );
    };

    return (
        <div>
            {console.log(state)}
            <button
                type="button"
                onClick={() => {
                    setState([...state, []]);
                }}>
                Add new group
            </button>
            <button
                type="button"
                onClick={() => {
                    // setState([...state, getItems(1)]);
                    addTask();
                }}>
                Add new item
            </button>

            <div style={{ display: 'flex' }}>
                <DragDropContext onDragEnd={onDragEnd}>
                    {state.map((el, ind) => (
                        <Droppable key={ind} droppableId={`${ind}`}>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    style={getListStyle(
                                        snapshot.isDraggingOver
                                    )}
                                    {...provided.droppableProps}>
                                    {el.map((item, index) => (
                                        <Draggable
                                            key={item.id}
                                            draggableId={item.id}
                                            index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={getItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps
                                                            .style
                                                    )}>
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent:
                                                                'space-around',
                                                        }}>
                                                        {item.content}
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const newState = [
                                                                    ...state,
                                                                ];
                                                                newState[
                                                                    ind
                                                                ].splice(
                                                                    index,
                                                                    1
                                                                );
                                                                setState(
                                                                    newState.filter(
                                                                        (
                                                                            group
                                                                        ) =>
                                                                            group.length
                                                                    )
                                                                );
                                                            }}>
                                                            delete
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </DragDropContext>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        tasks: state.firestore.ordered.weeklyTasks,
    };
};

export default compose(
    connect(
        mapStateToProps,
        { addWeeklyTasks }
    ),
    firestoreConnect((props) => {
        if (!props.auth.uid) return [];
        return [
            {
                collection: 'weeklyTasks',
                where: [['uid', '==', props.auth.uid]],
            },
        ];
    })
)(QuoteApp);
