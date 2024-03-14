<script lang="ts">
	import { Input } from '$lib/components/ui/input';

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);
</script>

<Input />
