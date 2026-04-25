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

    const accentBorder = $derived(
        props.item.type === "study"
            ? "border-l-cyan-400"
            : props.item.type === "work"
              ? "border-l-amber-400"
              : "border-l-indigo-400"
    );
</script>

<div
    class="flex-1 rounded-xl p-5 text-white transition-all duration-300
        bg-gradient-to-br backdrop-blur-sm
        border border-l-2 border-slate-700/40
        {props.item.isHighlighted
            ? `from-slate-700/60 to-slate-900/70 shadow-md shadow-black/30 ${accentBorder}`
            : 'from-slate-800/50 to-slate-900/60 border-l-transparent hover:from-slate-800/60 hover:to-slate-900/65 hover:border-slate-600/40'}"
>
    <div class="flex justify-between text-base font-bold">
        <div class="text-white">{props.item.title}</div>
        <div class="text-slate-300">{props.item.organization}</div>
    </div>
    <div class="my-2 flex items-center gap-2 text-sm">
        <span class="text-amber-300">{props.item.date_start}</span>
        {#if props.item.date_end}
            <span class="text-slate-500">→</span>
            <span class="text-amber-300">{props.item.date_end}</span>
        {/if}
        {#if totalTime !== "NaN days"}
            <span class="text-slate-500">({totalTime})</span>
        {/if}
    </div>
    <div class="my-2 text-sm text-slate-300">{@html customMarkdown(props.item.description)}</div>
    {#each props.item.highlights as responsibility}
        <div class="mt-1 text-sm text-slate-400">- {@html customMarkdown(responsibility)}</div>
    {/each}
    {#if props.item.outcomes.length > 0}
        <div class="mt-4 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Outcomes
        </div>
        <div class="flex flex-wrap gap-1.5">
            {#each props.item.outcomes as tech}
                <span
                    class="rounded-md border border-slate-600/40 bg-slate-700/50 px-2 py-0.5 text-xs text-slate-300"
                    >{tech}</span
                >
            {/each}
        </div>
    {/if}
</div>
