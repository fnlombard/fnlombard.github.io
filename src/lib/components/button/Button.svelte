<script lang="ts">
    import Icon from "../icon/Icon.svelte";

    interface buttonProps {
        label?: string;
        onClick?: () => void;
        disabled?: boolean;
        iconPath?: string;
        collapsed?: boolean;
        isSelected?: boolean;
    }

    const props: buttonProps = $props();

    let is_focused = $state(false);
    $effect(() => {
        is_focused = props.isSelected ?? false;
    });

    function mouseEnter(): void {
        is_focused = true;
    }
    function mouseLeave(): void {
        is_focused = props.isSelected ?? false;
    }
</script>

<button
    class="flex h-10 w-full rounded bg-gray-900 px-2 py-2 text-sm text-white hover:bg-gray-700 disabled:opacity-50"
    onclick={props.onClick}
    onmouseenter={() => mouseEnter()}
    onmouseleave={() => mouseLeave()}
    disabled={props.disabled}
>
    {#if props.iconPath}
        <div class="w-6 max-w-6 min-w-6">
            <Icon path={props.iconPath} {is_focused} />
        </div>
    {/if}

    <div
        class="mx-2 my-auto flex items-center whitespace-nowrap transition-opacity duration-200"
        class:opacity-0={props.collapsed}
        class:opacity-100={!props.collapsed}
    >
        {props.label}
    </div>
</button>
