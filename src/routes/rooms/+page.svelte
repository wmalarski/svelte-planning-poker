<script lang="ts">
	import { NavbarLayout } from '$lib/components/layouts/navbar-layout';

	import type { ActionData, PageData } from './$types';

	import CreateRoomForm from './create-room-form.svelte';
	import RoomsList from './rooms-list.svelte';

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
