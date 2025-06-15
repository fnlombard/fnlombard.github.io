<script lang="ts">
    import Icon from "$lib/components/icon/Icon.svelte";

    interface itemProps {
        item: TimelineItem;
        index: number;
        active: boolean;
    }

    const props: itemProps = $props();
</script>

<button
    class={`absolute cursor-pointer ${props.active ? "translate-y-1" : "translate-y-3"}`}
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
