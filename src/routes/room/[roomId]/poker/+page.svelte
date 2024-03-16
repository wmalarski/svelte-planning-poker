<script lang="ts">
	import { NavbarLayout } from '$lib/components/layouts/navbar-layout';
	import TasksList from './tasks-list.svelte';

	export let data;
	export let form;
</script>

<NavbarLayout>
	<TasksList
		tasks={data.tasks}
		form={data.addTaskForm}
		errorMessage={form?.message}
		room={data.room}
	/>
	<pre class="max-w-xl overflow-clip">
		{JSON.stringify({ session: data.session, room: data.room, player: data.player }, null, 2)}
	</pre>
</NavbarLayout>
