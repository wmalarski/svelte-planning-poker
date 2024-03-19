<script lang="ts">
	import { FormLayout } from '$lib/components/layouts/form-layout';
	import * as Card from '$lib/components/ui/card';
	import { paths } from '$lib/utils/paths';
</script>

<FormLayout>
	<Card.Root>
		<Card.Header class="space-y-1">
			<Card.Title class="text-2xl" tag="h2">Success</Card.Title>
		</Card.Header>
		<Card.Content class="grid gap-4">
			Congratulations! your account has been successfully created
		</Card.Content>
		<Card.Footer class="flex flex-col gap-4">
			<a class="text-sm" href={paths.signIn}>Sign In</a>
		</Card.Footer>
	</Card.Root>
</FormLayout>
