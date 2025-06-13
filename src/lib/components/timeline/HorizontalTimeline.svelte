<script lang="ts">
    import HorizontalTimelineItem from "./HorizontalTimelineItem.svelte";
    import { fade } from "svelte/transition";

    interface timelineProps {
        items: TimelineItem[];
        update_selected: (index: number | null) => void;
        highlighted_id?: number | null;
    }

    const props: timelineProps = $props();

    const todayStr = new Date().toISOString().split("T")[0];
    const startTimes = props.items.map((item) => toDate(item.date_start));

    const minTime = Math.min(...startTimes);
    const maxTime = Date.now();
    const totalTime = maxTime - minTime;

    interface TimelineItemVM extends TimelineItem {
        left: number;
        scale: number;
        isHighlighted: boolean;
    }

    function normalizeDate(dateString: string): string {
        return dateString.toLowerCase() === "current" ? todayStr : dateString;
    }

    function toDate(dateString: string): number {
        return new Date(normalizeDate(dateString)).getTime();
    }

    function getItemLeft(item: TimelineItem): number {
        const start = toDate(item.date_start);
        return ((start - minTime) / totalTime) * 100;
    }

    const items: TimelineItemVM[] = $state(
        props.items.map((item) => ({
            ...item,
            left: getItemLeft(item),
            scale: 50,
            isHighlighted: false
        }))
    );

    /** Mouse Hover Logic */
    let positionPercentage: number = $state(0);
    let containerRef: HTMLDivElement | undefined = undefined;

    let hoveredIndex: number | null = $state(null);
    function handleMouseMove(event: MouseEvent): void {
        if (containerRef === undefined) return;

        const rect = containerRef.getBoundingClientRect();
        positionPercentage = ((event.clientX - rect.left) / rect.width) * 100;

        let selectedItem = items.at(0);

        if (selectedItem === undefined) return;

        let maxScale = -Infinity;

        items.forEach((item) => {
            const distance = Math.abs(item.left - positionPercentage);
            const scale = Math.round(Math.max(100 - distance, 10));
            item.scale = scale;

            if (scale > maxScale) {
                maxScale = scale;
                selectedItem = item;
            }
        });

        items.forEach((item) => {
            if (item === selectedItem) item.isHighlighted = true;
            else item.isHighlighted = false;
        });

        props.update_selected(items.indexOf(selectedItem));
    }

    function handleMouseLeave(event: MouseEvent): void {
        items.forEach((item) => {
            item.scale = 50;
            item.isHighlighted = false;
        });

        props.update_selected(null);
    }

    $effect(() => {
        props.update_selected(hoveredIndex);
    });

    const getTickDates = (): { date: string; left: number }[] =>
        items
            .map((item) => ({
                date: item.date_start,
                left: ((toDate(item.date_start) - minTime) / totalTime) * 100
            }))
            .concat({
                date: todayStr,
                left: ((Date.now() - minTime) / totalTime) * 100
            });

    const highlightedItem = $derived.by(() => {
        if (props.highlighted_id !== null) {
            return props.items.find((item) => item.id === props.highlighted_id) || null;
        }
        return items.find((item) => item.isHighlighted === true) || null;
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
</script>

<div
    class="relative w-full px-4 pt-20 pb-4"
    bind:this={containerRef}
    onmousemove={handleMouseMove}
    onmouseleave={handleMouseLeave}
    role="presentation"
>
    <div class="relative h-3 w-full">
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
                <div class="absolute" style="Left: {getItemLeft(item)}%">
                    <HorizontalTimelineItem
                        {item}
                        index={i}
                        active={item.isHighlighted || props.highlighted_id === item.id}
                        scale={item.scale}
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
