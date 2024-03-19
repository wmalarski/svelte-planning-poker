<script lang="ts">
	import type { EventHandler } from 'svelte/elements';

	import { Button } from '$lib/components/ui/button';
	import { supabaseContext } from '$lib/contexts/supabase';
	import { deleteTask } from '$lib/services/tasks';

	type Props = {
		taskId: string;
	};

	const { taskId }: Props = $props();

	const supabase = supabaseContext.get();

	const onSubmit: EventHandler<SubmitEvent, HTMLFormElement> = async (
		event
	) => {
		event.preventDefault();

		await deleteTask({ supabase: supabase(), taskId });
	};
</script>

<form on:submit={onSubmit}>
	<Button type="submit" variant="secondary">Remove</Button>
</form>
