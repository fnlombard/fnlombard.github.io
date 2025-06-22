<script lang="ts">
    import { customMarkdown } from "$lib/markdown";
    interface IProps {
        item: TimelineItemVM;
    }

    const props: IProps = $props();

    const dateStart = new Date(props.item.date_start);
    const dateEnd = new Date(props.item.date_end);

    const diffDaysTotal = Math.floor(
        (dateEnd.getTime() - dateStart.getTime()) / (1000 * 60 * 60 * 24)
    );

    const years = Math.floor(diffDaysTotal / 365);
    const months = Math.floor((diffDaysTotal % 365) / 30);
    const days = (diffDaysTotal % 365) % 30;

    let totalTime = $state("");
    if (years > 0) {
        totalTime = `${years} year${years === 1 ? "" : "s"}${months > 0 ? ` and ${months} months` : ""}`;
    } else if (months > 0) {
        totalTime = `${months} month${months === 1 ? "" : "s"}${days > 0 ? ` and ${days} days` : ""}`;
    } else {
        totalTime = `${days} days`;
    }
</script>

<div
    class="flex-1 rounded bg-gray-700 p-4 text-white {props.item.isHighlighted
        ? 'outline-1 outline-amber-100'
        : ''}"
>
    <div class="flex justify-between text-lg font-bold">
        <div>{props.item.title}</div>
        <div>{props.item.organization}</div>
    </div>
    <div class="my-2 flex text-sm text-amber-100">
        {props.item.date_start}
        {props.item.date_end ? ` → ${props.item.date_end}` : ""}
        {#if totalTime !== "NaN days"}
            <div class="ml-2 text-gray-400">
                ({totalTime})
            </div>
        {/if}
    </div>
    <div class="my-2 text-sm">{@html customMarkdown(props.item.description)}</div>
    {#each props.item.highlights as responsibility}
        <div class="mt-1 text-sm text-gray-200">- {@html customMarkdown(responsibility)}</div>
    {/each}
    {#if props.item.outcomes.length > 0}
        <div class="text mt-4 mb-2 font-semibold">Outcomes</div>
        <div class="flex flex-wrap gap-2">
            {#each props.item.outcomes as tech}
                <span class="rounded bg-gray-600 px-2 py-1 text-xs">{tech}</span>
            {/each}
        </div>
    {/if}
</div>
