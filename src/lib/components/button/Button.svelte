<script lang="ts">
    import Icon from "../icon/Icon.svelte";
    import { fade } from "svelte/transition";

    interface buttonProps {
        label: string;
        onClick?: () => void;
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

    let firstLetter = $derived.by(() => {
        return props.label.charAt(0).toUpperCase();
    });
</script>

<button
    class="flex h-10 w-full rounded bg-gray-900 px-2 py-2 text-sm text-white hover:bg-gray-700 disabled:opacity-50"
    onclick={props.onClick}
    onmouseenter={() => mouseEnter()}
    onmouseleave={() => mouseLeave()}
    disabled={props.disabled}
>
    {#if props.iconPath}
        <div class="w-6">
            <Icon path={props.iconPath} {is_focused} />
        </div>
    {/if}

    <div class="text-center">
        {#if !props.collapsed}
            <div class="absolute ml-2" transition:fade={{ duration: 200 }}>
                {props.label}
            </div>
        {/if}
        {#if !props.iconPath}
            <div class="absolute ml-2">{firstLetter}</div>
        {/if}
    </div>
</button>
