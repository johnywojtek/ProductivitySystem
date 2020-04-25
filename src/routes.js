import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const DashboardDefault = React.lazy(() => import('./Demo/Dashboard/Default'));
const Planner = React.lazy(() => import('./Pages/Main/Planner'));
const Mission = React.lazy(() => import('./Pages/Main/Mission'));
const Main = React.lazy(() => import('./Pages/Main'));
const WeekPlan = React.lazy(() => import('./Pages/Main/WeekPlan'));
const CurrentTask = React.lazy(() => import('./Pages/Main/CurrentTask'));
const DaySummary = React.lazy(() => import('./Pages/Main/DaySummary'));

const UIBasicButton = React.lazy(() =>
    import('./Demo/UIElements/Basic/Button')
);
const UIBasicBadges = React.lazy(() =>
    import('./Demo/UIElements/Basic/Badges')
);
const UIBasicBreadcrumbPagination = React.lazy(() =>
    import('./Demo/UIElements/Basic/BreadcrumbPagination')
);

const UIBasicCollapse = React.lazy(() =>
    import('./Demo/UIElements/Basic/Collapse')
);
const UIBasicTabsPills = React.lazy(() =>
    import('./Demo/UIElements/Basic/TabsPills')
);
const UIBasicBasicTypography = React.lazy(() =>
    import('./Demo/UIElements/Basic/Typography')
);

const FormsElements = React.lazy(() => import('./Demo/Forms/FormsElements'));

const BootstrapTable = React.lazy(() => import('./Demo/Tables/BootstrapTable'));

const Nvd3Chart = React.lazy(() => import('./Demo/Charts/Nvd3Chart/index'));

const GoogleMap = React.lazy(() => import('./Demo/Maps/GoogleMap/index'));

const OtherSamplePage = React.lazy(() => import('./Demo/Other/SamplePage'));
const OtherDocs = React.lazy(() => import('./Demo/Other/Docs'));

const routes = [
    {
        path: '/dashboard/default',
        exact: true,
        name: 'Default',
        component: DashboardDefault,
    },
    {
        path: '/week-plan',
        exact: true,
        name: 'Week Plan',
        component: WeekPlan,
    },
    {
        path: '/current-task',
        exact: true,
        name: 'current Task',
        component: CurrentTask,
    },
    {
        path: '/mission',
        exact: true,
        name: 'Mission',
        component: Mission,
    },
    {
        path: '/planner',
        exact: true,
        name: 'Planner ',
        component: Planner,
    },
    {
        path: '/day-summary',
        exact: true,
        name: 'Day summary',
        component: DaySummary,
    },

    {
        path: '/main',
        exact: true,
        name: 'Main',
        component: Main,
    },
    {
        path: '/basic/button',
        exact: true,
        name: 'Basic Button',
        component: UIBasicButton,
    },
    {
        path: '/basic/badges',
        exact: true,
        name: 'Basic Badges',
        component: UIBasicBadges,
    },
    {
        path: '/basic/breadcrumb-paging',
        exact: true,
        name: 'Basic Breadcrumb Pagination',
        component: UIBasicBreadcrumbPagination,
    },
    {
        path: '/basic/collapse',
        exact: true,
        name: 'Basic Collapse',
        component: UIBasicCollapse,
    },
    {
        path: '/basic/tabs-pills',
        exact: true,
        name: 'Basic Tabs & Pills',
        component: UIBasicTabsPills,
    },
    {
        path: '/basic/typography',
        exact: true,
        name: 'Basic Typography',
        component: UIBasicBasicTypography,
    },
    {
        path: '/forms/form-basic',
        exact: true,
        name: 'Forms Elements',
        component: FormsElements,
    },
    {
        path: '/tables/bootstrap',
        exact: true,
        name: 'Bootstrap Table',
        component: BootstrapTable,
    },
    {
        path: '/charts/nvd3',
        exact: true,
        name: 'Nvd3 Chart',
        component: Nvd3Chart,
    },
    {
        path: '/maps/google-map',
        exact: true,
        name: 'Google Map',
        component: GoogleMap,
    },
    {
        path: '/sample-page',
        exact: true,
        name: 'Sample Page',
        component: OtherSamplePage,
    },
    { path: '/docs', exact: true, name: 'Documentation', component: OtherDocs },
];

export default routes;
