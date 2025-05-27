<script lang="ts">
    import VerticalNavBar from "$lib/components/vertical-nav-bar/VerticalNavBar.svelte";

    const links: Link[] = [
        { label: "GitHub", url: "https://github.com" },
        { label: "Docs", url: "https://svelte.dev" }
    ];

    const navItems: NavItem[] = [
        { id: "home", label: "Home" },
        { id: "about", label: "About" },
        { id: "settings", label: "Settings" }
    ];

    let currentPage = "home";
</script>

<div class="flex">
    <VerticalNavBar externalLinks={links} {navItems} />

    <main class="ml-20 flex-1 p-6 md:ml-64">
        {#if currentPage === "home"}
            <p>Home Page</p>
        {:else if currentPage === "about"}
            <p>About Page</p>
        {:else if currentPage === "settings"}
            <p>Settings Page</p>
        {/if}
    </main>
</div>
