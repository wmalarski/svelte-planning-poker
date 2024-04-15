<script lang="ts">
	import type { PlayerState } from '$lib/types/models';

	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';

	type Props = {
		onChange: (spectator: boolean) => void;
		player: PlayerState;
	};

	const { onChange, player }: Props = $props();

	const onCheckedChange = (checked: boolean | string) => {
		onChange(Boolean(checked));
	};
</script>

<div>
	<Checkbox checked={player.spectator} id="spectator" {onCheckedChange} />
	<Label for="spectator">Spectator</Label>
</div>
