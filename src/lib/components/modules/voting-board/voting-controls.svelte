<script lang="ts">
	import { Button } from '$lib/components/ui/button';
    import { supabaseContext } from '$lib/contexts/supabase';
    import { updateTask } from '$lib/services/tasks';

	type Props = {
        taskId: string;
        isVoting: boolean;
        onNextVoteClick: () => void
	};
	
	const { taskId, isVoting, onNextVoteClick }: Props = $props();

    const supabaseGetter = supabaseContext.get();

    const onEndVoteClick = () => {
        updateTask({
            supabase: supabaseGetter(),
            taskId,
            finished: true, 
        });
    } 
</script>

<div>
    {#if isVoting}
        <Button onclick={onEndVoteClick}>
            End voting
        </Button>
    {:else}
        <Button onclick={onNextVoteClick}>
            Next vote
        </Button>
    {/if}
</div>