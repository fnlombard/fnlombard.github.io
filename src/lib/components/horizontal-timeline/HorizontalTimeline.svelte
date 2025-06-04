<script module lang="ts">
    export interface timelineItem {
        label: string;
        description: string;
        date_start: string;
        date_end: string;
        iconPath: string;
    }
</script>

<script lang="ts">
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

    const getPosition = (start: number, end: number) => {
        const total = maxTime - minTime;
        const left = ((start - minTime) / total) * 100;
        const width = ((end - start) / total) * 100;
        return { left, width };
    };

    function getTickDates(): { date: string; left: number }[] {
        const ticks = [];
        const start = new Date(minTime);
        start.setDate(1); // start of the month
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
    <div class="timeline-container">
        <!-- Ticks -->
        {#each getTickDates() as tick}
            <div class="tick-line" style="left: {tick.left}%"></div>
            <div class="tick-label" style="left: {tick.left}%">{tick.date}</div>
        {/each}

        <!-- Timeline segments & bubbles -->
        {#each props.items as item, i}
            {@const start = toDate(item.date_start)}
            {@const end = toDate(item.date_end)}
            {@const { left, width } = getPosition(start, end)}
            {@const isHovered = hoveredItem?.label === item.label}
            {@const isEven = i % 2 === 0}
            {@const bubbleSide = isEven ? "below" : "above"}

            <!-- Segment -->
            <div
                class="timeline-segment {isHovered ? 'highlighted' : ''}"
                style="left: {left}%; width: {width}%;"
                onmouseenter={() => (hoveredItem = item)}
                onmouseleave={() => (hoveredItem = null)}
                role="presentation"
            ></div>

            <!-- Bubble with vertical lines -->
            <div
                class="bubble {bubbleSide} {isHovered ? 'hovered' : ''}"
                style="left: {left + width / 2}%;"
                onmouseenter={() => (hoveredItem = item)}
                onmouseleave={() => (hoveredItem = null)}
            >
                <div class="line-to-timeline"></div>
                <div class="mb-1 flex items-center">
                    <img src={item.iconPath} alt={item.label} class="mr-2 h-5 w-5" />
                    <strong>{item.label}</strong>
                </div>
                {#if isHovered}
                    <p class="text-sm text-gray-700">{item.description}</p>
                {/if}
                <p class="text-xs text-gray-500">{item.date_start} - {item.date_end}</p>
            </div>
        {/each}
    </div>
</div>

<style>
    .timeline-container {
        position: relative;
        height: 4px;
        background-color: #ccc;
        margin-bottom: 3rem;
        width: 100%;
    }

    .timeline-segment {
        position: absolute;
        height: 100%;
        background-color: #3b82f6;
        transition: background-color 0.2s;
    }

    .timeline-segment.highlighted {
        background-color: #2563eb;
    }

    .tick-line {
        position: absolute;
        height: 12px;
        width: 2px;
        background-color: #999;
        top: -6px;
    }

    .tick-label {
        position: absolute;
        top: 12px;
        transform: translateX(-50%);
        font-size: 0.75rem;
        color: #555;
        white-space: nowrap;
    }

    .bubble {
        position: absolute;
        width: 220px;
        background: white;
        padding: 0.5rem;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        transform: translateX(-50%);
        z-index: 10;
        text-align: center;
        transition: all 0.3s ease;
    }

    .bubble.above {
        bottom: calc(100% + 50px);
    }

    .bubble.below {
        top: calc(100% + 50px);
    }

    .bubble.hovered {
        background-color: #f9fafb;
        transform: translateX(-50%) scale(1.03);
    }

    .line-to-timeline {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 2px;
        height: 50px;
        background-color: #999;
        top: auto;
        bottom: -50px;
    }

    .bubble.above .line-to-timeline {
        top: 100%;
        bottom: auto;
    }
</style>
