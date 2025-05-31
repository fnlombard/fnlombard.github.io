<script lang="ts">
    import Icon from "../icon/Icon.svelte";

    interface buttonProps {
        label: string;
        onClick: () => void;
        disabled?: boolean;
        collapsed?: boolean;
        iconPath?: string;
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
    class="flex h-12 w-full rounded bg-gray-900 px-2 py-2 text-left text-sm text-white hover:bg-gray-700 disabled:opacity-50"
    onclick={props.onClick}
    onmouseenter={() => mouseEnter()}
    onmouseleave={() => mouseLeave()}
    disabled={props.disabled}
>
    {#if props.iconPath}
        <div class="mr-2 w-6">
            <Icon path={props.iconPath} {is_focused} />
        </div>
    {/if}
    <div class="my-auto">
        {props.label}
    </div>
</button>
