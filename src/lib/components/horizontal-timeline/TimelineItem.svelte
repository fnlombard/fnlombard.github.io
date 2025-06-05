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
    interface itemProps {
        item: timelineItem;
        index: number;
        minTime: number;
        maxTime: number;
        active: boolean;
        onhover: (t: timelineItem | null) => void;
    }

    const props: itemProps = $props();

    const toDate = (d: string) => new Date(d).getTime();
    const start = toDate(props.item.date_start);
    const end = toDate(props.item.date_end);
    const total = props.maxTime - props.minTime;
    const left = ((start - props.minTime) / total) * 100;
    const width = ((end - start) / total) * 100;
    const isEven = props.index % 2 === 0;
    const bubbleSide = isEven ? "top-full mt-4" : "bottom-full mb-4";
</script>

<div
    class="absolute cursor-pointer"
    style="left: {left}%;"
    onmouseenter={() => props.onhover(props.item)}
    onmouseleave={() => props.onhover(null)}
    role="presentation"
>
    <!-- Segment -->
    <div
        class="absolute z-10 h-2 rounded bg-blue-500"
        style="width: {width}%; top: calc(50% - 12px);"
    ></div>

    <!-- Icon -->
    <div class="absolute z-20 -translate-x-1/2 -translate-y-1/2" style="top: 50%;">
        <img src={props.item.iconPath} alt={props.item.label} class="h-6 w-6" />
    </div>

    <!-- Info bubble -->
    {#if props.active}
        <div
            class={`absolute z-30 w-60 -translate-x-1/2 transform rounded bg-white p-4 text-center shadow-lg transition-all duration-300 ${bubbleSide}`}
        >
            <div class="mx-auto mb-2 h-5 w-px bg-gray-400"></div>
            <strong>{props.item.label}</strong>
            <p class="mt-1 text-sm text-gray-700">{props.item.description}</p>
            <p class="mt-1 text-xs text-gray-500">{props.item.date_start} - {props.item.date_end}</p>
        </div>
    {/if}
</div>
