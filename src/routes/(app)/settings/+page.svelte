<script lang="ts">
	import MdiArrowRight from '~icons/mdi/arrow-right';
	import { accountSettings } from '$lib/constants';
</script>

<div class="container mx-auto p-6">
	<div class=" p-6 rounded-lg shadow-md bg-base-100">
		<h1 class="text-2xl font-bold mb-6">Settings</h1>
		{#each accountSettings as setting, i}
			<a
				class="block p-4 rounded-lg hover:bg-base-200 transition cursor-pointer"
				href={setting.pathName}
			>
				<div class="flex items-center justify-between">
					<div>
						<h2 class="text-lg font-semibold">{setting.name}</h2>
						<p>{setting.description}</p>
					</div>
					<span class="mt-2 md:mt-0 md:ml-4 self-end md:self-center whitespace-nowrap"
						><MdiArrowRight></MdiArrowRight></span
					>
				</div>
			</a>
			{#if i + 1 < accountSettings.length}
				<hr class="my-4" />
			{/if}
		{/each}
	</div>
</div>
