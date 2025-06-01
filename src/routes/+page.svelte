<script lang="ts">
    import { icons } from "$lib/icons";
    import VerticalNavBar from "$lib/components/vertical-nav-bar/VerticalNavBar.svelte";
    import IconButton from "$lib/components/button/IconButton.svelte";

    const links: Link[] = [
        { label: "GitHub", url: "https://github.com/fnlombard", icon: icons["github"] },
        {
            label: "LinkedIn",
            url: "https://www.linkedin.com/in/fnlombard/",
            icon: icons["linkedin"]
        }
    ];

    const navItems: NavItem[] = [
        { id: "home", label: "Home" },
        { id: "about", label: "About" },
        { id: "settings", label: "Settings" }
    ];

    const iconPath = "/favicon.png";
    const title = "Francois Lombard";

    let test_collapsed = $state(false);
</script>

<div class="flex">
    <VerticalNavBar {title} {navItems} {iconPath} {links} />
    <IconButton
        iconPath={icons["github"]}
        onClick={() => console.log("GitHub clicked")}
        disabled={false}
    />
</div>
