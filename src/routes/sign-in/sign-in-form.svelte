<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import type { Output } from 'valibot';
	import { formSchema, type FormSchema } from './schema';
	import { valibotClient } from 'sveltekit-superforms/adapters';
	import { paths } from '$lib/utils/paths';

	type Props = {
		data: SuperValidated<Output<FormSchema>>;
		message: string | undefined;
	};

	const { data, message }: Props = $props();

	const form = superForm(data, { validators: valibotClient(formSchema) });

	const { form: formData, enhance, submitting } = form;
</script>

<Card.Root>
	<form method="POST" use:enhance>
		<Card.Header class="space-y-1">
			<Card.Title tag="h2" class="text-2xl">Sign In</Card.Title>
			<Card.Description>Sign in to create poker planning room</Card.Description>
		</Card.Header>
		<Card.Content class="grid gap-4">
			{#if message}
				<span class="text-sm font-medium text-destructive">{message}</span>
			{/if}

			<Form.Field {form} name="email">
				<Form.Control let:attrs>
					<Form.Label>Email</Form.Label>
					<Input {...attrs} bind:value={$formData.email} type="email" placeholder="m@example.com" />
				</Form.Control>
				<Form.Description />
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="password">
				<Form.Control let:attrs>
					<Form.Label>Password</Form.Label>
					<Input {...attrs} bind:value={$formData.password} type="password" />
				</Form.Control>
				<Form.Description />
				<Form.FieldErrors />
			</Form.Field>
		</Card.Content>
		<Card.Footer class="flex flex-col gap-4">
			<Button disabled={$submitting} isLoading={$submitting} class="w-full" type="submit">
				Sign In
			</Button>
			<a class="text-sm" href={paths.signUp}>Sign Up</a>
		</Card.Footer>
	</form>
</Card.Root>
