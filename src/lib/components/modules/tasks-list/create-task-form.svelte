<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { supabaseContext } from '$lib/contexts/supabase';
	import { insertTask } from '$lib/services/tasks';
	import type { EventHandler } from 'svelte/elements';

	type Props = {
		roomId: string;
	};

	const { roomId }: Props = $props();

	const supabase = supabaseContext.get();

	const onSubmit: EventHandler<SubmitEvent, HTMLFormElement> = async (event) => {
		event.preventDefault();

		const form = new FormData(event.currentTarget);
		const content = form.get('content') as string;

		await insertTask({ content, roomId, supabase: $supabase });
	};
</script>

<form on:submit={onSubmit}>
	<fieldset>
		<Label for="content">Content</Label>
		<Input name="content" id="content" type="text" />
	</fieldset>
	<Button class="w-full" type="submit">Add</Button>
</form>
