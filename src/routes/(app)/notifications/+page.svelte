<script lang="ts">
	import { getNotificationsState } from '$lib/states/notifications.svelte';

	const notificationsState = getNotificationsState();
</script>

<div class="container mx-auto p-6">
	<div class="p-6 rounded-lg shadow-md bg-base-100">
		<h1 class="text-2xl font-bold mb-6">Sample Notifications Page</h1>

		{#each notificationsState.notifications as notification, i}
			<div
				role="button"
				tabindex={i}
				class="block p-4 rounded-lg hover:bg-base-200 transition relative cursor-default"
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
							class="indicator-item indicator-start badge badge-primary text-xs font-bold py-1 px-2 rounded-full"
							>New</span
						>
					</div>
				{/if}
				<div class="flex flex-col md:flex-row justify-between">
					<div>
						<h2 class="text-lg font-semibold">{notification.title}</h2>
						<p>{notification.description}</p>
					</div>
					<span
						class="text-gray-500 text-sm mt-2 md:mt-0 md:ml-4 self-end md:self-center whitespace-nowrap"
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
