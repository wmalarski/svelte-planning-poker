<script lang="ts">
	import InviteForm from './invite-form.svelte';
	import { FormLayout } from '$lib/components/layouts/form-layout';

	export let data;
	export let form;
</script>

<FormLayout>
	<InviteForm data={data.form} message={form?.message} />
</FormLayout>
