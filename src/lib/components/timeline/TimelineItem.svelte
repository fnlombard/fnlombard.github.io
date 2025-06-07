<script module lang="ts">
    export interface timelineItem {
        id: number;
        label: string;
        short_description: string;
        description: string;
        responsibilities: string[];
        technologies: string[];
        date_start: string;
        iconPath: string;
        url: string;
    }
</script>

<script lang="ts">
    import Icon from "$lib/components/icon/Icon.svelte";
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    import { backOut } from "svelte/easing";

    interface itemProps {
        item: timelineItem;
        nextStart: string | null;
        index: number;
        minTime: number;
        maxTime: number;
        active: boolean;
        onhover: (t: number | null) => void;
    }

    const props: itemProps = $props();

    const toDate = (d: string) => new Date(d).getTime();
    const start = toDate(props.item.date_start);
    const end = props.nextStart ? toDate(props.nextStart) : Date.now();
    const total = props.maxTime - props.minTime;
    const left = ((start - props.minTime) / total) * 100;
    const width = ((end - start) / total) * 100;

    let bubblePosition = $state("translate-x-1/9");
    let flyX = $state("-200");
    onMount(() => {
        if (left > 70) {
            bubblePosition = "-translate-x-68";
            flyX = "200";
        }
    });
</script>

<button
    class="absolute cursor-pointer"
    style="left: {left}%;"
    onmouseenter={() => props.onhover(props.index)}
    onmouseleave={() => props.onhover(null)}
    onclick={() => {
        if (props.item.url) {
            window.open(props.item.url, "_blank");
        }
    }}
>
    <!-- Segment -->
    <div
        class="absolute z-10 h-2 rounded bg-blue-500"
        style="width: {width}%; top: calc(50% - 12px);"
    ></div>

    <!-- Icon -->
    <div class="absolute z-20 h-10 w-10 -translate-x-1/2 -translate-y-1/2" style="top: 50%;">
        <Icon path={props.item.iconPath} is_focused={props.active} />
    </div>

    <!-- Info bubble -->
    {#if props.active}
        <div
            class="{bubblePosition} absolute z-30 w-60 -translate-y-1/2 rounded bg-gray-900 p-4 text-center whitespace-nowrap shadow-lg shadow-slate-500"
            transition:fly={{ duration: 200, x: flyX, opacity: 0, easing: backOut }}
        >
            <p class="text-gray-100">{props.item.label}</p>
            <p class="mt-1 text-sm text-gray-300">{props.item.short_description}</p>
            <p class="mt-1 text-xs text-gray-400">
                {props.item.date_start} -- {props.nextStart ??
                    new Date().toISOString().split("T")[0]}
            </p>
        </div>
    {/if}
</button>
