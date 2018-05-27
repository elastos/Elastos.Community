import HomePage from '@/module/page/home/Container'
import SocialPage from '@/module/page/social/Container'
import DeveloperPage from '@/module/page/developer/Container'
import LeaderPage from '@/module/page/leader/Container'

// this is the leaders link in the header
import DirectoryPage from '@/module/page/directory/Container'
import CommunityPage from '@/module/page/community/Container'

import TeamsPage from '@/module/page/teams/Container'
import TasksPage from '@/module/page/tasks/Container'

import LoginPage from '@/module/page/login/Container'
import RegisterPage from '@/module/page/register/Container'

import ProfilePage from '@/module/page/profile/Container'

import AdminUsersPage from '@/module/page/admin/users/Container'
import AdminTasksPage from '@/module/page/admin/tasks/Container'

import CountryCommunitiesPage from '@/module/page/admin/community/CountryCommunities/Container'
import CommunityDetailPage from '@/module/page/admin/community/CommunityDetail/Container'

import TaskCreatePage from '@/module/page/task_create/Container'

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
        path: '/social',
        page: SocialPage
    },
    {
        path: '/developer',
        page: DeveloperPage
    },
    {
        path: '/leader',
        page: LeaderPage
    },
    {
        path: '/directory',
        page: DirectoryPage
    },
    {
        path: '/community',
        page: CommunityPage
    },
    {
        path: '/teams',
        page: TeamsPage
    },
    {
        path: '/tasks',
        page: TasksPage
    },
    {
        path: '/task-create',
        page: TaskCreatePage
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
        path: '/profile',
        page: ProfilePage
    },
    {
        path: '/admin/users',
        page: AdminUsersPage
    },
    {
        path: '/admin/tasks',
        page: AdminTasksPage
    },
    {
        path: '/admin/community',
        page: CountryCommunitiesPage
    },
    {
        path: '/admin/community/country/:country',
        page: CountryCommunitiesPage
    },
    {
        path: '/admin/community/:community/country/:country',
        page: CommunityDetailPage
    },
    {
        path: '/admin/community/:community/country/:country/region/:region',
        page: CommunityDetailPage
    },
    {
        page: NotFound
    }
]
