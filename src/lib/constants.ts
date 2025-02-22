import MdiEmailOutline from '~icons/mdi/email-outline';
import MdiKeyOutline from '~icons/mdi/key-outline';
import MdiAccountRemove from '~icons/mdi/account-remove';

export const pageTitles: Record<string, string> = {
	'/login': 'Log In',
	'/signup': 'Sign Up',
	'/settings': 'Settings',
	'/settings/change-email': 'Change Email',
	'/settings/change-password': 'Change Password',
	'/settings/delete-account': 'Delete Account',
	'/create': 'Create',
	'/notifications': 'Notifications'
};

export const accountSettings = [
	{
		name: 'Change Password',
		description: 'Update your password regularly to keep your account secure.',
		pathName: '/settings/change-password',
		icon: MdiKeyOutline
	},
	{
		name: 'Change Email',
		description: 'Ensure your email address is up to date to receive important notifications.',
		pathName: '/settings/change-email',
		icon: MdiEmailOutline
	},
	{
		name: 'Delete Account',
		description: 'Permanently delete your account.',
		pathName: '/settings/delete-account',
		icon: MdiAccountRemove
	}
];
