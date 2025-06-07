<script lang="ts">
    interface IProps {
        item: TimelineItem;
        isSelected?: boolean;
    }

    const props: IProps = $props();
</script>

<div class="mb-2 rounded bg-gray-700 p-2 text-white shadow">
    <div class="text-lg font-bold">{props.item.title} - {props.item.institution}</div>
    <div class="text-sm text-gray-300">{props.item.date_start}</div>
    <div class="mt-1 text-sm">{props.item.description}</div>
    {#each props.item.responsibilities as responsibility}
        <div class="mt-1 text-sm text-gray-200">- {responsibility}</div>
    {/each}
    {#if props.item.technologies.length > 0}
        <div class="mt-2 text-sm font-semibold">Technologies:</div>
        <div class="flex flex-wrap gap-2">
            {#each props.item.technologies as tech}
                <span class="rounded bg-gray-600 px-2 py-1 text-xs">{tech}</span>
            {/each}
        </div>
    {/if}
    {#if props.item.url}
        <a
            href={props.item.url}
            target="_blank"
            class="mt-2 inline-block text-blue-400 hover:underline"
        >
            More Info
        </a>
    {/if}
</div>
