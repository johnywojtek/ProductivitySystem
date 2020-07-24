import React, { useEffect, Suspense } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import Loadable from 'react-loadable';
import moment from 'moment';
import '../../node_modules/font-awesome/scss/font-awesome.scss';

import Loader from './layout/Loader';
import Aux from '../hoc/_Aux';
import ScrollToTop from './layout/ScrollToTop';
import routes from '../route';

const AdminLayout = Loadable({
    loader: () => import('./layout/AdminLayout'),
    loading: Loader,
});
const App = () => {
    const history = useHistory();

    useEffect(() => {
        const current_date = moment().format('DD/MM/YYYY');
        history.listen((location, action) => {
            // console.log(
            //     `The current URL is ${location.pathname}${location.search}${
            //         location.hash
            //     }`
            // );
            // console.log(`The last navigation action was ${action}`);
            // console.log(location.pathname); // check which is current pathname
            // localStorage.removeItem('day_created_date');

            if (
                //Dodać ifa czy jest zalogowany poniewaz powoduje blad gdy user sie wyloguje zawsze przenosi do /day-start
                location.pathname !== '/day-start' &&
                current_date !== localStorage.getItem('day_created_date')
            ) {
                history.push('/day-start');
            }
        });
        if (current_date !== localStorage.getItem('day_created_date')) {
            localStorage.removeItem('day_created_date');
            history.push('/day-start');
        }
    }, []);
    const menu = routes.map((route, index) => {
        return route.component ? (
            <Route
                key={index}
                path={route.path}
                exact={route.exact}
                name={route.name}
                render={(props) => <route.component {...props} />}
            />
        ) : null;
    });
    return (
        <Aux>
            <ScrollToTop>
                <Suspense fallback={<Loader />}>
                    <Switch>
                        {menu}
                        <Route path="/" component={AdminLayout} />
                    </Switch>
                </Suspense>
            </ScrollToTop>
        </Aux>
    );
};

export default App;
