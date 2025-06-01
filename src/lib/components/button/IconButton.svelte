<script lang="ts">
    import Icon from "../icon/Icon.svelte";

    interface buttonProps {
        iconPath: string;
        onClick: () => void;
        disabled?: boolean;
    }

    const props: buttonProps = $props();

    let is_focused = $state(false);

    function mouseEnter() {
        is_focused = true;
    }
    function mouseLeave() {
        is_focused = false;
    }
</script>

<button
    class="flex h-10 w-10 items-center justify-center rounded-md bg-gray-900 hover:bg-gray-700 disabled:opacity-50"
    onclick={props.onClick}
    onmouseenter={() => mouseEnter()}
    onmouseleave={() => mouseLeave()}
    disabled={props.disabled}
>
    <div class="h-7 w-7">
        <Icon path={props.iconPath} {is_focused} />
    </div>
</button>
