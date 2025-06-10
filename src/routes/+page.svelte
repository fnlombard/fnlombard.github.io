<script lang="ts">
    import Timeline from "$lib/components/timeline/Timeline.svelte";
    import data from "$lib/data/cv.json";

    const items: TimelineItem[] = data.map((item, index) => ({
        id: index,
        ...item
    }));
</script>

<div class="px-8">
    <Timeline {items} />
</div>
