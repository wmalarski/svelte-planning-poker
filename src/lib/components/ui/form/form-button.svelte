<script lang="ts">
	import * as Button from '$lib/components/ui/button/index.js';

	type $$Props = Button.Props;
	type $$Events = Button.Events;
</script>

<Button.Root on:click on:keydown type="submit" {...$$restProps}>
	<slot />
</Button.Root>
