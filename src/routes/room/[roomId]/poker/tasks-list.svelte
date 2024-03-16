<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import type { RoomRow, TaskRow } from '$lib/types/models';
	import type { SuperValidated } from 'sveltekit-superforms';
	import CreateTaskForm from './create-task-form.svelte';
	import type { FormSchema } from './schema';
	import type { Output } from 'valibot';
	import { sessionContext } from '$lib/contexts/session';

	export let room: RoomRow;
	export let tasks: TaskRow[];
	export let form: SuperValidated<Output<FormSchema>>;
	export let errorMessage: string | undefined;

	const session = sessionContext.get();
</script>

<Card.Root>
	<Card.Header class="space-y-1">
		<Card.Title tag="h2" class="text-2xl">List of tasks</Card.Title>
	</Card.Header>
	<Card.Content class="grid gap-4">
		{#if $session && $session.user.id === room.owner_id}
			<CreateTaskForm data={form} message={errorMessage} />
		{/if}
		<ul>
			{#each tasks as task}
				<li class="flex flex-col gap-2 p-3">
					<span>{task.id}</span>
					<strong class="text-lg">{task.content}</strong>
					<span>{task.finished}</span>
					<pre>{JSON.stringify(task.results, null, 2)}</pre>
				</li>
			{/each}
		</ul>
	</Card.Content>
</Card.Root>
