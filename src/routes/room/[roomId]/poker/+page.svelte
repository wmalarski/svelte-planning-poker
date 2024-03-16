<script lang="ts">
	import { NavbarLayout } from '$lib/components/layouts/navbar-layout';

	export let data;
</script>

<NavbarLayout>
	<pre class="max-w-xl overflow-clip">{JSON.stringify(
			{
				session: data.session,
				room: data.room,
				player: data.player
			},
			null,
			2
		)}</pre>
</NavbarLayout>
