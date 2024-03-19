<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { cn } from '$lib/components/ui/utils.js';
	import * as FormPrimitive from 'formsnap';

	type $$Props = HTMLAttributes<HTMLSpanElement>;
	let className: null | string | undefined = undefined;
	export { className as class };
</script>

<FormPrimitive.Description
	class={cn('text-sm text-muted-foreground', className)}
	{...$$restProps}
	let:descriptionAttrs
>
	<slot {descriptionAttrs} />
</FormPrimitive.Description>
