<script lang="ts">
	import { FormLayout } from '$lib/components/layouts/form-layout';

	import type { ActionData, PageData } from './$types';

	import InviteForm from './invite-form.svelte';

	type Props = {
		data: PageData;
		form: ActionData;
	};

	const { data, form }: Props = $props();
</script>

<FormLayout>
	<InviteForm data={data.form} message={form?.message} room={data.room} />
</FormLayout>
