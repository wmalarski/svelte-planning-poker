<script lang="ts">
	import SignInForm from './sign-in-form.svelte';
	import { FormLayout } from '$lib/components/layouts/form-layout';

	export let data;
	export let form;
</script>

<FormLayout>
	<SignInForm data={data.form} message={form?.message} />
</FormLayout>
