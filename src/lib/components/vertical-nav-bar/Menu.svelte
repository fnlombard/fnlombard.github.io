<script lang="ts">
    import Button from "../button/Button.svelte";

    interface menuProps {
        external_links: Link[];
        navigation_links: Link[];
        collapsed: boolean;
    }

    let props: menuProps = $props();

    let selected_menu_item_index = $state(0);

    function selectMenuItem(index: number) {
        selected_menu_item_index = index;
    }
</script>

<div class="flex w-full flex-col">
    <div>
        {#each props.navigation_links as link, index}
            <a class="w-10" href={link.url} onclick={() => selectMenuItem(index)}>
                <Button
                    label={link.label}
                    disabled={false}
                    iconPath={link.icon}
                    collapsed={props.collapsed}
                    isSelected={selected_menu_item_index === index}
                />
            </a>
        {/each}
    </div>

    <hr class="my-4 border-gray-700" />

    <div>
        {#each props.external_links as link}
            <a class="w-10" href={link.url} target="_blank">
                <Button
                    label={link.label}
                    disabled={false}
                    iconPath={link.icon}
                    collapsed={props.collapsed}
                />
            </a>
        {/each}
    </div>
</div>
