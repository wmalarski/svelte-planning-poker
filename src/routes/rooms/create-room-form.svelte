<script lang="ts">
	import type { Output } from 'valibot';

	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { type SuperValidated, superForm } from 'sveltekit-superforms';
	import { valibotClient } from 'sveltekit-superforms/adapters';

	import { type FormSchema, formSchema } from './schema';

	type Props = {
		data: SuperValidated<Output<FormSchema>>;
		message: string | undefined;
	};

	const { data, message }: Props = $props();

	const form = superForm(data, { validators: valibotClient(formSchema) });

	const { enhance, form: formData, submitting } = form;
</script>

<Card.Root>
	<form method="POST" use:enhance>
		<Card.Header class="space-y-1">
			<Card.Title class="text-2xl" tag="h2">Create Room</Card.Title>
			<Card.Description>Create planning poker room</Card.Description>
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

			<Form.Field {form} name="description">
				<Form.Control let:attrs>
					<Form.Label>Description</Form.Label>
					<Input {...attrs} bind:value={$formData.description} type="text" />
				</Form.Control>
				<Form.Description />
				<Form.FieldErrors />
			</Form.Field>
		</Card.Content>
		<Card.Footer>
			<Button
				class="w-full"
				disabled={$submitting}
				isLoading={$submitting}
				type="submit"
			>
				Create room
			</Button>
		</Card.Footer>
	</form>
</Card.Root>
