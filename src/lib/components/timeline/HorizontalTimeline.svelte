<script lang="ts">
    import HorizontalTimelineItem from "./HorizontalTimelineItem.svelte";
    import { fade } from "svelte/transition";
    import { toDate } from "$lib/utils";

    interface timelineProps {
        items: TimelineItemVM[];
    }

    const props: timelineProps = $props();

    const minTime = Math.min(...props.items.map((item) => toDate(item.date_start)));
    const maxTime = Date.now();
    const totalTime = maxTime - minTime;

    props.items.forEach(
        (item) => (item.left = Math.round(((toDate(item.date_start) - minTime) / totalTime) * 100))
    );

    let mouseLeft: number = $state(0);
    let containerRef: HTMLDivElement | undefined = undefined;
    let selectedIndex: number = -1;

    function handleWheel(event: WheelEvent): void {
        event.preventDefault();

        if (selectedIndex === -1) return;

        if (event.deltaY > 0 && selectedIndex < props.items.length - 1) {
            selectedIndex++;
        } else if (event.deltaY < 0 && selectedIndex > 0) {
            selectedIndex--;
        }

        props.items.forEach((item, index) => {
            item.isHighlighted = index === selectedIndex;
            item.zIndex = props.items.length - Math.abs(selectedIndex - index);
        });
    }

    let lastMouseLeft = 0;
    const movementThreshold = 0.5;

    function handleMouseMove(event: MouseEvent): void {
        if (containerRef === undefined) return;

        const rect = containerRef.getBoundingClientRect();
        const newMouseLeft = ((event.clientX - rect.left) / rect.width) * 100;

        if (Math.abs(newMouseLeft - lastMouseLeft) < movementThreshold) return;

        lastMouseLeft = newMouseLeft;
        mouseLeft = newMouseLeft;

        const distances = props.items
            .map((item) => ({
                item,
                distance: Math.abs(item.left - mouseLeft)
            }))
            .sort((a, b) => a.distance - b.distance);

        distances.forEach((entry, index) => {
            entry.item.zIndex = props.items.length - index;
            entry.item.isHighlighted = false;
        });

        let selectedItem = distances[0].item;
        selectedItem.isHighlighted = true;
        selectedIndex = props.items.indexOf(selectedItem);

        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function handleMouseLeave(event: MouseEvent): void {
        props.items.forEach((item) => {
            item.isHighlighted = false;
            item.zIndex = null;
        });
        selectedIndex = -1;
    }

    const highlightedItem: TimelineItemVM | null = $derived.by(() => {
        return props.items.find((item) => item.isHighlighted === true) || null;
    });

    const selectedItemWidth = $derived.by(() => {
        if (highlightedItem === null) return 0;

        const start = toDate(highlightedItem.date_start);
        const end = toDate(highlightedItem.date_end);
        return ((end - start) / totalTime) * 100;
    });

    const selectedItemLeftPos = $derived.by(() => {
        if (highlightedItem === null) return 0;

        const start = toDate(highlightedItem.date_start);
        return Math.round(((start - minTime) / totalTime) * 100);
    });
</script>

<div
    class="relative w-full px-12 pt-20 pb-4"
    onmousemove={handleMouseMove}
    onmouseleave={handleMouseLeave}
    onwheel={handleWheel}
    role="presentation"
>
    <div class="relative h-3 w-full" bind:this={containerRef}>
        <!-- Base timeline -->
        <div class="absolute top-1/2 left-0 z-0 h-1 w-full -translate-y-1/2 bg-gray-900"></div>

        <!-- Entries -->
        <div class="absolute top-[calc(50%-40px)] left-0 w-full">
            {#each props.items as item}
                <div class="absolute" style="left: {item.left}%; z-index: {item.zIndex};">
                    <HorizontalTimelineItem {item} />
                </div>
            {/each}
        </div>

        <!-- Highlighted segment when hovering -->
        {#if highlightedItem}
            {#if selectedItemWidth > 0}
                <div
                    class="absolute top-1/2 z-100 h-1.5 -translate-y-1/2 rounded bg-amber-100"
                    style="left: {selectedItemLeftPos}%; width: {selectedItemWidth}%;"
                    transition:fade={{ duration: 150 }}
                ></div>
            {:else}
                <div
                    class="absolute top-1/2 z-100 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-100"
                    style="left: {selectedItemLeftPos}%;"
                    transition:fade={{ duration: 150 }}
                ></div>
            {/if}
        {/if}
    </div>
</div>
