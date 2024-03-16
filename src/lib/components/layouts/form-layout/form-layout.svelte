<script>
	import { paths } from '$lib/utils/paths';
</script>

<main class="max-w-xl px-2 py-8 mx-auto">
	<h1 class="py-6 text-3xl w-full text-center font-semibold">
		<a href={paths.home}>Planning poker</a>
	</h1>
	<slot />
</main>
