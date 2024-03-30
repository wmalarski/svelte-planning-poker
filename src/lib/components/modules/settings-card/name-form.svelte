<script lang="ts">
	import type { EventHandler } from 'svelte/elements';

	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { supabaseContext } from '$lib/contexts/supabase';
	import { updatePlayer } from '$lib/services/players';
	import type { PlayerState } from '$lib/server/players';

	type Props = {
		player: PlayerState;
	};

	const { player }: Props = $props();

	let isEditing = $state(false)

	const onSubmit: EventHandler<SubmitEvent, HTMLFormElement> = async (
		event
	) => {
		event.preventDefault();

		const form = new FormData(event.currentTarget);
		const name = form.get('name') as string;

		await updatePlayer({ name, spectator: player.spectator });
	};
</script>

<form on:submit={onSubmit}>
	<fieldset>
		<Label for="name">Content</Label>
		<Input id="name" name="name" type="text" />
	</fieldset>
	<Button type="submit">Save</Button>
</form>
