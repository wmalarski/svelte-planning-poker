<script lang="ts">
	import SignUpForm from './sign-up-form.svelte';
	import { FormLayout } from '$lib/components/layouts/form-layout';
	import type { PageData, ActionData } from './$types';

	type Props = {
		data: PageData;
		form: ActionData;
	};

	const { data, form }: Props = $props();
</script>

<FormLayout>
	<SignUpForm data={data.form} message={form?.message} />
</FormLayout>
