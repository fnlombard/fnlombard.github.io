<script lang="ts">
    import Timeline from "$lib/components/timeline/Timeline.svelte";
    import data from "$lib/data/cv.json";

    const items: TimelineItem[] = data
        .map((item, index) => ({
            id: index,
            ...item
        }))
        .sort((a, b) => {
            return new Date(b.date_start).getTime() - new Date(a.date_start).getTime();
        });
</script>

<Timeline {items} />
