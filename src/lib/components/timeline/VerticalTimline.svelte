<script lang="ts">
    import { flip } from "svelte/animate";
    import type { timelineItem } from "./TimelineItem.svelte";

    interface IProps {
        highlighted_id: number | null;
        items: timelineItem[];
    }

    const props: IProps = $props();

    const sortedItems = $derived.by(() => {
        if (props.highlighted_id == null) return props.items;
        return [
            ...props.items.filter((item) => item.id === props.highlighted_id),
            ...props.items.filter((item) => item.id !== props.highlighted_id)
        ];
    });
</script>

{#each sortedItems as item (item.id)}
    <div class="mb-2 rounded bg-gray-700 p-2 text-white shadow" animate:flip>
        <p>{item.label}</p>
    </div>
{/each}
