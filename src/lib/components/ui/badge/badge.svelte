<script lang="ts">
	import { cn } from '$lib/components/ui/utils.js';

	import { type Variant, badgeVariants } from './index.js';

	let className: null | string | undefined = undefined;
	export let href: string | undefined = undefined;
	export let variant: Variant = 'default';
	export { className as class };
</script>

<svelte:element
	this={href ? 'a' : 'span'}
	class={cn(badgeVariants({ className, variant }))}
	{href}
	{...$$restProps}
>
	<slot />
</svelte:element>
