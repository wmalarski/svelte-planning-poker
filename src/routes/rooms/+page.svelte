<script lang="ts">
	import CreateRoomForm from './create-room-form.svelte';
	import { FormLayout } from '$lib/components/layouts/form-layout';

	export let data;
	export let form;
</script>

<FormLayout>
	<CreateRoomForm data={data.form} message={form?.message} />
</FormLayout>
