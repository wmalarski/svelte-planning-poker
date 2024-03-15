<script lang="ts">
	import type { SuperValidated } from 'sveltekit-superforms';
	import SignUpForm from './sign-up-form.svelte';
	import type { Output } from 'valibot';
	import type { FormSchema } from './schema';

	export let data;

	let form = data.form;
</script>

<SignUpForm data={form} />
