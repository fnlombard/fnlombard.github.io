<script lang="ts">
    import { ComponentConfig } from "./config";
    import { fade } from "svelte/transition";
    import { onMount } from "svelte";
    import Menu from "./Menu.svelte";
    import { icons } from "$lib/icons";
    import Button from "../button/Button.svelte";

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

    let isDesktop = $state(true);

    onMount(() => {
        const checkScreen = () => {
            isDesktop = window.matchMedia("(min-width: 768px)").matches;
        };

        checkScreen();
        window.addEventListener("resize", checkScreen);

        return () => window.removeEventListener("resize", checkScreen);
    });

    let mobileMenuOpen = $state(false);
</script>

<div
    style:width={isDesktop ? width : ""}
    class="transition-fade fixed z-30 flex h-10 min-h-10 w-screen min-w-screen flex-row
        bg-gray-900 text-white duration-300 md:top-0 md:left-0 md:h-screen md:min-h-screen
        md:w-18 md:min-w-18 md:flex-col md:items-center md:bg-gray-900 md:p-4"
    onmouseenter={() => setCollapse(false)}
    onmouseleave={() => setCollapse(true)}
    role="presentation"
>
    <img class="md:w-10" src={props.iconPath} alt="avatar" />

    {#if !isDesktop}
        <div class="mx-2 my-auto w-45">
            {props.title}
        </div>
    {:else if collapsed}
        <div class="mt-2 w-full text-center text-sm font-semibold" in:fade={{ delay: 150 }}>
            {initials}
        </div>
        <hr class="mx-4 border-gray-700 md:my-4 md:w-full" />
    {:else}
        <div
            class="w-full text-center text-lg font-semibold whitespace-nowrap"
            in:fade={{ delay: 150 }}
        >
            {props.title}
        </div>
        <hr class="mx-4 border-gray-700 md:my-4 md:w-full" />
    {/if}

    {#if isDesktop}
        <Menu
            {collapsed}
            external_links={props.external_links}
            navigation_links={props.navigation_links}
        />
    {:else}
        <!-- Right align this button horizontally -->
        <div
            class="absolute right-4"
            tabindex="-1"
            onfocusout={() => {
                setTimeout(() => {
                    mobileMenuOpen = false;
                }, 100); // short delay to allow clicks
            }}
        >
            <Button
                iconPath={icons["burger"]}
                collapsed={true}
                onClick={() => (mobileMenuOpen = !mobileMenuOpen)}
                isSelected={mobileMenuOpen}
            />
        </div>
        {#if mobileMenuOpen}
            <div class="absolute top-11 right-4 rounded-lg bg-gray-900 p-4 shadow-lg">
                <Menu
                    collapsed={false}
                    external_links={props.external_links}
                    navigation_links={props.navigation_links}
                />
            </div>
        {/if}
    {/if}
</div>
