<script lang="ts">
    import { flip } from "svelte/animate";
    import VerticalTimelineItem from "./VerticalTimelineItem.svelte";

    interface IProps {
        items: TimelineItemVM[];
    }

    const props: IProps = $props();

    let highlightedItem: TimelineItemVM | null = $derived(
        props.items.find((item) => item.isHighlighted === true) || null
    );

    let hoveredItem: TimelineItemVM | null = $state(null);

    const sortedItems = $derived.by(() => {
        // Decouple local and external highlight
        if (hoveredItem === highlightedItem) return props.items;

        if (highlightedItem === null) return props.items;

        return [highlightedItem, ...props.items.filter((item) => item !== highlightedItem)];
    });

    function mouseEnter(item: TimelineItemVM): void {
        hoveredItem = item;
        item.isHighlighted = true;
        item.zIndex = props.items.length;
    }

    function mouseLeave(item: TimelineItemVM): void {
        hoveredItem = null;
        item.isHighlighted = false;
        item.zIndex = null;
    }
</script>

<div class="mt-4 flex flex-col">
    {#each sortedItems as item (item.id)}
        <div
            animate:flip={{ duration: 300 }}
            onmouseenter={() => mouseEnter(item)}
            onmouseleave={() => mouseLeave(item)}
            role="presentation"
            style:z-index={item.isHighlighted ? "1" : "0"}
        >
            <VerticalTimelineItem {item} />
            <div class="h-6 w-full"></div>
        </div>
    {/each}
</div>
