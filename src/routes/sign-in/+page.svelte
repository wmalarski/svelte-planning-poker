<script lang="ts">
	import SignInForm from './sign-in-form.svelte';
	import { FormLayout } from '$lib/components/layouts/form-layout';
	import type { PageData, ActionData } from './$types';

	type Props = {
		data: PageData;
		form: ActionData;
	};

	const { data, form }: Props = $props();
</script>

<FormLayout>
	<SignInForm data={data.form} message={form?.message} />
</FormLayout>
