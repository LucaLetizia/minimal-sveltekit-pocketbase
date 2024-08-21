import { getContext, setContext } from 'svelte';

const getNotifications = () => {
	//your logic to retrieve notifications here
	const notifications = [
		{
			title: 'New comment on your post',
			description: 'Someone commented on your recent post about sharks.',
			date: 'August 10, 2024',
			new: false
		},
		{
			title: 'Delivery update',
			description: 'Your ice cream is on the way.',
			date: 'August 16, 2024',
			new: true
		}
	];

	return notifications;
};

export class NotificationsState {
	notifications = $state(getNotifications());

	update() {
		this.notifications = getNotifications();
	}
	updateNotificationStatus(index: number) {
		this.notifications[index].new = !this.notifications[index].new;
	}
}

const NOTIFICATIONS_KEY = Symbol('NOTIFICATIONS');

export function setNotificationsState() {
	return setContext(NOTIFICATIONS_KEY, new NotificationsState());
}

export function getNotificationsState() {
	return getContext<ReturnType<typeof setNotificationsState>>(NOTIFICATIONS_KEY);
}
