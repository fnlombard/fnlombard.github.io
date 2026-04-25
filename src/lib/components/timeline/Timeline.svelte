<script lang="ts">
    import HorizontalTimeline from "./HorizontalTimeline.svelte";
    import VerticalTimeline from "./VerticalTimeline.svelte";

    interface timelineProps {
        items?: TimelineItem[];
        studyItems?: TimelineItem[];
        workItems?: TimelineItem[];
    }

    const props: timelineProps = $props();

    function toVM(items: TimelineItem[]): TimelineItemVM[] {
        return items.map((item) => ({
            ...item,
            isHighlighted: false,
            left: 0,
            zIndex: null
        }));
    }

    // Single mode (personal page)
    const singleVMs: TimelineItemVM[] = $state(toVM(props.items ?? []));

    // Dual mode (CV page)
    const studyVMs: TimelineItemVM[] = $state(toVM(props.studyItems ?? []));
    const workVMs: TimelineItemVM[] = $state(toVM(props.workItems ?? []));

    const isDual = props.studyItems !== undefined && props.workItems !== undefined;
</script>

{#if isDual}
    <!-- Dual timeline: Studies + Work on separate tracks -->
    <div class="flex flex-col">
        <HorizontalTimeline
            tracks={[
                { label: "Studies", items: studyVMs, accent: "study" },
                { label: "Work", items: workVMs, accent: "work" }
            ]}
        />
        <!-- Push content below nav (3.5rem) + dual timeline bar (2×64px + 28px info + 1px divider = ~157px) -->
        <div class="pt-[13.5rem]">
            <!-- Studies section -->
            <div class="mb-8 px-4 md:px-8">
                <div
                    class="mb-4 flex items-center gap-3 border-b border-slate-700/40 pb-2 text-xs
                        font-bold uppercase tracking-widest text-cyan-400"
                >
                    <div class="h-3 w-3 rounded-full bg-cyan-400/60"></div>
                    Studies
                </div>
                <VerticalTimeline items={studyVMs} />
            </div>

            <!-- Work section -->
            <div class="px-4 md:px-8">
                <div
                    class="mb-4 flex items-center gap-3 border-b border-slate-700/40 pb-2 text-xs
                        font-bold uppercase tracking-widest text-amber-400"
                >
                    <div class="h-3 w-3 rounded-full bg-amber-400/60"></div>
                    Work
                </div>
                <VerticalTimeline items={workVMs} />
            </div>
        </div>
    </div>
{:else}
    <!-- Single timeline (personal page) -->
    <div class="flex flex-col">
        <HorizontalTimeline
            tracks={[{ label: "", items: singleVMs, accent: "default" }]}
        />
        <!-- Push content below nav (3.5rem) + single timeline bar (64px + 28px info = ~92px) -->
        <div class="pt-[8.5rem]">
            <VerticalTimeline items={singleVMs} />
        </div>
    </div>
{/if}
