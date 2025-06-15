<script lang="ts">
    import Icon from "$lib/components/icon/Icon.svelte";
    import { fade } from "svelte/transition";

    interface itemProps {
        item: TimelineItem;
        index: number;
        active: boolean;
    }

    const props: itemProps = $props();

    const date_split = props.item.date_start.split("-");
    const date_year = date_split.at(0)!;
    const date_rest = "-" + date_split.slice(1).join("-");
</script>

<div class="absolute top-8">
    <!-- Tick -->
    <div class="absolute h-3 w-px bg-gray-500"></div>

    <!-- Date -->
    {#if props.active}
        <div
            class="absolute top-1 mt-3 flex -translate-x-1/2 text-sm whitespace-nowrap text-amber-100"
            in:fade={{ duration: 300 }}
        >
            {props.item.date_start}
        </div>
    {/if}
</div>

<!-- Icon -->
<button
    class={`absolute cursor-pointer transition-all duration-300 ${props.active ? "translate-y-1 scale-100" : "translate-y-3 scale-75"}`}
    onclick={() => {
        if (props.item.url) {
            window.open(props.item.url, "_blank");
        }
    }}
>
    <div class="absolute h-10 w-10 -translate-x-1/2 -translate-y-1/2" style="top: 50%;">
        <div
            id="background-blur"
            class="absolute h-12 w-12 -translate-x-1/6 -translate-y-1/8 bg-gray-800 blur-sm"
        ></div>
        <Icon path={props.item.iconPath} is_focused={props.active} />
    </div>
</button>
