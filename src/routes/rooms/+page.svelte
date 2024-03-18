<script lang="ts">
	import CreateRoomForm from './create-room-form.svelte';
	import { NavbarLayout } from '$lib/components/layouts/navbar-layout';
	import RoomsList from './rooms-list.svelte';
	import type { PageData, ActionData } from './$types';

	type Props = {
		data: PageData;
		form: ActionData;
	};

	const { data, form }: Props = $props();
</script>

<NavbarLayout>
	<CreateRoomForm data={data.form} message={form?.message} />
	<RoomsList rooms={data.rooms} />
</NavbarLayout>
