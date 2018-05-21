import HomePage from '@/module/page/home/Container'
import LoginPage from '@/module/page/login/Container'
import RegisterPage from '@/module/page/register/Container'
import AdminUsersPage from '@/module/page/admin/users/Container'
import AdminCommunityPage from '@/module/page/admin/community/Container'

import NotFound from '@/module/page/error/NotFound'

export default [
    {
        path: '/',
        page: HomePage
    },
    {
        path: '/home',
        page: HomePage
    },
    {
        path: '/login',
        page: LoginPage
    },
    {
        path: '/register',
        page: RegisterPage
    },
    {
        path: '/admin/users',
        page: AdminUsersPage
    },
    {
        path: '/admin/community',
        page: AdminCommunityPage
    },
    {
        path: '/admin/community/:country',
        page: AdminCommunityPage
    },
    {
        path: '/admin/community/:country/:region',
        page: AdminCommunityPage
    },
    {
        page: NotFound
    }
]
