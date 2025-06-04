<script lang="ts">
    import { icons } from "$lib/icons";
    import VerticalNavBar from "$lib/components/vertical-nav-bar/VerticalNavBar.svelte";
    import HorizontalTimeline from "$lib/components/horizontal-timeline/HorizontalTimeline.svelte";
    import type { timelineItem } from "$lib/components/horizontal-timeline/HorizontalTimeline.svelte";

    const links: Link[] = [
        { label: "GitHub", url: "https://github.com/fnlombard", icon: icons["github"] },
        {
            label: "LinkedIn",
            url: "https://www.linkedin.com/in/fnlombard/",
            icon: icons["linkedin"]
        }
    ];

    const iconPath = "/favicon.png";
    const title = "Francois Lombard";

    const items: timelineItem[] = [
        {
            label: "Project Start",
            description: "Kickoff meeting with the team.",
            date_start: "2023-01-01",
            date_end: "2023-02-01",
            iconPath: icons["start"]
        },
        {
            label: "Development Phase",
            description: "Development of the main features.",
            date_start: "2023-02-01",
            date_end: "2023-05-01",
            iconPath: icons["development"]
        },
        {
            label: "Testing Phase",
            description: "Testing and bug fixing.",
            date_start: "2023-06-01",
            date_end: "2023-07-01",
            iconPath: icons["testing"]
        },
        {
            label: "Deployment",
            description: "Deployment to production environment.",
            date_start: "2023-08-01",
            date_end: "2023-08-15",
            iconPath: icons["deployment"]
        }
    ];
</script>

<div class="flex">
    <VerticalNavBar {title} {iconPath} {links} />
    <div class="flex w-full flex-col items-center p-10">
        <div>This is kinda shit. The timeline was vibe-coded. I will fix it. :/</div>
        <HorizontalTimeline {items} />
    </div>
</div>
