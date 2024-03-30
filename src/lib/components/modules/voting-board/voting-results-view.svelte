<script lang="ts">
	import type { TaskRow } from '$lib/types/models';

	type Props = {
		task: TaskRow;
	};
	
	const { task }: Props = $props();
</script>

<pre>{JSON.stringify(task, null, 2)}</pre>