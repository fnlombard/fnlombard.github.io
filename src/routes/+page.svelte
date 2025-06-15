<script lang="ts">
    import Timeline from "$lib/components/timeline/Timeline.svelte";
    import data from "$lib/data/cv.json";

    const today = new Date().toISOString().split("T")[0];

    const items: TimelineItem[] = data
        .map((item, index) => ({
            id: index,
            ...item,
            date_end: item.date_end === "current" ? today : item.date_end
        }))
        .sort((a, b) => {
            return new Date(b.date_start).getTime() - new Date(a.date_start).getTime();
        });
</script>

<Timeline {items} />
