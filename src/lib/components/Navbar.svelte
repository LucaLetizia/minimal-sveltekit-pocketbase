<script lang="ts">
	import MdiMoonAndStars from '~icons/mdi/moon-and-stars';
	import MdiWhiteBalanceSunny from '~icons/mdi/white-balance-sunny';
	import MdiCogOutline from '~icons/mdi/cog-outline';
	import MdiNotificationsNone from '~icons/mdi/notifications-none';
	import MdiAdd from '~icons/mdi/add';
	import MdiLogout from '~icons/mdi/logout';

	import { getThemeState } from '$lib/states/theme.svelte';
	import { getPocketBaseInstance } from '$lib/states/pocketbase.svelte';
	import { getNotificationsState } from '$lib/states/notifications.svelte';
	import Drawer from './Drawer.svelte';
	import { accountSettings } from '$lib/constants';

	const themeState = getThemeState();
	const { pb } = getPocketBaseInstance();
	const notificationsState = getNotificationsState();

	let isDrawerOpen: boolean = $state(false);
	let isDropdownOpen: boolean = $state(false);
</script>

<div class="navbar sticky top-0 z-10 bg-base-100 mt-1">
	<div class="navbar-start">
		<a class="btn btn-ghost text-xl hidden lg:flex" href="/home">Home</a>
	</div>
	<div class="navbar-end">
		<a href="/create" class="btn btn-ghost btn-circle text-lg hidden lg:flex"><MdiAdd></MdiAdd></a>
		<div class="indicator">
			<details class="dropdown dropdown-end" bind:open={isDropdownOpen}>
				<summary class="btn btn-ghost btn-circle text-lg hidden lg:flex">
					<span
						class="indicator-item badge badge-primary"
						class:hidden={!notificationsState.notifications.find(
							(notification) => notification?.new
						)}
						>{notificationsState.notifications.filter((notification) => notification?.new)
							.length}</span
					><MdiNotificationsNone></MdiNotificationsNone></summary
				>
				<ul class="menu dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
					{#each notificationsState.notifications as notification, i}
						<li class="mb-2 p-2 rounded-lg transition">
							<button
								onclick={() => {
									isDropdownOpen = !isDropdownOpen;
									if (notification?.new) {
										notificationsState.updateNotificationStatus(i);
									}
								}}
								class="block"
								class:bg-base-200={notification?.new}
							>
								<h3 class="font-semibold text-sm">{notification?.title}</h3>
								<p class="text-xs text-gray-600">
									{notification?.description}
								</p>
								<span class="text-xs text-gray-500">{notification?.date}</span>
							</button>
						</li>
					{/each}

					<li>
						<a
							href="/notifications"
							class="btn btn-base-100 btn-sm mt-4"
							onclick={() => (isDropdownOpen = !isDropdownOpen)}>View all</a
						>
					</li>
				</ul>
			</details>
		</div>

		{#if themeState.theme === 'dark'}
			<button class="btn btn-ghost btn-circle text-lg" onclick={() => themeState.update('light')}>
				<MdiWhiteBalanceSunny></MdiWhiteBalanceSunny>
			</button>
		{:else}
			<button class="btn btn-ghost btn-circle text-lg" onclick={() => themeState.update('dark')}>
				<MdiMoonAndStars></MdiMoonAndStars>
			</button>
		{/if}
		<button
			class="avatar placeholder btn btn-ghost btn-circle"
			onclick={() => (isDrawerOpen = !isDrawerOpen)}
		>
			<div class="bg-neutral text-neutral-content w-12 rounded-full">
				<span>{pb?.authStore?.model?.username?.substring?.(0, 2).toUpperCase?.()}</span>
			</div>
		</button>
	</div>
</div>

{#snippet optionSnippet()}
	<li>
		<a href="/settings" onclick={() => (isDrawerOpen = !isDrawerOpen)}
			><MdiCogOutline></MdiCogOutline>Settings</a
		>
		<ul>
			{#each accountSettings as setting}
				{@const IconComponent = setting?.icon}
				<li>
					<a href={setting?.pathName} onclick={() => (isDrawerOpen = !isDrawerOpen)}
						><IconComponent></IconComponent>{setting?.name}</a
					>
				</li>
			{/each}
		</ul>
	</li>
	<li>
		<button
			onclick={() => {
				pb.authStore.clear();
			}}><MdiLogout></MdiLogout>Log Out</button
		>
	</li>
{/snippet}
{#snippet overlaySnippet()}
	<button
		aria-label="close sidebar"
		class="drawer-overlay"
		onclick={() => (isDrawerOpen = !isDrawerOpen)}
	></button>
{/snippet}

<Drawer id="profile-drawer" {isDrawerOpen} {optionSnippet} {overlaySnippet}></Drawer>
