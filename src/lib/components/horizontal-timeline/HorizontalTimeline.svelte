<script lang="ts">
    import TimelineItem from "./TimelineItem.svelte";
    import type { timelineItem } from "./TimelineItem.svelte";

    interface timelineProps {
        items: timelineItem[];
    }

    const props: timelineProps = $props();
    let hoveredIndex: number | null = $state(null);

    const todayStr = new Date().toISOString().split("T")[0];

    const normalizeDate = (dateStr: string) =>
        dateStr.toLowerCase() === "current" ? todayStr : dateStr;

    const toDate = (dateStr: string) => new Date(normalizeDate(dateStr)).getTime();

    const startTimes = props.items.map((item) => toDate(item.date_start));
    const endTimes = [...props.items.slice(1).map((item) => toDate(item.date_start)), Date.now()];

    const minTime = Math.min(...startTimes);
    const maxTime = Math.max(...endTimes);

    function getTickDates(): { date: string; left: number }[] {
        const ticks = [];
        const total = maxTime - minTime;

        for (let i = 0; i < props.items.length; i++) {
            const item = props.items[i];
            const start = toDate(item.date_start);
            const startLeft = ((start - minTime) / total) * 100;
            ticks.push({
                date: item.date_start,
                left: startLeft
            });
        }

        const todayLeft = ((Date.now() - minTime) / total) * 100;
        ticks.push({
            date: todayStr,
            left: todayLeft
        });

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

        <!-- Entries -->
        <div class="absolute top-[calc(50%-40px)] left-0 w-full">
            {#each props.items as item, i}
                <TimelineItem
                    {item}
                    index={i}
                    nextStart={props.items[i + 1]?.date_start ?? null}
                    {minTime}
                    {maxTime}
                    active={hoveredIndex === i}
                    onhover={(i) => (hoveredIndex = i)}
                />
            {/each}
        </div>
    </div>
</div>
