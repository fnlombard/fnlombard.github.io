<script lang="ts">
    interface IProps {
        item: TimelineItem;
        isSelected: boolean;
    }

    const props: IProps = $props();
</script>

<div class="flex-1 rounded bg-gray-700 p-4 text-white">
    <div class="flex justify-between text-lg font-bold">
        <div>{props.item.title}</div>
        <div>{props.item.organization}</div>
    </div>
    <div class="my-2 text-sm text-gray-400">
        {props.item.date_start} → {props.item.date_end}
    </div>
    <div class="my-2 text-sm">{props.item.description}</div>
    {#each props.item.highlights as responsibility}
        <div class="mt-1 text-sm text-gray-200">- {responsibility}</div>
    {/each}
    {#if props.item.growth_points.length > 0}
        <div class="mt-4 mb-2 text-sm font-semibold">Technologies:</div>
        <div class="flex flex-wrap gap-2">
            {#each props.item.growth_points as tech}
                <span class="rounded bg-gray-600 px-2 py-1 text-xs">{tech}</span>
            {/each}
        </div>
    {/if}
</div>
