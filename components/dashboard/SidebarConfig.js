// routes
import { PATH_DASHBOARD } from 'routes/paths';
// components
import Label from '../Label';
import SvgIconStyle from '../SvgIconStyle';
import UserList from 'pages/dashboard/user/list';
import { ContextData } from 'contexts/dataProviderContext';
import { useContext } from 'react';
// import DashboardIcon from '@mui/icons-material/Dashboard';

// ----------------------------------------------------------------------
// const getRole = () => {
//     const { currentlyLoggedIn } = useContext(ContextData)
//     console.log('sidebar Config currentlyLoggedIn', currentlyLoggedIn);
// }
// getRole()

const getIcon = (name) => (
    <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
    blog: getIcon('ic_blog'),
    cart: getIcon('ic_cart'),
    job: getIcon('ic_booking'),
    chat: getIcon('ic_chat'),
    mail: getIcon('ic_mail'),
    user: getIcon('ic_user'),
    kanban: getIcon('ic_kanban'),
    banking: getIcon('ic_banking'),
    calendar: getIcon('ic_calendar'),
    ecommerce: getIcon('ic_ecommerce'),
    analytics: getIcon('ic_analytics'),
    dashboard: getIcon('ic_dashboard'),
};



const sidebarConfig = [
    // GENERAL
    // ----------------------------------------------------------------------
    // {
    //     subheader: 'general',
    //     items: [
    //         {
    //             title: 'app',
    //             path: PATH_DASHBOARD.general.app,
    //             icon: ICONS.dashboard,
    //             role: ['admin', 'user', 'super admin'],
    //         },
    //         { title: 'analytics', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
    //     ]
    // },

    // MANAGEMENT  => ['super admin', 'admin']
    // ----------------------------------------------------------------------
    {
        subheader: 'management',
        mainRole: ['super admin', 'admin'],
        items: [
            // MANAGEMENT : USER
            {
                title: 'user',
                path: PATH_DASHBOARD.user.root,
                icon: ICONS.user,

                children: [
                    {
                        title: 'list', path: PATH_DASHBOARD.user.list
                    },
                    { title: 'account', path: PATH_DASHBOARD.user.account }
                ]
            },
            // MANAGEMENT : BLOG
            {
                title: 'blog',
                path: PATH_DASHBOARD.blog.root,
                icon: ICONS.blog,
                children: [
                    { title: 'list', path: PATH_DASHBOARD.blog.list },
                    { title: 'create post', path: PATH_DASHBOARD.blog.newPost, }
                ]
            },
            // MANAGEMENT : JOB
            {
                title: 'job',
                path: PATH_DASHBOARD.job.root,
                icon: ICONS.job,
                children: [
                    { title: 'list', path: PATH_DASHBOARD.job.list },
                    { title: 'create job', path: PATH_DASHBOARD.job.newJob }
                ]
            },
            // MANAGEMENT : SERVICES
            {
                title: 'services',
                path: PATH_DASHBOARD.service.root,
                icon: ICONS.job,
                children: [
                    { title: 'list', path: PATH_DASHBOARD.service.list },
                    { title: 'create service', path: PATH_DASHBOARD.service.newService }
                ]
            },
            // MANAGEMENT : PROJECTS
            {
                title: 'projects',
                path: PATH_DASHBOARD.project.root,
                icon: ICONS.job,
                children: [
                    { title: 'list', path: PATH_DASHBOARD.project.list },
                    { title: 'create project', path: PATH_DASHBOARD.project.new }
                ]
            },
            // MANAGEMENT : TEAM MEMBERS
            {
                title: 'team members',
                path: PATH_DASHBOARD.team.root,
                icon: ICONS.job,
                children: [
                    { title: 'list', path: PATH_DASHBOARD.team.list },
                    { title: 'create team members', path: PATH_DASHBOARD.team.newTeamMembers }
                ]
            },
            // MANAGEMENT : Feedback Sections
            {
                title: 'feedback',
                path: PATH_DASHBOARD.feedback.root,
                icon: ICONS.job,
                children: [
                    { title: 'list', path: PATH_DASHBOARD.feedback.list },
                    { title: 'create feedback', path: PATH_DASHBOARD.feedback.new }
                ]
            },

        ]
    },
    // MANAGEMENT  => ['super admin', 'admin', 'user']
    // ----------------------------------------------------------------------
    {
        subheader: 'management',
        mainRole: ['user'],
        items: [
            // MANAGEMENT : USER
            {
                title: 'user',
                path: PATH_DASHBOARD.user.root,
                icon: ICONS.user,

                children: [
                    {
                        title: 'list', path: PATH_DASHBOARD.user.list
                    },
                    { title: 'account', path: PATH_DASHBOARD.user.account }
                ]
            },

        ]
    },

    // APP
    // ----------------------------------------------------------------------
    {
        subheader: 'app',
        mainRole: ['super admin', 'admin'],
        items: [

            // { title: 'chat', path: PATH_DASHBOARD.chat.root, icon: ICONS.chat },
            // MANAGEMENT : FAQ Sections
            {
                title: 'faq section',
                path: PATH_DASHBOARD.faq.root,
                icon: ICONS.job,
                children: [
                    { title: 'list', path: PATH_DASHBOARD.faq.list },
                    { title: 'create faq', path: PATH_DASHBOARD.faq.newFAQ }
                ]
            },


        ]
    },

];

export default sidebarConfig;
