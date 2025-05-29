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

    const iconPath = "/favicon.png";
    const title = "Francois Lombard";
</script>

<div class="flex">
    <VerticalNavBar {title} {navItems} {iconPath} {links} />
    <div>Things come here.</div>
</div>
