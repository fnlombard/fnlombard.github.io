<script lang="ts">
    import Timeline from "$lib/components/timeline/Timeline.svelte";
    import data from "$lib/data/cv.json";

    const today = new Date().toISOString().split("T")[0];

    const allItems: TimelineItem[] = data.map((item, index) => ({
        id: index,
        ...item,
        type: item.type as "study" | "work" | undefined,
        date_end: item.date_end === "current" ? today : item.date_end
    }));

    const studyItems: TimelineItem[] = allItems
        .filter((item) => item.type === "study")
        .sort((a, b) => new Date(b.date_start).getTime() - new Date(a.date_start).getTime());

    const workItems: TimelineItem[] = allItems
        .filter((item) => item.type === "work")
        .sort((a, b) => new Date(b.date_start).getTime() - new Date(a.date_start).getTime());
</script>

<Timeline {studyItems} {workItems} />
