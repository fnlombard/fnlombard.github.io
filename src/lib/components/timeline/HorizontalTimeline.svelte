<script lang="ts">
    import HorizontalTimelineItem from "./HorizontalTimelineItem.svelte";
    import { fade } from "svelte/transition";
    import { toDate } from "$lib/utils";
    import { todayStr } from "$lib/constants";

    interface timelineProps {
        items: TimelineItem[];
        update_selected: (index: number | null) => void;
        highlighted_id?: number | null;
    }

    const props: timelineProps = $props();

    const minTime = Math.min(...props.items.map((item) => toDate(item.date_start)));
    const maxTime = Date.now();
    const totalTime = maxTime - minTime;

    interface TimelineItemVM {
        source: TimelineItem;
        left: number;
        zIndex: number | null;
        isHighlighted: boolean;
    }

    const items: TimelineItemVM[] = $state(
        props.items.map((item) => ({
            source: item,
            left: Math.round(((toDate(item.date_start) - minTime) / totalTime) * 100),
            isHighlighted: false,
            zIndex: null
        }))
    );

    let mouseLeft: number = $state(0);
    let containerRef: HTMLDivElement | undefined = undefined;

    function handleMouseMove(event: MouseEvent): void {
        if (containerRef === undefined) return;

        const rect = containerRef.getBoundingClientRect();
        mouseLeft = ((event.clientX - rect.left) / rect.width) * 100;

        const distances = items
            .map((item) => ({
                item,
                distance: Math.abs(item.left - mouseLeft)
            }))
            .sort((a, b) => a.distance - b.distance);

        distances.forEach((entry, index) => {
            entry.item.zIndex = items.length - index;
            entry.item.isHighlighted = false;
        });

        let selectedItem = distances.at(0)!.item;
        selectedItem.isHighlighted = true;

        props.update_selected(items.indexOf(selectedItem));
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function handleMouseLeave(event: MouseEvent): void {
        items.forEach((item) => {
            item.isHighlighted = false;
            item.zIndex = null;
        });

        props.update_selected(null);
    }

    const getTickDates = (): { date: string; left: number }[] =>
        items
            .map((item) => ({
                date: item.source.date_start,
                left: ((toDate(item.source.date_start) - minTime) / totalTime) * 100
            }))
            .concat({
                date: todayStr,
                left: ((Date.now() - minTime) / totalTime) * 100
            });

    const highlightedItem: TimelineItem | null = $derived.by(() => {
        if (props.highlighted_id !== null) {
            return props.items.find((item) => item.id === props.highlighted_id) || null;
        }
        return items.find((item) => item.isHighlighted === true)?.source || null;
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
        return ((start - minTime) / totalTime) * 100;
    });

    function isItemActive(item: TimelineItemVM): boolean {
        return item.isHighlighted || props.highlighted_id === item.source.id;
    }
</script>

<div
    class="relative w-full px-12 pt-20 pb-4"
    onmousemove={handleMouseMove}
    onmouseleave={handleMouseLeave}
    role="presentation"
>
    <div class="relative h-3 w-full" bind:this={containerRef}>
        <!-- Base timeline -->
        <div class="absolute top-1/2 left-0 z-0 h-1 w-full -translate-y-1/2 bg-gray-900"></div>

        <!-- Ticks -->
        {#each getTickDates() as tick}
            <div class="absolute top-0 h-3 w-px bg-gray-500" style="left: {tick.left}%"></div>
            <div
                class="absolute mt-3 -translate-x-1/2 text-xs whitespace-nowrap text-gray-500"
                style="left: {tick.left}%"
            >
                {tick.date}
            </div>
        {/each}

        <!-- Entries -->
        <div class="absolute top-[calc(50%-40px)] left-0 w-full">
            {#each items as item, i}
                <div class="absolute" style="Left: {item.left}%">
                    <HorizontalTimelineItem
                        item={item.source}
                        index={i}
                        active={isItemActive(item)}
                    />
                </div>
            {/each}
        </div>

        <!-- Highlighted segment when hovering -->
        {#if highlightedItem}
            {#if selectedItemWidth > 0}
                <div
                    class="absolute top-1/2 z-10 h-1.5 -translate-y-1/2 rounded bg-amber-100"
                    style="left: {selectedItemLeftPos}%; width: {selectedItemWidth}%;"
                    transition:fade={{ duration: 150 }}
                ></div>
            {:else}
                <div
                    class="absolute top-1/2 z-10 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-100"
                    style="left: {selectedItemLeftPos}%;"
                    transition:fade={{ duration: 150 }}
                ></div>
            {/if}
        {/if}
    </div>
</div>
