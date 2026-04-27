<script lang="ts">
    import HorizontalTimelineItem from "./HorizontalTimelineItem.svelte";
    import { fade } from "svelte/transition";
    import { toDate } from "$lib/utils";

    interface TimelineTrack {
        label: string;
        items: TimelineItemVM[];
        accent: string;
    }

    interface Props {
        tracks: TimelineTrack[];
    }

    const { tracks }: Props = $props();

    // Shared time axis across all tracks
    const allItems = $derived(tracks.flatMap((t) => t.items));

    const minTime = $derived(
        allItems.length > 0 ? Math.min(...allItems.map((i) => toDate(i.date_start))) : Date.now()
    );
    const totalTime = $derived(Date.now() - minTime);

    // Update left % positions whenever the time scale changes
    $effect(() => {
        allItems.forEach((item) => {
            item.left = Math.round(((toDate(item.date_start) - minTime) / totalTime) * 100);
        });
    });

    // --- Grouping ---
    const GROUP_THRESHOLD = 3; // percent

    interface ItemGroup {
        items: TimelineItemVM[];
        left: number;
    }

    function buildGroups(items: TimelineItemVM[]): ItemGroup[] {
        const sorted = [...items].sort((a, b) => a.left - b.left);
        const groups: ItemGroup[] = [];
        for (const item of sorted) {
            const last = groups[groups.length - 1];
            if (last && item.left - last.left < GROUP_THRESHOLD) {
                last.items.push(item);
                last.left =
                    last.items.reduce((s, i) => s + i.left, 0) / last.items.length;
            } else {
                groups.push({ items: [item], left: item.left });
            }
        }
        return groups;
    }

    // Vertical offset for items within a group (stacked above/below the line)
    function getYOffset(idx: number, total: number): number {
        if (total === 1) return 0;
        const spread = (total - 1) * 24;
        return -(spread / 2) + idx * 24;
    }

    // --- Interactions ---
    function scrollToItem(item: TimelineItemVM): void {
        allItems.forEach((i) => {
            i.isHighlighted = false;
            i.isFocused = false;
            i.zIndex = null;
        });
        item.isHighlighted = true;
        item.isFocused = true;
        item.zIndex = 999;
        const el = document.getElementById(String(item.id));
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    /**
     * Highlight items based on proximity to cursor.
     * - Main entry (no isSubEntry): highlights all items with the same organization.
     * - Sub-entry dot: highlights only that specific entry.
     * Within a visually grouped cluster, Y position disambiguates which item is nearest.
     */
    function handleTrackMouseMove(event: MouseEvent, track: TimelineTrack): void {
        const el = event.currentTarget as HTMLElement;
        const rect = el.getBoundingClientRect();
        const pct = ((event.clientX - rect.left) / rect.width) * 100;
        const cursorY = event.clientY - rect.top - rect.height / 2;

        const groups = buildGroups(track.items);
        if (groups.length === 0) return;

        // Find nearest group by X
        const nearestGroup = groups.reduce((best, g) =>
            Math.abs(g.left - pct) < Math.abs(best.left - pct) ? g : best
        );

        // Within the group, pick the item whose center Y is closest to cursor Y
        let nearestItem = nearestGroup.items[0];
        if (nearestGroup.items.length > 1) {
            let closestDist = Infinity;
            nearestGroup.items.forEach((item, idx) => {
                const dist = Math.abs(getYOffset(idx, nearestGroup.items.length) - cursorY);
                if (dist < closestDist) {
                    closestDist = dist;
                    nearestItem = item;
                }
            });
        }

        track.items.forEach((i) => {
            i.isHighlighted = false;
            i.isFocused = false;
            i.zIndex = 0;
        });

        if (nearestItem.isSubEntry) {
            // Dot hover: only this entry is highlighted and focused
            nearestItem.isHighlighted = true;
            nearestItem.isFocused = true;
            nearestItem.zIndex = 999;
        } else {
            // Only co-highlight same-org entries when the org actually has sub-entries
            // in this track (avoids grouping all personal items with empty org).
            const orgHasSubEntries =
                nearestItem.organization !== "" &&
                track.items.some(
                    (i) => i.isSubEntry && i.organization === nearestItem.organization
                );

            if (orgHasSubEntries) {
                track.items
                    .filter((i) => i.organization === nearestItem.organization)
                    .forEach((i) => {
                        i.isHighlighted = true;
                        i.zIndex = 1;
                    });
            }
            // Nearest item is always focused (scaled) and on top
            nearestItem.isHighlighted = true;
            nearestItem.isFocused = true;
            nearestItem.zIndex = 999;
        }
    }

    function handleTrackMouseLeave(track: TimelineTrack): void {
        track.items.forEach((i) => {
            i.isHighlighted = false;
            i.isFocused = false;
            i.zIndex = null;
        });
    }

    // The focused item drives the info bar; prefer non-sub entry when org group is active.
    const highlightedItem = $derived(
        allItems.find((i) => i.isFocused && !i.isSubEntry) ??
        allItems.find((i) => i.isFocused) ??
        null
    );

    // When hovering a main entry whose org has sub-entries, compute total org tenure.
    const orgTotalSpan = $derived(
        (() => {
            if (!highlightedItem || highlightedItem.isSubEntry) return null;
            const track = tracks.find((t) => t.items.includes(highlightedItem));
            if (!track) return null;
            const orgItems = track.items.filter(
                (i) => i.organization === highlightedItem.organization && i.organization !== ""
            );
            if (orgItems.length < 2 || !orgItems.some((i) => i.isSubEntry)) return null;
            const minStart = Math.min(...orgItems.map((i) => toDate(i.date_start)));
            const maxEnd = Math.max(...orgItems.map((i) => toDate(i.date_end)));
            const totalDays = Math.floor((maxEnd - minStart) / (1000 * 60 * 60 * 24));
            const years = Math.floor(totalDays / 365);
            const months = Math.floor((totalDays % 365) / 30);
            if (years > 0) return `${years}y${months > 0 ? ` ${months}m` : ""} total`;
            return `${months}m total`;
        })()
    );

    const isDual = $derived(tracks.length > 1);
</script>

<!-- Fixed bar positioned just below the top nav (top-14 = 3.5rem = 56px) -->
<div
    class="fixed top-14 left-0 right-0 z-40
        bg-gradient-to-b from-slate-800/90 to-slate-900/95 backdrop-blur-md
        border-b border-slate-700/30
        shadow-xl shadow-black/40"
>
    {#each tracks as track, trackIdx}
        {@const groups = buildGroups(track.items)}
        <div
            class="relative h-16 px-4 md:px-8
                {trackIdx > 0 ? 'border-t border-slate-700/20' : ''}"
        >
            <!-- Track label (only in dual mode) -->
            {#if isDual}
                <div
                    class="pointer-events-none absolute left-3 top-1/2 z-20 -translate-y-1/2
                        text-[9px] font-bold uppercase tracking-widest
                        {track.accent === 'study' ? 'text-cyan-400' : 'text-amber-400'}"
                >
                    {track.label}
                </div>
            {/if}

            <!-- Timeline base line (gradient for a nice fade at edges) -->
            <div
                class="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2
                    bg-gradient-to-r from-transparent via-amber-200/40 to-transparent"
            ></div>

            <!-- Items area — handles proximity hover for the whole track row -->
            <div
                class="absolute inset-y-0 right-4 md:right-8 cursor-crosshair
                    {isDual ? 'left-16' : 'left-12'}"
                onmousemove={(e) => handleTrackMouseMove(e, track)}
                onmouseleave={() => handleTrackMouseLeave(track)}
                role="presentation"
            >
                <!-- Duration highlight for each highlighted item in this track -->
                {#each track.items.filter((i) => i.isHighlighted) as hl}
                    {@const w =
                        ((toDate(hl.date_end) - toDate(hl.date_start)) / totalTime) * 100}
                    {@const l = ((toDate(hl.date_start) - minTime) / totalTime) * 100}
                    {#if w > 0.5}
                        <div
                            class="pointer-events-none absolute top-1/2 h-1 -translate-y-1/2 rounded-full
                                {track.accent === 'study'
                                ? 'bg-cyan-500/50'
                                : track.accent === 'work'
                                  ? 'bg-amber-500/50'
                                  : 'bg-amber-200/50'}"
                            style="left: {l}%; width: {w}%"
                            transition:fade={{ duration: 150 }}
                        ></div>
                    {:else}
                        <div
                            class="pointer-events-none absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full
                                {track.accent === 'study'
                                ? 'bg-cyan-400'
                                : track.accent === 'work'
                                  ? 'bg-amber-400'
                                  : 'bg-amber-200'}"
                            style="left: {l}%"
                            transition:fade={{ duration: 150 }}
                        ></div>
                    {/if}
                {/each}

                <!-- Groups -->
                {#each groups as group}
                    <div
                        class="absolute top-1/2 -translate-y-1/2"
                        style="left: {group.left}%"
                        role="presentation"
                    >
                        <!-- Vertical connector line for grouped items -->
                        {#if group.items.length > 1}
                            {@const spread = (group.items.length - 1) * 24}
                            {@const topY = getYOffset(0, group.items.length)}
                            <div
                                class="pointer-events-none absolute left-[3px] z-0 w-px border-l
                                    border-dashed border-slate-500/50"
                                style="top: {topY - 2}px; height: {spread + 4}px"
                            ></div>
                        {/if}

                        <!-- Individual items in the group -->
                        {#each group.items as item, itemIdx}
                            <div
                                class="absolute -translate-y-1/2 transition-all duration-200"
                                style="top: {getYOffset(itemIdx, group.items.length)}px;
                                    z-index: {item.zIndex ?? itemIdx + 1}"
                            >
                                <HorizontalTimelineItem
                                    {item}
                                    accent={track.accent}
                                    onclick={() => scrollToItem(item)}
                                />
                            </div>
                        {/each}
                    </div>
                {/each}
            </div>
        </div>
    {/each}

    <!-- Info strip: always reserves space; shows hovered/clicked item details -->
    <div
        class="h-7 border-t border-slate-700/20 px-4 py-1 text-xs"
        class:opacity-0={!highlightedItem}
    >
        {#if highlightedItem}
            <span class="font-medium text-white">{highlightedItem.title}</span>
            {#if highlightedItem.organization}
                <span class="text-slate-500"> · </span>
                <span class="text-slate-400">{highlightedItem.organization}</span>
            {/if}
            <span class="text-slate-500"> · </span>
            <span class="text-slate-500">{highlightedItem.date_start}</span>
            {#if orgTotalSpan}
                <span class="text-slate-500"> · </span>
                <span class="text-amber-300/70">{orgTotalSpan}</span>
            {/if}
        {/if}
    </div>
</div>
