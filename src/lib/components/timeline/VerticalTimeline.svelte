<script lang="ts">
    import { flip } from "svelte/animate";
    import VerticalTimelineItem from "./VerticalTimelineItem.svelte";

    interface IProps {
        highlighted_id: number | null;
        items: TimelineItem[];
        highlight_item: (id: number | null) => void;
    }

    const props: IProps = $props();

    const sortedItems = $derived.by(() => {
        if (props.highlighted_id == null) return props.items;
        return [
            ...props.items.filter((item) => item.id === props.highlighted_id),
            ...props.items.filter((item) => item.id !== props.highlighted_id)
        ];
    });

    let highlighted_id: number | null = $state(null);

    function mouseEnter(id: number | null): void {
        highlighted_id = id;
        props.highlight_item(id);
    }

    function mouseLeave(): void {
        highlighted_id = null;
        props.highlight_item(null);
    }

    function isHighlighted(item: TimelineItem): boolean {
        return props.highlighted_id === item.id || highlighted_id === item.id;
    }
</script>

<div class="mt-4 flex flex-col">
    {#each sortedItems as item (item.id)}
        <div
            animate:flip={{ duration: 300 }}
            onmouseenter={() => mouseEnter(item.id)}
            onmouseleave={() => mouseLeave()}
            role="presentation"
            style:z-index={isHighlighted(item) ? "1" : "0"}
        >
            <VerticalTimelineItem {item} isSelected={isHighlighted(item)} />
            <div class="h-6 w-full"></div>
        </div>
    {/each}
</div>
