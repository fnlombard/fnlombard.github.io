<script lang="ts">
    interface IProps {
        item: TimelineItem;
        isSelected?: boolean;
    }

    const props: IProps = $props();
</script>

<div class="relative flex gap-4">
    <!-- Date + Line -->
    <!-- <div class="mt-4 mb-8 flex w-24 flex-col items-center">
        <div class="w-full pr-2 text-right text-sm text-gray-300">{props.item.date_start}</div>
        <div class="mt-4 w-1 flex-auto bg-amber-100"></div>
        <div class="h-3 w-3 rounded-full bg-amber-100"></div>
    </div> -->

    <!-- Card -->
    <div class="mb-4 flex-1 rounded bg-gray-700 p-4 text-white shadow">
        <div class="flex justify-between text-lg font-bold">
            <div>{props.item.title}</div>
            <div>{props.item.institution}</div>
        </div>
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
</div>
