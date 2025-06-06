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
        }
    ];

    const iconPath = "/favicon.png";
    const title = "Francois Lombard";

    const items: timelineItem[] = [
        {
            label: "BEng Robitics (Cum Laude)",
            description: "Stellenbosch University, ZA",
            date_start: "2014-01-01",
            iconPath: icons["stellenbosch"],
            url: "https://ee.sun.ac.za/"
        },
        {
            label: "MEng Electronic Engineering",
            description: "Stellenbosch University, ZA",
            date_start: "2018-01-01",
            iconPath: icons["esl"],
            url: "https://www.esl.sun.ac.za/"
        },
        {
            label: "Software Engineer",
            description: "S-PLANE, ZA",
            date_start: "2020-01-01",
            iconPath: icons["splane"],
            url: "https://s-plane.com/products/isr-payload-operation/paragonisr/"
        },
        {
            label: "Software Engineer",
            description: "VASTech, ZA",
            date_start: "2022-09-01",
            iconPath: icons["vastech"],
            url: "https://www.vastech.co.za/"
        },
        {
            label: "Software Engineer",
            description: "Zenseact, SE",
            date_start: "2024-01-01",
            iconPath: icons["zenseact"],
            url: "https://zenseact.com/our-software/"
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
