<script lang="ts">
	import type { PlayerState } from '$lib/types/models';
	import type { EventHandler } from 'svelte/elements';

	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	type Props = {
		onChange: (name: string) => void;
		player: PlayerState;
	};

	const { onChange, player }: Props = $props();

	let isEditing = $state(false);

	const onSubmit: EventHandler<SubmitEvent, HTMLFormElement> = (
		event
	) => {
		event.preventDefault();

		const form = new FormData(event.currentTarget);
		const name = form.get('name') as string;

		onChange(name);
	};

	const onResetClick = () => {
		isEditing = false;
	};

	const onEditClick = () => {
		isEditing = true;
	};
</script>

<form onsubmit={onSubmit}>
	<fieldset>
		<Label for="name">Name</Label>
		<Input
			id="name"
			name="name"
			readonly={!isEditing}
			type="text"
			value={player.name}
		/>
	</fieldset>
	{#if isEditing}
		<Button onclick={onResetClick} type="reset">Reset</Button>
		<Button type="submit">Save</Button>
	{:else}
		<Button onclick={onEditClick} type="button">Edit</Button>
	{/if}
</form>
