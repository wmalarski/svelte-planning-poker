<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import type { Output } from 'valibot';
	import { formSchema, type FormSchema } from './schema';
	import { valibotClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Output<FormSchema>>;
	export let message: string | undefined;

	const form = superForm(data, { validators: valibotClient(formSchema) });

	const { form: formData, enhance, submitting } = form;
</script>

<form method="POST" use:enhance action="?/createTask">
	{#if message}
		<span class="text-sm font-medium text-destructive">{message}</span>
	{/if}

	<Form.Field {form} name="content">
		<Form.Control let:attrs>
			<Form.Label>Content</Form.Label>
			<Input {...attrs} bind:value={$formData.content} type="text" />
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>

	<Button disabled={$submitting} isLoading={$submitting} class="w-full" type="submit">Add</Button>
</form>
