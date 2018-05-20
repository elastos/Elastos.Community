import HomePage from '@/module/page/home/Container'
import LoginPage from '@/module/page/login/Container'
import AdminUsersPage from '@/module/page/admin/users/Container'

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
        path: '/admin/users',
        page: AdminUsersPage
    },
    {
        page: NotFound
    }
]
