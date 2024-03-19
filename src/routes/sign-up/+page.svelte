<script lang="ts">
	import { FormLayout } from '$lib/components/layouts/form-layout';

	import type { ActionData, PageData } from './$types';

	import SignUpForm from './sign-up-form.svelte';

	type Props = {
		data: PageData;
		form: ActionData;
	};

	const { data, form }: Props = $props();
</script>

<FormLayout>
	<SignUpForm data={data.form} message={form?.message} />
</FormLayout>
