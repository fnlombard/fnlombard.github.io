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
    <div>
        <HorizontalTimeline {items} />
    </div>
    <div class="pt-32 md:pt-24">
        <VerticalTimeline {items} />
    </div>
</div>
