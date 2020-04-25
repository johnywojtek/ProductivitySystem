import React from 'react';

const SignUp1 = React.lazy(() => import('./Pages/Main/SignUp1'));
const Signin1 = React.lazy(() => import('./Pages/Main/SignIn1'));

const route = [
    {
        path: '/auth/signup-1',
        exact: true,
        name: 'Signup 1',
        component: SignUp1,
    },
    {
        path: '/auth/signin-1',
        exact: true,
        name: 'Signin 1',
        component: Signin1,
    },
];

export default route;
