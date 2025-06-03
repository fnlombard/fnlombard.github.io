<script lang="ts">
    import { icons } from "$lib/icons";
    import VerticalNavBar from "$lib/components/vertical-nav-bar/VerticalNavBar.svelte";

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

    let test_collapsed = $state(false);
</script>

<div class="flex">
    <VerticalNavBar {title} {iconPath} {links} />
    <div class="flex-1 p-4">
        <h1 class="text-2xl font-bold">TODO:</h1>
        <ul>
            <li>Make a x-axis timeline component.</li>
            <li>More things...</li>
        </ul>
    </div>
</div>
