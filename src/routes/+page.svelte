<script lang="ts">
    import { icons } from "$lib/icons";
    import VerticalNavBar from "$lib/components/vertical-nav-bar/VerticalNavBar.svelte";
    import Timeline from "$lib/components/timeline/Timeline.svelte";
    import data from "$lib/data/cv.json";

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

    const items: TimelineItem[] = data.map((item, index) => ({
        id: index,
        ...item
    }));

    let width = $state("12rem");
    function updateWidth(newWidth: string): void {
        width = newWidth;
    }
</script>

<main class="flex max-h-full max-w-full transition-all duration-300" style="margin-left: {width};">
    <VerticalNavBar {title} {iconPath} {links} {updateWidth} />
    <div class="flex w-full flex-col items-center bg-gray-800 px-8">
        <Timeline {items} />
    </div>
</main>
