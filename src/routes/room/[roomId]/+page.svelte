<script lang="ts">
	import InviteForm from './invite-form.svelte';
	import { FormLayout } from '$lib/components/layouts/form-layout';
	import type { PageData, ActionData } from './$types';

	type Props = {
		data: PageData;
		form: ActionData;
	};

	const { data, form }: Props = $props();
</script>

<FormLayout>
	<InviteForm data={data.form} message={form?.message} room={data.room} />
</FormLayout>
