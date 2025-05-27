<script lang="ts">
    interface navProps {
        navItems: NavItem[];
        externalLinks: Link[];
    }

    let props: navProps = $props();

    let collapsed = $state(false);

    function handleNavClick(navItem: NavItem) {
        console.log("Navigation clicked", navItem);
    }

    function toggleCollapse() {
        collapsed = !collapsed;
    }
</script>

<div
    class={`h-screen bg-gray-900 p-4 text-white transition-all duration-300 ${collapsed ? "w-20" : "w-64"} fixed flex flex-col items-center md:static md:items-start`}
>
    <button class="mb-6 cursor-pointer" onclick={toggleCollapse}>
        <img
            src="/placeholder-avatar.jpg"
            alt="Avatar"
            class="h-12 w-12 rounded-full object-cover"
        />
    </button>

    <div class="w-full">
        {#each props.externalLinks as link}
            <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                class="block truncate rounded px-2 py-2 text-sm hover:bg-gray-700"
            >
                {#if !collapsed}{link.label}{/if}
            </a>
        {/each}
    </div>

    <hr class="my-4 w-full border-gray-700" />

    <nav class="w-full flex-1">
        {#each props.navItems as item}
            <button
                onclick={() => handleNavClick(item)}
                class="w-full truncate rounded px-2 py-2 text-left text-sm hover:bg-gray-700"
            >
                {#if !collapsed}{item.label}{/if}
            </button>
        {/each}
    </nav>
</div>
