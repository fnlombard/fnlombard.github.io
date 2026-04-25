<script lang="ts">
    import VerticalTimelineItem from "./VerticalTimelineItem.svelte";

    interface IProps {
        items: TimelineItemVM[];
        title?: string;
    }

    const props: IProps = $props();

    function mouseEnter(item: TimelineItemVM): void {
        item.isHighlighted = true;
        item.zIndex = props.items.length;
    }

    function mouseLeave(item: TimelineItemVM): void {
        item.isHighlighted = false;
        item.zIndex = null;
    }
</script>

<div class="flex flex-col px-4 md:px-8">
    {#each props.items as item (item.id)}
        <div
            id={`${item.id}`}
            onmouseenter={() => mouseEnter(item)}
            onmouseleave={() => mouseLeave(item)}
            role="presentation"
            style:z-index={item.isHighlighted ? "1" : "0"}
        >
            <VerticalTimelineItem {item} />
            <div class="h-4 w-full"></div>
        </div>
    {/each}
</div>
