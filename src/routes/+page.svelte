<script lang="ts">
    import { icons } from "$lib/icons";
    import VerticalNavBar from "$lib/components/vertical-nav-bar/VerticalNavBar.svelte";
    import HorizontalTimeline from "$lib/components/horizontal-timeline/HorizontalTimeline.svelte";
    import type { timelineItem } from "$lib/components/horizontal-timeline/TimelineItem.svelte";
    import ShuffleBoard from "$lib/components/shuffle-board/ShuffleBoard.svelte";
    import type { ShuffleItem } from "$lib/components/shuffle-board/ShuffleBoard.svelte";

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
            id: 0,
            label: "BEng Robitics (Cum Laude)",
            description: "Stellenbosch University, ZA",
            date_start: "2014-01-01",
            iconPath: icons["stellenbosch"],
            url: "https://ee.sun.ac.za/"
        },
        {
            id: 1,
            label: "MEng Electronic Engineering",
            description: "Stellenbosch University, ZA",
            date_start: "2018-01-01",
            iconPath: icons["esl"],
            url: "https://www.esl.sun.ac.za/"
        },
        {
            id: 2,
            label: "Software Engineer",
            description: "S-PLANE, ZA",
            date_start: "2020-01-01",
            iconPath: icons["splane"],
            url: "https://s-plane.com/products/isr-payload-operation/paragonisr/"
        },
        {
            id: 3,
            label: "Software Engineer",
            description: "VASTech, ZA",
            date_start: "2022-09-01",
            iconPath: icons["vastech"],
            url: "https://www.vastech.co.za/"
        },
        {
            id: 4,
            label: "Software Engineer",
            description: "Zenseact, SE",
            date_start: "2024-01-01",
            iconPath: icons["zenseact"],
            url: "https://zenseact.com/our-software/"
        }
    ];

    const shuffleItems: ShuffleItem[] = [
        { id: 0, content: "Shuffle Item 1" },
        { id: 1, content: "Shuffle Item 2" },
        { id: 2, content: "Shuffle Item 3" },
        { id: 3, content: "Shuffle Item 4" },
        { id: 4, content: "Shuffle Item 5" }
    ];

    let selectedIndex: number | null = $state(null);
</script>

<div class="flex">
    <VerticalNavBar {title} {iconPath} {links} />
    <div class="flex w-full flex-col items-center bg-gray-800 p-10">
        <div class="text-9xl text-red-500">Site is WIP</div>
        <HorizontalTimeline {items} update_selected={(new_index) => (selectedIndex = new_index)} />
        <ShuffleBoard items={shuffleItems} highlighted_id={selectedIndex} />
    </div>
</div>
