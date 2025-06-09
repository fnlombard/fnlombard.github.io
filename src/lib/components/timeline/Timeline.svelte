<script lang="ts">
    import HorizontalTimeline from "./HorizontalTimeline.svelte";
    import VerticalTimeline from "./VerticalTimeline.svelte";

    interface timelineProps {
        items: TimelineItem[];
    }

    const props: timelineProps = $props();
    let selectedIndex: number | null = $state(null);
    let highlighted_id: number | null = $state(null);
</script>

<div class="flex flex-col">
    <div class="sticky top-0 z-10 h-30 bg-gray-800">
        <HorizontalTimeline
            items={props.items}
            update_selected={(index) => {
                selectedIndex = index;
            }}
            {highlighted_id}
        />
    </div>
    <VerticalTimeline
        items={props.items}
        highlight_item={(id) => {
            highlighted_id = id;
        }}
        highlighted_id={selectedIndex !== null ? props.items[selectedIndex].id : null}
    />
</div>
