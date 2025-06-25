<script lang="ts">
    import VerticalNavBar from "$lib/components/vertical-nav-bar/VerticalNavBar.svelte";
    import { icons } from "$lib/icons";

    import "../app.css";

    let { children } = $props();

    const external_links: Link[] = [
        { label: "GitHub", url: "https://github.com/fnlombard", icon: icons["github"] },
        {
            label: "LinkedIn",
            url: "https://www.linkedin.com/in/fnlombard/",
            icon: icons["linkedin"]
        }
    ];

    const navigation_links: Link[] = [
        { label: "Resume", url: "/", icon: icons["resume"] },
        { label: "Personal", url: "/personal", icon: icons["personal"] }
    ];

    const iconPath = "/favicon.png";
    const title = "Francois Lombard";
</script>

<main class="flex flex-col transition-all duration-300 md:flex-row">
    <div class="h-7 w-full md:w-18">
        <VerticalNavBar {title} {iconPath} {external_links} {navigation_links} />
    </div>
    <div class="w-full">
        {@render children()}
    </div>
</main>
