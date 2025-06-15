<script lang="ts">
    import { customMarkdown } from "$lib/markdown";
    interface IProps {
        item: TimelineItem;
        isSelected: boolean;
    }

    const props: IProps = $props();

    const dateStart = new Date(props.item.date_start);
    const dateEnd = new Date(props.item.date_end);

    const diffTime = dateEnd.getTime() - dateStart.getTime();
    const diffDaysTotal = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    let years = dateEnd.getFullYear() - dateStart.getFullYear();
    let months = dateEnd.getMonth() - dateStart.getMonth();
    let days = dateEnd.getDate() - dateStart.getDate();

    if (days < 0) {
        months--;
        const prevMonth = new Date(dateEnd.getFullYear(), dateEnd.getMonth(), 0);
        days += prevMonth.getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }

    let totalTime = $state("");
    if (years > 1) {
        totalTime = `${years} years${months > 0 ? ` and ${months} months` : ""}`;
    } else if (years === 1) {
        totalTime = `${years} year${months > 0 ? ` and ${months} months` : ""}`;
    } else if (months > 1) {
        totalTime = `${months} months${days > 0 ? ` and ${days} days` : ""}`;
    } else if (months === 1) {
        totalTime = `${months} month${days > 0 ? ` and ${days} days` : ""}`;
    } else {
        totalTime = `${diffDaysTotal} days`;
    }
</script>

<div
    class="flex-1 rounded bg-gray-700 p-4 text-white {props.isSelected
        ? 'outline-1 outline-amber-100'
        : ''}"
>
    <div class="flex justify-between text-lg font-bold">
        <div>{props.item.title}</div>
        <div>{props.item.organization}</div>
    </div>
    <div class="my-2 text-sm text-gray-400">
        {props.item.date_start}
        {props.item.date_end ? ` → ${props.item.date_end}` : ""}
        ({totalTime})
    </div>
    <div class="my-2 text-sm">{@html customMarkdown(props.item.description)}</div>
    {#each props.item.highlights as responsibility}
        <div class="mt-1 text-sm text-gray-200">- {responsibility}</div>
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
