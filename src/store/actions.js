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

export const addZg = (payload) => (
    getState,
    dispatch,
    { getFirebase, getFirestore }
) => {
    const firestore = getFirestore();

    firestore
        .collection('zg')
        .add({
            ...payload,
            createdAt: moment().format(),
        })
        .then(() => dispatch({ type: ADD_ZG, payload }))
        .catch((err) => console.log(err));
};

export const updateSummary = (payload, id = null) => (
    getState,
    dispatch,
    { getFirebase, getFirestore }
) => {
    const firestore = getFirestore();
    if (!id) {
        firestore
            .collection('daySummary')
            .add({ ...payload, createdAt: moment().format() })
            .then((e) => {
                localStorage.setItem('summaryId', e.id);
                dispatch({
                    type: CREATE_SUMMARY,
                });
            })
            .catch((err) => console.log(err));
    } else {
        firestore
            .collection('daySummary')
            .doc(id)
            .update({ ...payload })
            .then(() => dispatch({ type: UPDATE_SUMMARY, payload }))
            .catch((err) => console.log(err));
    }
};

export const addTask = (taskValue, dayId = null) => (
    getState,
    dispatch,
    { getFirebase, getFirestore }
) => {
    const firestore = getFirestore();

    firestore.collection('tasks').add({
        dayId,
        value: taskValue,
        done: false,
        createdAt: moment().format(),
    });
};
export const toggleTask = (taskId, taskState) => (
    getState,
    dispatch,
    { getFirebase, getFirestore }
) => {
    const firestore = getFirestore();

    firestore
        .collection('tasks')
        .doc(taskId)
        .update({
            done: taskState,
        });
};
export const addWeekPlan = (payload) => (
    getState,
    dispatch,
    { getFirebase, getFirestore }
) => {
    const firestore = getFirestore();

    firestore
        .collection('weekPlan')
        .add({ ...payload, createdAt: moment().format() })
        .then(() => dispatch({ type: ADD_ZG, payload }))
        .catch((err) => console.log(err));
};

export const signIn = (credentials) => (
    dispatch,
    getstate,
    { getFirebase }
) => {
    const firebase = getFirebase();

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

    firebase
        .auth()
        .createUserWithEmailAndPassword(credentials.email, credentials.password)
        .then((res) => {
            return firestore
                .collection('users')
                .doc(res.user.uid)
                .set({ userName: credentials.userName });
        })
        .then(() => {
            dispatch({ type: SIGNUP_SUCCESS });
        })
        .catch((err) => {
            dispatch({ type: SIGNUP_ERROR, err });
        });
};
