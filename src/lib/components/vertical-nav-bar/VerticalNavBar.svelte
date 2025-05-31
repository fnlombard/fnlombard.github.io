<script lang="ts">
    import Button from "../button/Button.svelte";
    import { ComponentConfig } from "./config";

    const config = new ComponentConfig({
        min_width_rem: 5,
        max_width_rem: 16
    });

    interface navProps {
        title: string;
        iconPath: string;
        navItems: NavItem[];
        links: Link[];
    }

    let props: navProps = $props();

    let collapsed = $state(false);

    function toggleCollapse() {
        collapsed = !collapsed;
    }

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
    class={`flex h-screen flex-col items-center bg-gray-900 p-4 text-white transition-all duration-300`}
>
    <button class="cursor-pointer" onclick={toggleCollapse}>
        <img class="w-full" src={props.iconPath} alt="avatar" />
    </button>

    <div
        class="text-2xl transition-opacity {collapsed
            ? 'duration-0'
            : 'delay-150 duration-300'}  {collapsed ? 'opacity-0' : 'opacity-100'}"
    >
        {props.title}
    </div>

    <hr class="my-4 w-full border-gray-700" />

    <div class="w-full">
        {#each props.links as link}
            <a href={link.url} target="_blank">
                <Button label={link.label} disabled={false} {collapsed} iconPath={link.icon} />
            </a>
        {/each}
    </div>

    <hr class="my-4 w-full border-gray-700" />

    <nav class="w-full flex-1">
        {#each props.navItems as item}
            <Button
                label={item.label}
                onClick={() => {
                    console.log(`Navigating to ${item.id}`);
                }}
                disabled={false}
                {collapsed}
                iconPath={item.icon}
            />
        {/each}
    </nav>
</div>
