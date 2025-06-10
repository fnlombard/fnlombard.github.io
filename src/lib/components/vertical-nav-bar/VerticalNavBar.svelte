<script lang="ts">
    import Button from "../button/Button.svelte";
    import { ComponentConfig } from "./config";
    import { fade } from "svelte/transition";

    const config = new ComponentConfig({
        min_width_rem: 4.5,
        max_width_rem: 12
    });

    interface navProps {
        title: string;
        iconPath: string;
        external_links: Link[];
        navigation_links: Link[];
        updateWidth: (width: string) => void;
    }

    let props: navProps = $props();

    let collapsed = $state(false);

    function toggleCollapse() {
        collapsed = !collapsed;
        props.updateWidth(width);
    }

    const initials = $derived.by(() => {
        return (props.title + " ")
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase())
            .join(". ");
    });

    /**
     * Tailwind generates classes based on what is used in the template.
     * As the width is dynamic, we have to set the style instead of using tailwind.
     */
    let width = $derived.by(() => {
        const width = collapsed ? config.min_width_rem : config.max_width_rem;
        return width + "rem";
    });
</script>

<div
    style="width: {width};"
    class={`fixed top-0 left-0 z-30 flex h-screen min-h-screen flex-col items-center bg-gray-900 p-4 text-white transition-all duration-300`}
>
    <button class="cursor-pointer" onclick={toggleCollapse}>
        <img class="w-full" src={props.iconPath} alt="avatar" />
    </button>

    {#if collapsed}
        <div class="mt-2 text-center text-sm font-semibold" in:fade={{ delay: 150 }}>
            {initials}
        </div>
    {:else}
        <div class="text-center text-lg font-semibold whitespace-nowrap" in:fade={{ delay: 150 }}>
            {props.title}
        </div>
    {/if}

    <hr class="my-4 w-full border-gray-700" />

    <div class="w-full">
        {#each props.navigation_links as link}
            <a href={link.url}>
                <Button label={link.label} disabled={false} iconPath={link.icon} {collapsed} />
            </a>
        {/each}
    </div>

    <hr class="my-4 w-full border-gray-700" />

    <div class="w-full">
        {#each props.external_links as link}
            <a href={link.url} target="_blank">
                <Button label={link.label} disabled={false} iconPath={link.icon} {collapsed} />
            </a>
        {/each}
    </div>
</div>
