<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { supabaseContext } from '$lib/contexts/supabase';
	import { deleteTask } from '$lib/services/tasks';
	import type { EventHandler } from 'svelte/elements';

	type Props = {
		taskId: string;
	};

	const { taskId }: Props = $props();

	const supabase = supabaseContext.get();

	const onSubmit: EventHandler<SubmitEvent, HTMLFormElement> = async (event) => {
		event.preventDefault();

		await deleteTask({ taskId, supabase: $supabase });
	};
</script>

<form on:submit={onSubmit}>
	<Button variant="secondary" type="submit">Remove</Button>
</form>
