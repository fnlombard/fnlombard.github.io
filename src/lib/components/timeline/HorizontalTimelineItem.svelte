<script lang="ts">
    import Icon from "$lib/components/icon/Icon.svelte";

    interface itemProps {
        item: TimelineItem;
        index: number;
        active: boolean;
        scale: number;
    }

    const props: itemProps = $props();
</script>

<button
    class="absolute cursor-pointer transition-all duration-300 {props.active
        ? 'translate-y-1'
        : 'translate-y-3'}"
    style="scale: {props.active ? '100' : props.scale}%;"
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
