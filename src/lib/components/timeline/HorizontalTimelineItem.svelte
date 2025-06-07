<script lang="ts">
    import Icon from "$lib/components/icon/Icon.svelte";
    import { onMount } from "svelte";

    interface itemProps {
        item: TimelineItem;
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

    function mouseEnter(): void {
        window.scrollTo({ top: 0, behavior: "smooth" });
        props.onhover(props.index);
    }
</script>

<button
    class="absolute cursor-pointer"
    style="left: {left}%;"
    onmouseenter={() => mouseEnter()}
    onmouseleave={() => props.onhover(null)}
    onclick={() => {
        if (props.item.url) {
            window.open(props.item.url, "_blank");
        }
    }}
>
    <div class="absolute z-20 h-10 w-10 -translate-x-1/2 -translate-y-1/2" style="top: 50%;">
        <Icon path={props.item.iconPath} is_focused={props.active} />
    </div>
</button>
