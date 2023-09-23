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
    blog: {
        root: path(ROOTS_DASHBOARD, '/blog'),
        list: path(ROOTS_DASHBOARD, '/blog/list'),
        newPost: path(ROOTS_DASHBOARD, '/blog/create-post')
    },
    category: {
        root: path(ROOTS_DASHBOARD, '/category'),
        list: path(ROOTS_DASHBOARD, '/category/list'),
        newCategory: path(ROOTS_DASHBOARD, '/category/new-category')
    },
    settings: {
        root: path(ROOTS_DASHBOARD, '/settings'),
        websiteName: path(ROOTS_DASHBOARD, '/settings/website-name'),
        logo: path(ROOTS_DASHBOARD, '/settings/logo'),
        favicon: path(ROOTS_DASHBOARD, '/settings/favicon'),
    },
    stuffing: {
        root: path(ROOTS_DASHBOARD, '/stuffing'),
        list: path(ROOTS_DASHBOARD, '/stuffing/list'),
        createStuff: path(ROOTS_DASHBOARD, '/stuffing/create-stuff'),
    },
    adPlacing: {
        root: path(ROOTS_DASHBOARD, '/ad-place'),
        createAd: path(ROOTS_DASHBOARD, '/stuffing/create-ad-place'),
    },
};
