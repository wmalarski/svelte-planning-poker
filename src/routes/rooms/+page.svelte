<script lang="ts">
	import CreateRoomForm from './create-room-form.svelte';
	import { NavbarLayout } from '$lib/components/layouts/navbar-layout';

	export let data;
	export let form;
</script>

<NavbarLayout>
	<CreateRoomForm data={data.form} message={form?.message} />
</NavbarLayout>
