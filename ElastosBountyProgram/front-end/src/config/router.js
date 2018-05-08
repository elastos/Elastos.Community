import HomePage from '@/module/page/home/Container';
import LoginPage from '@/module/page/login/Container';

export default [
	{
		path : '/',
		page : HomePage
	},
    {
        path : '/home',
        page : HomePage
    },
    {
        path : '/login',
        page : LoginPage
    }
];