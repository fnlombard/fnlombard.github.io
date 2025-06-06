<script lang="ts">
    import { icons } from "$lib/icons";
    import VerticalNavBar from "$lib/components/vertical-nav-bar/VerticalNavBar.svelte";
    import HorizontalTimeline from "$lib/components/horizontal-timeline/HorizontalTimeline.svelte";
    import type { timelineItem } from "$lib/components/horizontal-timeline/TimelineItem.svelte";

    const links: Link[] = [
        { label: "GitHub", url: "https://github.com/fnlombard", icon: icons["github"] },
        {
            label: "LinkedIn",
            url: "https://www.linkedin.com/in/fnlombard/",
            icon: icons["linkedin"]
        },
        {
            label: "Stellenbosch University",
            url: "https://ee.sun.ac.za/",
            icon: icons["stellenbosch"]
        },
        {
            label: "S-PLANE",
            url: "https://s-plane.com/products/isr-payload-operation/paragonisr/",
            icon: icons["splane"]
        },
        {
            label: "VASTech",
            url: "https://www.vastech.co.za/",
            icon: icons["vastech"]
        },
        {
            label: "Zenseact",
            url: "https://zenseact.com/our-software/",
            icon: icons["zenseact"]
        },
        {
            label: "ESL",
            url: "https://www.esl.sun.ac.za/",
            icon: icons["esl"]
        }
    ];

    const iconPath = "/favicon.png";
    const title = "Francois Lombard";

    const items: timelineItem[] = [
        {
            label: "BEng Robitics (Cum Laude)",
            description: "Stellenbosch University, South Africa",
            date_start: "2014-01-01",
            iconPath: icons["stellenbosch"]
        },
        {
            label: "MEng Electronic Engineering",
            description: "Stellenbosch University, South Africa",
            date_start: "2018-01-01",
            iconPath: icons["esl"]
        },
        {
            label: "Software Engineer",
            description: "S-PLANE, South Africa",
            date_start: "2020-01-01",
            iconPath: icons["splane"]
        },
        {
            label: "Senior Software Engineer",
            description: "S-PLANE, South Africa",
            date_start: "2022-01-01",
            iconPath: icons["splane"]
        },
        {
            label: "Software Engineer",
            description: "VASTech, South Africa",
            date_start: "2022-09-01",
            iconPath: icons["vastech"]
        },
        {
            label: "Software Engineer",
            description: "Zenseact, Sweden",
            date_start: "2024-01-01",
            iconPath: icons["zenseact"]
        }
    ];
</script>

<div class="flex">
    <VerticalNavBar {title} {iconPath} {links} />
    <div class="flex w-full flex-col items-center bg-gray-800 p-10">
        <div class="text-9xl text-red-500">Site is WIP</div>
        <HorizontalTimeline {items} />
    </div>
</div>
