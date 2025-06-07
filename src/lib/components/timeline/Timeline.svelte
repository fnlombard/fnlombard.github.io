<script lang="ts">
    import HorizontalTimeline from "./HorizontalTimeline.svelte";
    import VerticalTimline from "./VerticalTimline.svelte";

    interface timelineProps {
        items: TimelineItem[];
    }

    const props: timelineProps = $props();
    let selectedIndex: number | null = $state(null);
</script>

<div class="flex w-full flex-col">
    <HorizontalTimeline
        items={props.items}
        update_selected={(index) => {
            selectedIndex = index;
        }}
    />
    <VerticalTimline
        items={props.items}
        highlighted_id={selectedIndex !== null ? props.items[selectedIndex].id : null}
    />
</div>
