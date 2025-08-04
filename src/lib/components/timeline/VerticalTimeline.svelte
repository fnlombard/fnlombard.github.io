<script lang="ts">
    import VerticalTimelineItem from "./VerticalTimelineItem.svelte";

    interface IProps {
        items: TimelineItemVM[];
    }

    const props: IProps = $props();

    let highlightedItem: TimelineItemVM | null = $derived(
        props.items.find((item) => item.isHighlighted === true) || null
    );

    let hoveredItem: TimelineItemVM | null = $state(null);

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

    $effect(() => {
        props.items.forEach((item) => {
            if (item.isHighlighted && hoveredItem !== item) {
                const el = document.getElementById("" + item.id);
                if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        });
    });
</script>

<div class="mt-4 flex flex-col">
    {#each props.items as item (item.id)}
        <div
            id={`${item.id}`}
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
