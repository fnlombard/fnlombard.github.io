<script lang="ts">
    import Button from "../button/Button.svelte";
    import { ComponentConfig } from "./config";
    import { fade } from "svelte/transition";
    import { onMount } from "svelte";

    const config = new ComponentConfig({
        min_width_rem: 4.5,
        max_width_rem: 12
    });

    interface navProps {
        title: string;
        iconPath: string;
        external_links: Link[];
        navigation_links: Link[];
    }

    let props: navProps = $props();

    let collapsed = $state(true);

    function setCollapse(isCollapsed: boolean): void {
        if (!isDesktop) return;

        console.log("Setting isDesktop...");

        collapsed = isCollapsed;
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

    let selected_menu_item_index = $state(0);

    function selectMenuItem(index: number) {
        selected_menu_item_index = index;
    }

    let isDesktop = $state(true);

    onMount(() => {
        const checkScreen = () => {
            isDesktop = window.matchMedia("(min-width: 768px)").matches;
        };

        checkScreen();
        window.addEventListener("resize", checkScreen);

        return () => window.removeEventListener("resize", checkScreen);
    });
</script>

<div
    style:width={isDesktop ? width : ""}
    class="fixed z-30 flex h-10 min-h-10 w-screen min-w-screen flex-row bg-gray-900 text-white transition-all
        duration-300 md:top-0 md:left-0 md:h-screen md:min-h-screen md:w-18 md:min-w-18
        md:flex-col md:items-center md:bg-gray-900 md:p-4"
    onmouseenter={() => setCollapse(false)}
    onmouseleave={() => setCollapse(true)}
    role="presentation"
>
    <img class="md:w-10" src={props.iconPath} alt="avatar" />

    {#if !isDesktop}
        <div class="mx-2 my-auto">
            {props.title}
        </div>
    {:else if collapsed}
        <div class="mt-2 w-full text-center text-sm font-semibold" in:fade={{ delay: 150 }}>
            {initials}
        </div>
    {:else}
        <div
            class="w-full text-center text-lg font-semibold whitespace-nowrap"
            in:fade={{ delay: 150 }}
        >
            {props.title}
        </div>
    {/if}

    {#if isDesktop}
        <hr class="mx-4 border-gray-700 md:my-4 md:w-full" />
    {:else}
        <hr class="z-10 mx-auto my-auto h-7 w-0.5 rounded-2xl bg-amber-100" />
    {/if}

    <div class="mx-auto flex md:block md:w-full">
        {#each props.navigation_links as link, index}
            <a class="w-10" href={link.url} onclick={() => selectMenuItem(index)}>
                <Button
                    label={link.label}
                    disabled={false}
                    iconPath={link.icon}
                    {collapsed}
                    isSelected={selected_menu_item_index === index}
                />
            </a>
        {/each}
    </div>

    {#if isDesktop}
        <hr class="mx-4 border-gray-700 md:my-4 md:w-full" />
    {:else}
        <hr class="z-10 mx-auto my-auto h-7 w-0.5 rounded-2xl bg-amber-100" />
    {/if}

    <div class="mx-4 flex md:block md:w-full">
        {#each props.external_links as link}
            <a class="w-10" href={link.url} target="_blank">
                <Button label={link.label} disabled={false} iconPath={link.icon} {collapsed} />
            </a>
        {/each}
    </div>
</div>
