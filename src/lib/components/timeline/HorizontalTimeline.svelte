<script lang="ts">
    import HorizontalTimelineItem from "./HorizontalTimelineItem.svelte";
    import { fade } from "svelte/transition";

    interface timelineProps {
        items: TimelineItem[];
        update_selected: (index: number | null) => void;
        highlighted_id?: number | null;
    }

    const props: timelineProps = $props();
    let hoveredIndex: number | null = $state(null);

    $effect(() => {
        props.update_selected(hoveredIndex);
    });

    const todayStr = new Date().toISOString().split("T")[0];

    const normalizeDate = (dateStr: string) =>
        dateStr.toLowerCase() === "current" ? todayStr : dateStr;

    const toDate = (dateStr: string) => new Date(normalizeDate(dateStr)).getTime();

    const startTimes = props.items.map((item) => toDate(item.date_start));

    const minTime = Math.min(...startTimes);
    const maxTime = Date.now();
    const totalTime = maxTime - minTime;

    const getTickDates = (): { date: string; left: number }[] =>
        props.items
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
        return hoveredIndex !== null ? props.items[hoveredIndex] : null;
    });

    const selectedIndex = $derived.by(() => {
        if (highlightedItem === null) return null;
        return props.items.findIndex((item) => item.id === highlightedItem.id);
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

<div class="relative w-full px-4 pt-20 pb-4">
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
            {#each props.items as item, i}
                <HorizontalTimelineItem
                    {item}
                    index={i}
                    nextStart={props.items[i + 1]?.date_start ?? null}
                    {minTime}
                    {maxTime}
                    active={hoveredIndex === i || props.highlighted_id === item.id}
                    onhover={(i) => (hoveredIndex = i)}
                />
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
