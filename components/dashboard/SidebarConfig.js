// routes
import { PATH_DASHBOARD } from 'routes/paths';
// components
import SvgIconStyle from '../SvgIconStyle';


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
    // MANAGEMENT  => ['super admin', 'admin']
    // ----------------------------------------------------------------------
    {
        subheader: 'management',
        mainRole: ['super admin', 'admin'],
        items: [
            // MANAGEMENT : CATEGORY
            {
                title: 'Category',
                path: PATH_DASHBOARD.category.root,
                icon: ICONS.kanban,
                children: [
                    { title: 'list', path: PATH_DASHBOARD.category.list },
                    { title: 'new category', path: PATH_DASHBOARD.category.newCategory, }
                ]
            },
            // MANAGEMENT : BLOG
            {
                title: 'Article',
                path: PATH_DASHBOARD.blog.root,
                icon: ICONS.blog,
                children: [
                    { title: 'list', path: PATH_DASHBOARD.blog.list },
                    { title: 'create post', path: PATH_DASHBOARD.blog.newPost, }
                ]
            },
            // MANAGEMENT : SETTINGS
            {
                title: 'Settings',
                path: PATH_DASHBOARD.blog.root,
                icon: ICONS.dashboard,
                children: [
                    { title: 'website name', path: PATH_DASHBOARD.settings.websiteName },
                    { title: 'Logo', path: PATH_DASHBOARD.settings.logo, },
                    { title: 'fav icon', path: PATH_DASHBOARD.settings.favicon, }
                ]
            },




        ]
    },



];

export default sidebarConfig;
