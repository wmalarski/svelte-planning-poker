<script lang="ts">
	import type { EventHandler } from 'svelte/elements';

	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { supabaseContext } from '$lib/contexts/supabase';
	import { insertTask } from '$lib/services/tasks';

	type Props = {
		roomId: string;
	};

	const { roomId }: Props = $props();

	const supabase = supabaseContext.get();

	const onSubmit: EventHandler<SubmitEvent, HTMLFormElement> = async (
		event
	) => {
		event.preventDefault();

		const form = new FormData(event.currentTarget);
		const content = form.get('content') as string;

		console.log('$supabase', supabase());

		await insertTask({ content, roomId, supabase: supabase() });
	};
</script>

<form on:submit={onSubmit}>
	<fieldset>
		<Label for="content">Content</Label>
		<Input id="content" name="content" type="text" />
	</fieldset>
	<Button class="w-full" type="submit">Add</Button>
</form>
