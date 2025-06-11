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

    let width = $state("12rem");
    function updateWidth(newWidth: string): void {
        width = newWidth;
    }
</script>

<main class="flex transition-all duration-300" style="margin-left: {width};">
    <VerticalNavBar {title} {iconPath} {external_links} {updateWidth} {navigation_links} />
    <div class="w-full px-8">
        {@render children()}
    </div>
</main>
