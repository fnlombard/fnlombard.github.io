<script lang="ts">
    import { page } from "$app/state";
    import Icon from "../icon/Icon.svelte";

    interface navProps {
        title: string;
        iconPath: string;
        external_links: Link[];
        navigation_links: Link[];
    }

    let props: navProps = $props();
</script>

<nav
    class="fixed top-0 left-0 right-0 z-50 flex h-14 items-center gap-3 px-4
        bg-slate-950/85 backdrop-blur-md
        border-b border-slate-700/30
        shadow-[0_1px_24px_rgba(0,0,0,0.5)]
        md:px-6"
>
    <!-- Left: Logo + Title -->
    <div class="flex shrink-0 items-center gap-2.5">
        <img
            class="h-8 w-8 rounded-full ring-1 ring-indigo-400/30 shadow-lg shadow-indigo-500/10"
            src={props.iconPath}
            alt="avatar"
        />
        <span class="hidden text-sm font-semibold tracking-wide text-white sm:block">
            {props.title}
        </span>
    </div>

    <!-- Separator -->
    <div class="hidden h-5 w-px bg-slate-700/60 sm:block"></div>

    <!-- Center: Nav links -->
    <div class="flex flex-1 items-center gap-1">
        {#each props.navigation_links as link}
            {@const isActive = page.url.pathname === link.url}
            <a
                href={link.url}
                class="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium
                    transition-all duration-200
                    {isActive
                        ? 'border border-indigo-500/25 bg-indigo-500/15 text-amber-200'
                        : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}"
            >
                <div class="h-4 w-4 shrink-0">
                    <Icon path={link.icon} is_focused={isActive} />
                </div>
                <span class="hidden sm:block">{link.label}</span>
            </a>
        {/each}
    </div>

    <!-- Right: External links -->
    <div class="flex shrink-0 items-center gap-1">
        {#each props.external_links as link}
            <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm
                    text-slate-400 transition-all duration-200
                    hover:bg-slate-800/50 hover:text-slate-200"
            >
                <div class="h-4 w-4">
                    <Icon path={link.icon} />
                </div>
                <span class="hidden lg:block">{link.label}</span>
            </a>
        {/each}
    </div>
</nav>
