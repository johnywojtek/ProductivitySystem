import moment from 'moment';
export const COLLAPSE_MENU = 'COLLAPSE_MENU';
export const COLLAPSE_TOGGLE = 'COLLAPSE_TOGGLE';
export const FULL_SCREEN = 'FULL_SCREEN';
export const FULL_SCREEN_EXIT = 'FULL_SCREEN_EXIT';
export const CHANGE_LAYOUT = 'CHANGE_LAYOUT';
export const NAV_CONTENT_LEAVE = 'NAV_CONTENT_LEAVE';
export const NAV_COLLAPSE_LEAVE = 'NAV_COLLAPSE_LEAVE';
export const ADD_ZG = 'ADD_ZG';
export const CREATE_SUMMARY = 'CREATE_SUMMARY';
export const UPDATE_SUMMARY = 'UPDATE_SUMMARY';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const SIGNOUT_SUCCCESS = 'SIGNOUT_SUCCCESS';
export const ADD_WEEKPLAN = 'ADD_WEEKPLAN';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';

export const DAY_START = 'DAY_START';

export const addZg = (payload) => (
    dispatch,
    getState,
    { getFirebase, getFirestore }
) => {
    const firestore = getFirestore();

    firestore
        .collection('days')
        .doc(localStorage.getItem('day_id'))
        .update(payload)
        .then(() => dispatch({ type: ADD_ZG, payload }))
        .catch((err) => console.log(err));

    if (payload.workBlocks.pop().isGold) {
        console.log(payload);
        firestore
            .collection('users')
            .doc(payload.uid)
            .update({ currentAmountIZG: firestore.FieldValue.increment(1) })
            .then(() => dispatch({ type: ADD_ZG, payload }))
            .catch((err) => console.log(err));
    }
};

export const dayStart = (uid, workBlocksCount) => (
    dispatch,
    getState,
    { getFirebase, getFirestore }
) => {
    const firestore = getFirestore();

    firestore
        .collection('days')
        .add({
            uid,
            created_at: moment().format(),
            workBlocks: [],
            daySummary: {
                planned_work_blocks: workBlocksCount,
                good_things_note: '',
                learned_note: '',
                mistakes_note: '',
            },
        })
        .then((e) => {
            localStorage.setItem('day_id', e.id);
            localStorage.setItem(
                'day_created_date',
                moment().format('DD/MM/YYYY')
            );
            dispatch({ type: DAY_START });
        })
        .catch((err) => console.log(err));
};

export const updateSummary = (payload) => (
    dispatch,
    getState,
    { getFirebase, getFirestore }
) => {
    const firestore = getFirestore();

    firestore
        .collection('days')
        .doc(localStorage.getItem('day_id'))
        .update({ daySummary: { ...payload } })
        .then(() => dispatch({ type: UPDATE_SUMMARY, payload }))
        .catch((err) => console.log(err));
};

export const addTask = (tasks, taskId) => (
    dispatch,
    getState,
    { getFirebase, getFirestore }
) => {
    const firestore = getFirestore();
    firestore
        .collection('tasks')
        .doc(taskId)
        .update({
            tasks,
        });
};

export const toggleTask = (taskId, currentTaskId, taskState) => (
    dispatch,
    getState,
    { getFirebase, getFirestore }
) => {
    const firestore = getFirestore();

    firestore
        .collection('tasks')
        .doc(taskId)
        .update({
            tasks: getState().firestore.data.tasks[taskId].tasks.map((task) =>
                task.id == currentTaskId ? { ...task, done: taskState } : task
            ),
        });
};

export const addWeeklyTasks = (tasks, type, taskId) => (
    dispatch,
    getState,
    { getFirebase, getFirestore }
) => {
    const firestore = getFirestore();

    firestore
        .collection('weeklyTasks')
        .doc(taskId)
        .update({
            secondaryTasks: tasks,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
};
export const reorderTasks = (updatedTasks, taskId) => (
    dispatch,
    getState,
    { getFirebase, getFirestore }
) => {
    const firestore = getFirestore();

    firestore
        .collection('tasks')
        .doc(taskId)
        .update({ tasks: updatedTasks })
        .then(() => dispatch({ type: ADD_ZG }))
        .catch((err) => console.log(err));
};
export const signIn = (credentials) => (
    dispatch,
    getstate,
    { getFirebase }
) => {
    const firebase = getFirebase();
    console.log(credentials);

    firebase
        .auth()
        .signInWithEmailAndPassword(credentials.email, credentials.password)
        .then(() => {
            dispatch({ type: LOGIN_SUCCESS });
        })
        .catch((err) => {
            dispatch({ type: LOGIN_ERROR, err });
        });
};

export const changeLevel = (level, userId) => (
    dispatch,
    getState,
    { getFirebase, getFirestore }
) => {
    const firestore = getFirestore();

    firestore
        .collection('users')
        .doc(userId)
        .update({ currentLevel: level })
        .then(() => dispatch({ type: ADD_ZG }))
        .catch((err) => console.log(err));
};
export const signOut = () => (dispatch, getstate, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
        .auth()
        .signOut()
        .then(() => {
            dispatch({ type: SIGNOUT_SUCCCESS });
        });
};

export const signUp = (credentials) => (
    dispatch,
    getstate,
    { getFirebase, getFirestore }
) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const addTask = (userId, dayId) => {
        return firestore.collection('tasks').add({
            uid: userId,
            dayId,
            tasks: [],
        });
    };
    firebase
        .auth()
        .createUserWithEmailAndPassword(credentials.email, credentials.password)
        .then((res) => {
            firestore
                .collection('users')
                .doc(res.user.uid)
                .set({
                    userName: credentials.userName,
                    currentLevel: false,
                    isDayEnd: false,
                });
            for (let i = 0; i < 7; i++) {
                addTask(res.user.uid, i);
            }
        })
        .then(() => {
            dispatch({ type: SIGNUP_SUCCESS });
        })
        .catch((err) => {
            dispatch({ type: SIGNUP_ERROR, err });
        });
};
