<script lang="ts">
	import SignUpForm from './sign-up-form.svelte';
	import { FormLayout } from '$lib/components/layouts/form-layout';

	export let data;
	export let form;
</script>

<FormLayout>
	<SignUpForm data={data.form} message={form?.message} />
</FormLayout>
