<script lang="ts">
	import type { RoomRow } from '$lib/types/models';
	import type { Output } from 'valibot';

	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { type SuperValidated, superForm } from 'sveltekit-superforms';
	import { valibotClient } from 'sveltekit-superforms/adapters';

	import { type FormSchema, formSchema } from './schema';

	type Props = {
		data: SuperValidated<Output<FormSchema>>;
		message: string | undefined;
		room: RoomRow;
	};

	const { data, message, room }: Props = $props();

	const form = superForm(data, { validators: valibotClient(formSchema) });

	const { enhance, form: formData, submitting } = form;
</script>

<Card.Root>
	<form method="POST" use:enhance>
		<Card.Header class="space-y-1">
			<Card.Title class="text-2xl" tag="h2">Join {room.name}</Card.Title>
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
			<Button
				class="w-full"
				disabled={$submitting}
				isLoading={$submitting}
				type="submit"
			>
				Enter
			</Button>
		</Card.Footer>
	</form>
</Card.Root>
