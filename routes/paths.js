// ----------------------------------------------------------------------

function path(root, sublink) {
    return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
    root: ROOTS_AUTH,
    login: path(ROOTS_AUTH, '/login'),
    loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
    register: path(ROOTS_AUTH, '/register'),
    registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
    resetPassword: path(ROOTS_AUTH, '/reset-password'),
    verify: path(ROOTS_AUTH, '/verify')
};

export const PATH_PAGE = {
    comingSoon: '/coming-soon',
    maintenance: '/maintenance',
    pricing: '/pricing',
    payment: '/payment',
    about: '/about-us',
    contact: '/contact-us',
    faqs: '/faqs',
    page404: '/404',
    page500: '/500',
    components: '/components'
};

export const PATH_DASHBOARD = {
    root: ROOTS_DASHBOARD,
    general: {
        app: path(ROOTS_DASHBOARD, '/app'),
        ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
        analytics: path(ROOTS_DASHBOARD, '/analytics'),
        banking: path(ROOTS_DASHBOARD, '/banking'),
        booking: path(ROOTS_DASHBOARD, '/booking')
    },

    chat: {
        root: path(ROOTS_DASHBOARD, '/chat'),
        new: path(ROOTS_DASHBOARD, '/chat/new'),
        conversation: path(ROOTS_DASHBOARD, '/chat/:conversationKey')
    },
    user: {
        root: path(ROOTS_DASHBOARD, '/user'),
        list: path(ROOTS_DASHBOARD, '/user/list'),
        account: path(ROOTS_DASHBOARD, '/user/account')
    },

    blog: {
        root: path(ROOTS_DASHBOARD, '/blog'),
        list: path(ROOTS_DASHBOARD, '/blog/list'),
        // posts: path(ROOTS_DASHBOARD, '/blog/posts'),
        // post: path(ROOTS_DASHBOARD, '/blog/post/:title'),
        // postById: path(ROOTS_DASHBOARD, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
        newPost: path(ROOTS_DASHBOARD, '/blog/create-post')
    },
    job: {
        root: path(ROOTS_DASHBOARD, '/job'),
        list: path(ROOTS_DASHBOARD, '/job/list'),
        newJob: path(ROOTS_DASHBOARD, '/job/create-job')
    },
    service: {
        root: path(ROOTS_DASHBOARD, '/service'),
        list: path(ROOTS_DASHBOARD, '/service/list'),
        newService: path(ROOTS_DASHBOARD, '/service/create-service')
    },
    team: {
        root: path(ROOTS_DASHBOARD, '/team'),
        list: path(ROOTS_DASHBOARD, '/team/list'),
        newTeamMembers: path(ROOTS_DASHBOARD, '/team/create-team')
    },

    faq: {
        root: path(ROOTS_DASHBOARD, '/faq'),
        list: path(ROOTS_DASHBOARD, '/faq/list'),
        newFAQ: path(ROOTS_DASHBOARD, '/faq/create-faq')
    },
    feedback: {
        root: path(ROOTS_DASHBOARD, '/feedback'),
        list: path(ROOTS_DASHBOARD, '/feedback/list'),
        new: path(ROOTS_DASHBOARD, '/feedback/create-feedback')
    },
    project: {
        root: path(ROOTS_DASHBOARD, '/project'),
        list: path(ROOTS_DASHBOARD, '/project/list'),
        new: path(ROOTS_DASHBOARD, '/project/create-project')
    },
};
