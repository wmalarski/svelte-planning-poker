<script lang="ts">
	import { FormLayout } from '$lib/components/layouts/form-layout';

	import type { ActionData, PageData } from './$types';

	import SignInForm from './sign-in-form.svelte';

	type Props = {
		data: PageData;
		form: ActionData;
	};

	const { data, form }: Props = $props();
</script>

<FormLayout>
	<SignInForm data={data.form} message={form?.message} />
</FormLayout>
