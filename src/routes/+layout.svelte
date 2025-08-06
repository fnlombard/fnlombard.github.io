<script lang="ts">
    import VerticalNavBar from "$lib/components/vertical-nav-bar/VerticalNavBar.svelte";
    import { dev } from "$app/environment";
    import { injectAnalytics } from "@vercel/analytics/sveltekit";
    import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";
    import { icons } from "$lib/icons";

    import "../app.css";

    let { children } = $props();

    injectAnalytics({ mode: dev ? "development" : "production" });
    injectSpeedInsights();

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
        { label: "Personal", url: "/personal", icon: icons["personal"] },
        { label: "Planets", url: "/planets", icon: icons["planets"] }
    ];

    const iconPath = "/favicon.png";
    const title = "Francois Lombard";
</script>

<main class="flex flex-col transition-all duration-300 md:flex-row">
    <div class="md:w-18">
        <VerticalNavBar {title} {iconPath} {external_links} {navigation_links} />
    </div>
    <div class="w-full">
        {@render children()}
    </div>
</main>
