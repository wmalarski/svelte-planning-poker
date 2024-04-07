<script lang="ts">
	import type { PlayerState } from '$lib/types/models';
	import type { EventHandler } from 'svelte/elements';

	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { updatePlayer } from '$lib/services/players';

	type Props = {
		player: PlayerState;
		onChange: (name: string) => void;
	};

	const { player, onChange }: Props = $props();

	let isEditing = $state(false);

	const onSubmit: EventHandler<SubmitEvent, HTMLFormElement> = async (
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
		<Input value={player.name} readonly={!isEditing} id="name" name="name" type="text" />
	</fieldset>
	{#if isEditing}
		<Button type="reset" onclick={onResetClick}>Reset</Button>
		<Button type="submit">Save</Button>
	{:else}
		<Button type="button" onclick={onEditClick}>Edit</Button>
	{/if}
</form>
