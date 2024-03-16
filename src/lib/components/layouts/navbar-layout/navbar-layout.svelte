<script>
	import { paths } from '$lib/utils/paths';
</script>

<header class="w-full flex justify-between p-4 border-b-[1px]">
	<h1 class="text-3xl font-semibold">
		<a href={paths.home}>Planning poker</a>
	</h1>
</header>
<main class="max-w-5xl px-2 py-8 mx-auto">
	<slot />
</main>
