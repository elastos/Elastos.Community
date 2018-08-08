import LandingPage from '@/module/page/landing/Container'
import HomePage from '@/module/page/home/Container'
import SocialPage from '@/module/page/social/Container'
import DeveloperPage from '@/module/page/developer/Container'
import DeveloperLearnPage from '@/module/page/developer/learn/Container'
import DeveloperSearchPage from '@/module/page/developer/search/Container'
import LeaderPage from '@/module/page/leader/Container'

// this is the leaders link in the header
import DirectoryPage from '@/module/page/directory/Container'

import TeamsPage from '@/module/page/teams/Container'
import TasksPage from '@/module/page/tasks/Container'
import TaskDetailPage from '@/module/page/task_detail/Container'
import TaskApplicationPage from '@/module/page/task_application/Container'

import LoginPage from '@/module/page/login/Container'
import RegisterPage from '@/module/page/register/Container'
import ForgotPasswordPage from '@/module/page/forgot_password/Container'
import ResetPasswordPage from '@/module/page/reset_password/Container'

import HelpPage from '@/module/page/static/help/Container'
import FAQPage from '@/module/page/static/faq/Container'
import AboutPage from '@/module/page/static/about/Container'
import SlackPage from '@/module/page/static/slack/Container'
import EventsPage from '@/module/page/static/events/Container'
import EventPage from '@/module/page/static/details/Container'

import ProfileInfoPage from '@/module/page/profile/info/Container'
import ProfileTasksPage from '@/module/page/profile/tasks/Container'
import ProfileTaskDetailPage from '@/module/page/profile/task_detail/Container'
import ProfileTaskApplicationDetailPage from '@/module/page/profile/task_candidate_detail/Container'
import ProfileTeamsPage from '@/module/page/profile/teams/Container'
import ProfileTeamDetailPage from '@/module/page/profile/team_detail/Container'
import ProfileTeamCreatePage from '@/module/page/profile/team_create/Container'
import ProfileProjectsPage from '@/module/page/profile/projects/Container'
import ProfileSubmissionsPage from '@/module/page/profile/submissions/Container'
import ProfileCommunitiesPage from '@/module/page/profile/communities/Container'
import ProfileSubmissionDetailPage from '@/module/page/profile/submission_detail/Container'

import MemberPage from '@/module/page/member/Container'

import AdminUsersPage from '@/module/page/admin/users/Container'
import AdminProfileDetailPage from '@/module/page/admin/profile_detail/Container'
import AdminTasksPage from '@/module/page/admin/tasks/Container'
import AdminTaskDetailPage from '@/module/page/admin/task_detail/Container'
import AdminSubmissionsPage from '@/module/page/admin/submissions/Container'
import AdminSubmissionDetailPage from '@/module/page/admin/submission_detail/Container'
import AdminFormsPage from '@/module/page/admin/forms/Container'

import CountryCommunitiesPage from '@/module/page/admin/community/CountryCommunities/Container'
import CommunityDetailPage from '@/module/page/admin/community/CommunityDetail/Container'

import PublicCountryCommunitiesPage from '@/module/page/community/PublicCountryCommunities/Container'
import PublicCommunityDetailPage from '@/module/page/community/PublicCommunityDetail/Container'

import TaskCreatePage from '@/module/page/task_create/Container'

// internal forms
import FormOrganizerApp from '@/module/page/form_ext/organizer_app/Container'
import FormAnniversaryApp from '@/module/page/form_ext/anni2018_app/Container'
import FormAnniversaryVideo from '@/module/page/form_ext/anni2018_video/Container'


// external forms
import FormTraining1Page from '@/module/page/form_ext/training_1/Container'


// admin team page
import TeamListPage from '../module/page/admin/teams/TeamListPage';
import TeamDetailPage from '../module/page/admin/teams/TeamDetailPage';

import NotFound from '@/module/page/error/NotFound'

export default [
    {
        path: '/',
        page: LandingPage
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
        path: '/developer/learn',
        page: DeveloperLearnPage
    },
    {
        path: '/developer/search',
        page: DeveloperSearchPage
    },
    {
        path: '/developer/country/:country',
        page: DeveloperPage
    },
    {
        path: '/developer/country/:country/region/:region',
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
        path: '/teams',
        page: TeamsPage
    },
    {
        path: '/tasks',
        page: TasksPage
    },
    {
        path: '/task-detail/:taskId',
        page: TaskDetailPage
    },
    {
        path: '/task-app/:taskId/:applicantId',
        page: TaskApplicationPage
    },
    {
        path: '/task-create',
        page: TaskCreatePage
    },
    /*
    ********************************************************************************
    * Login/Register
    ********************************************************************************
      */
    {
        path: '/login',
        page: LoginPage
    },
    {
        path: '/register',
        page: RegisterPage
    },
    {
        path: '/forgot-password',
        page: ForgotPasswordPage
    },
    {
        path: '/reset-password',
        page: ResetPasswordPage
    },
    /*
    ********************************************************************************
    * Minor Pages
    ********************************************************************************
      */
    {
        path: '/help',
        page: HelpPage
    },
    {
        path: '/faq',
        page: FAQPage
    },
    {
        path: '/about',
        page: AboutPage
    },
    {
        path: '/slack',
        page: SlackPage
    },
    {
        path: '/events',
        page: EventsPage
    },
    {
        path: '/events/:eventId',
        page: EventPage
    },
    /*
    ********************************************************************************
    * Profile page
    ********************************************************************************
      */
    {
        path: '/profile/info',
        page: ProfileInfoPage
    },
    {
        path: '/profile/tasks',
        page: ProfileTasksPage
    },
    {
        path: '/profile/task-detail/:taskId',
        page: ProfileTaskDetailPage
    },
    {
        path: '/profile/task-app/:taskId/:applicantId',
        page: ProfileTaskApplicationDetailPage
    },
    {
        path: '/profile/projects',
        page: ProfileProjectsPage
    },
    {
        path: '/profile/teams',
        page: ProfileTeamsPage
    },
    {
        path : '/profile/teams/create',
        page : ProfileTeamCreatePage
    },
    {
        path : '/profile/teams/:teamId',
        page : ProfileTeamDetailPage
    },
    {
        path: '/profile/submissions',
        page: ProfileSubmissionsPage
    },
    {
        path: '/profile/communities',
        page: ProfileCommunitiesPage
    },
    {
        path: '/profile/submission-detail/:submissionId',
        page: ProfileSubmissionDetailPage
    },
    /*
    ********************************************************************************
    * External Forms
    ********************************************************************************
      */
    {
        path: '/form/training1',
        page: FormTraining1Page
    },
    /*
    ********************************************************************************
    * Internal Forms
    ********************************************************************************
      */
    {
        path: '/form/organizer',
        page: FormOrganizerApp
    },
    {
        path: '/form/anniversary2018',
        page: FormAnniversaryApp
    },
    {
        path: '/form/anniversaryVideo2018',
        page: FormAnniversaryVideo
    },
    /*
    ********************************************************************************
    * Users
    ********************************************************************************
      */
    {
        // public profile page
        path: '/member/:userId',
        page: MemberPage
    },
    /*
    ********************************************************************************
    * Admin
    ********************************************************************************
      */
    {
        path: '/admin/users',
        page: AdminUsersPage
    },
    {
        path: '/admin/tasks',
        page: AdminTasksPage
    },
    {
        path: '/admin/task-detail/:taskId',
        page: AdminTaskDetailPage
    },
    {
        path: '/admin/profile/:userId',
        page: AdminProfileDetailPage
    },
    {
        path: '/admin/submissions',
        page: AdminSubmissionsPage
    },
    {
        path: '/admin/forms',
        page: AdminFormsPage
    },
    {
        path: '/admin/submission-detail/:submissionId',
        page: AdminSubmissionDetailPage
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
    /*
    ********************************************************************************
    * Community
    ********************************************************************************
      */
    {
        path: '/community',
        page: PublicCountryCommunitiesPage
    },
    {
        path: '/community/country/:country',
        page: PublicCountryCommunitiesPage
    },
    {
        path: '/community/:community/country/:country',
        page: PublicCommunityDetailPage
    },
    {
        path: '/community/:community/country/:country/region/:region',
        page: PublicCommunityDetailPage
    },
    /*
    ********************************************************************************
    * TODO
    ********************************************************************************
      */
    {
        path : '/admin/teams',
        page : TeamListPage
    },
    {
        path : '/admin/teams/:teamId',
        page : TeamDetailPage
    },

    {
        page: NotFound
    }
]
