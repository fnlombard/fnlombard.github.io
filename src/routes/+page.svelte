<script lang="ts">
    import { icons } from "$lib/icons";
    import VerticalNavBar from "$lib/components/vertical-nav-bar/VerticalNavBar.svelte";
    import Timeline from "$lib/components/timeline/Timeline.svelte";

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

    const items: TimelineItem[] = [
        {
            id: 0,
            title: "BEng Robitics (Cum Laude)",
            institution: "Stellenbosch University",
            short_description: "Stellenbosch University, ZA",
            description: "Long Description",
            responsibilities: ["List Item 1", "List Item 2"],
            technologies: ["Tech 1", "Tech 2"],
            date_start: "2014-01-01",
            iconPath: icons["stellenbosch"],
            url: "https://ee.sun.ac.za/"
        },
        {
            id: 1,
            title: "MEng Electronic Engineering",
            institution: "Electronic Systems Laboratory",
            short_description: "Stellenbosch University, ZA",
            description: "Long Description",
            responsibilities: ["List Item 1", "List Item 2"],
            technologies: ["Tech 1", "Tech 2"],
            date_start: "2018-01-01",
            iconPath: icons["esl"],
            url: "https://www.esl.sun.ac.za/"
        },
        {
            id: 2,
            title: "Software Engineer",
            institution: "S-PLANE",
            short_description: "S-PLANE, ZA",
            description: "Long Description",
            responsibilities: ["List Item 1", "List Item 2"],
            technologies: ["Tech 1", "Tech 2"],
            date_start: "2020-01-01",
            iconPath: icons["splane"],
            url: "https://s-plane.com/products/isr-payload-operation/paragonisr/"
        },
        {
            id: 3,
            title: "Software Engineer",
            institution: "VASTech",
            short_description: "VASTech, ZA",
            description: "Long Description",
            responsibilities: ["List Item 1", "List Item 2"],
            technologies: ["Tech 1", "Tech 2"],
            date_start: "2022-09-01",
            iconPath: icons["vastech"],
            url: "https://www.vastech.co.za/"
        },
        {
            id: 4,
            title: "Software Engineer",
            institution: "Zenseact",
            short_description: "Zenseact, SE",
            description: "Long Description",
            responsibilities: ["List Item 1", "List Item 2"],
            technologies: ["Tech 1", "Tech 2"],
            date_start: "2024-01-01",
            iconPath: icons["zenseact"],
            url: "https://zenseact.com/our-software/"
        }
    ];
</script>

<div class="flex">
    <VerticalNavBar {title} {iconPath} {links} />
    <div class="flex w-full flex-col items-center bg-gray-800 p-10">
        <Timeline {items} />
    </div>
</div>
