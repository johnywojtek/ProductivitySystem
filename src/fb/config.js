import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: 'AIzaSyDtsvd4CTFj2xlBlpmV0RoWmldZ8eDO9ns',
    authDomain: 'ewsproject-2c7fe.firebaseapp.com',
    databaseURL: 'https://ewsproject-2c7fe.firebaseio.com',
    projectId: 'ewsproject-2c7fe',
    storageBucket: 'ewsproject-2c7fe.appspot.com',
    messagingSenderId: '1082461674219',
    appId: '1:1082461674219:web:b1580d6c438c7f47fa3cae'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });
export default firebase;
