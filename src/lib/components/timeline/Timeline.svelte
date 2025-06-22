<script lang="ts">
    import HorizontalTimeline from "./HorizontalTimeline.svelte";
    import VerticalTimeline from "./VerticalTimeline.svelte";

    interface timelineProps {
        items: TimelineItem[];
    }

    const props: timelineProps = $props();

    const items: TimelineItemVM[] = $state(
        props.items.map((item) => ({
            ...item,
            isHighlighted: false,
            left: 0,
            zIndex: null
        }))
    );
</script>

<div class="flex flex-col">
    <div class="sticky top-0 z-10 h-30 bg-gray-800">
        <HorizontalTimeline {items} />
    </div>
    <div class="px-8">
        <VerticalTimeline {items} />
    </div>
</div>
