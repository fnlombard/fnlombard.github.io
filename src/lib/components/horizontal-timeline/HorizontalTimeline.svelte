<script lang="ts">
    import TimelineItem from "./TimelineItem.svelte";
    import type { timelineItem } from "./TimelineItem.svelte";

    interface timelineProps {
        items: timelineItem[];
    }

    const props: timelineProps = $props();
    let hoveredItem: timelineItem | null = $state(null);

    const toDate = (dateStr: string) => new Date(dateStr).getTime();

    const startTimes = props.items.map((item) => toDate(item.date_start));
    const endTimes = props.items.map((item) => toDate(item.date_end));

    const minTime = Math.min(...startTimes);
    const maxTime = Math.max(...endTimes);

    function getTickDates(): { date: string; left: number }[] {
        const ticks = [];
        const start = new Date(minTime);
        start.setDate(1);
        const total = maxTime - minTime;
        const current = new Date(start);
        while (current.getTime() <= maxTime) {
            const diff = current.getTime() - minTime;
            const left = (diff / total) * 100;
            ticks.push({
                date: current.toLocaleDateString(undefined, { year: "numeric", month: "short" }),
                left
            });
            current.setMonth(current.getMonth() + 2);
        }
        return ticks;
    }
</script>

<div class="relative w-full overflow-x-auto px-10 py-40">
    <div class="relative h-4 w-full">
        <!-- Base timeline -->
        <div class="absolute top-1/2 left-0 z-0 h-1 w-full -translate-y-1/2 bg-black"></div>

        <!-- Ticks -->
        {#each getTickDates() as tick}
            <div class="absolute top-0 h-3 w-px bg-gray-500" style="left: {tick.left}%"></div>
            <div
                class="absolute mt-3 -translate-x-1/2 text-xs whitespace-nowrap text-gray-600"
                style="left: {tick.left}%"
            >
                {tick.date}
            </div>
        {/each}

        <!-- Segments, Icons, Hover Info -->
        {#each props.items as item, i}
            <TimelineItem
                {item}
                index={i}
                {minTime}
                {maxTime}
                active={hoveredItem?.label === item.label}
                onhover={(item) => (hoveredItem = item)}
            />
        {/each}
    </div>
</div>
