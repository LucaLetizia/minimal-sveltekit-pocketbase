<script lang="ts">
	import { getNotificationsState } from '$lib/states/notifications.svelte';

	const notificationsState = getNotificationsState();
</script>

<div class="container mx-auto p-6">
	<div class="rounded-lg bg-base-100 p-6 shadow-md">
		<h1 class="mb-6 text-2xl font-bold">Sample Notifications Page</h1>

		{#each notificationsState.notifications as notification, i}
			<div
				role="button"
				tabindex={i}
				class="relative block cursor-default rounded-lg p-4 transition hover:bg-base-200"
				class:bg-base-200={notification?.new}
				onmouseover={() => {
					if (notification?.new) {
						notificationsState.updateNotificationStatus(i);
					}
				}}
				onfocus={() => {}}
			>
				{#if notification?.new}
					<div class="absolute -top-2 -left-2">
						<span
							class="indicator-item badge rounded-full badge-soft badge-sm px-2 py-1 text-xs font-bold indicator-start badge-primary"
							>New</span
						>
					</div>
				{/if}
				<div class="flex flex-col justify-between md:flex-row">
					<div>
						<h2 class="text-lg font-semibold">{notification.title}</h2>
						<p>{notification.description}</p>
					</div>
					<span
						class="mt-2 self-end text-sm whitespace-nowrap text-gray-500 md:mt-0 md:ml-4 md:self-center"
						>{notification.date}</span
					>
				</div>
			</div>
			{#if i + 1 < notificationsState.notifications.length}
				<hr class="my-4" />
			{/if}
		{/each}
	</div>
</div>
