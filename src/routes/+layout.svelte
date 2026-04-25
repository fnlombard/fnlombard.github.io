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
        { label: "Personal", url: "/personal", icon: icons["personal"] }
    ];

    const iconPath = "/favicon.png";
    const title = "Francois Lombard";
</script>

<div class="flex min-h-screen flex-col">
    <VerticalNavBar {title} {iconPath} {external_links} {navigation_links} />
    <main class="flex-1 pt-14">
        {@render children()}
    </main>
</div>
