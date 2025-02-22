<script lang="ts">
	import MdiHouse from '~icons/mdi/house';
	import MdiHouseOutline from '~icons/mdi/house-outline';
	import MdiNotifications from '~icons/mdi/notifications';
	import MdiNotificationsNone from '~icons/mdi/notifications-none';
	import MdiAdd from '~icons/mdi/add';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { getNotificationsState } from '$lib/states/notifications.svelte';

	const notificationsState = getNotificationsState();

	const tabs = [
		{
			title: 'Home',
			icon: MdiHouseOutline,
			iconSelected: MdiHouse,
			pathName: '/home'
		},
		{
			title: 'Create',
			icon: MdiAdd,
			pathName: '/create'
		},
		{
			title: 'Notifications',
			icon: MdiNotificationsNone,
			iconSelected: MdiNotifications,
			pathName: '/notifications',
			snippet: notificationsTab
		}
	];
	let selectedTab = $state(-1);
	$effect(() => {
		const currentTab = tabs.findIndex((tab) => tab.pathName === page?.url?.pathname);
		selectedTab = currentTab !== -1 ? currentTab : -1; // Default to -1 if no match is found
	});
</script>

{#snippet notificationsTab()}
	{@const tab = tabs.find((t) => t?.title === 'Notifications')}
	{@const tabIndex = tabs.findIndex((t) => t?.title === 'Notifications')}
	{@const IconComponent =
		selectedTab === tabIndex && tab?.iconSelected ? tab?.iconSelected : tab?.icon}

	<div class="indicator">
		<span
			class="badge indicator-item badge-primary"
			class:hidden={!notificationsState.notifications.find((notification) => notification?.new)}
			>{notificationsState.notifications.filter((notification) => notification?.new).length}</span
		>
		<IconComponent></IconComponent>
	</div>
	<span class="text-xs">Notifications</span>
{/snippet}

<div class="btm-nav lg:hidden">
	{#each tabs as tab}
		<button
			class:active={selectedTab === tabs.indexOf(tab)}
			class="focus:bg-base-200"
			onclick={async () => {
				selectedTab = tabs.indexOf(tab);
				await goto(tab.pathName);
			}}
		>
			{#if tab?.snippet}
				<!-- load from snippet if available -->
				{@render tab.snippet()}
			{:else}
				{@const IconComponent =
					selectedTab === tabs?.indexOf?.(tab) && tab?.iconSelected ? tab.iconSelected : tab.icon}
				<IconComponent></IconComponent>
				<span class="text-xs">{tab.title}</span>
			{/if}
		</button>
	{/each}
</div>
