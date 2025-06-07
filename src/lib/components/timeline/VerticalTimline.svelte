<script lang="ts">
    import { flip } from "svelte/animate";
    import VerticalTimelineItem from "./VerticalTimelineItem.svelte";

    interface IProps {
        highlighted_id: number | null;
        items: TimelineItem[];
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
    <div animate:flip={{ duration: 300 }}>
        <VerticalTimelineItem {item} isSelected={props.highlighted_id === item.id} />
    </div>
{/each}
