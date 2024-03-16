<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import type { Output } from 'valibot';
	import { formSchema, type FormSchema } from './schema';
	import { valibotClient } from 'sveltekit-superforms/adapters';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';

	export let data: SuperValidated<Output<FormSchema>>;
	export let message: string | undefined;

	const form = superForm(data, { validators: valibotClient(formSchema) });

	const { form: formData, enhance } = form;
</script>

<Card.Root>
	<form method="POST" use:enhance>
		<Card.Header class="space-y-1">
			<Card.Title tag="h2" class="text-2xl">Join</Card.Title>
			<Card.Description>Join planning poker room</Card.Description>
		</Card.Header>
		<Card.Content class="grid gap-4">
			{#if message}
				<span class="text-sm font-medium text-destructive">{message}</span>
			{/if}

			<Form.Field {form} name="name">
				<Form.Control let:attrs>
					<Form.Label>Name</Form.Label>
					<Input {...attrs} bind:value={$formData.name} type="text" />
				</Form.Control>
				<Form.Description />
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="spectator">
				<Form.Control let:attrs>
					<div class="flex items-center space-x-2">
						<Checkbox {...attrs} bind:checked={$formData.spectator} />
						<Form.Label>View room as spectator</Form.Label>
					</div>
				</Form.Control>
				<Form.Description />
				<Form.FieldErrors />
			</Form.Field>
		</Card.Content>
		<Card.Footer>
			<Button class="w-full" type="submit">Enter</Button>
		</Card.Footer>
	</form>
</Card.Root>
