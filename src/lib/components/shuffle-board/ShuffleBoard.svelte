<script module lang="ts">
    export interface ShuffleItem {
        id: number;
        content: string;
    }
</script>

<script lang="ts">
    import { flip } from "svelte/animate";

    interface IProps {
        highlighted_id: number | null;
        items: ShuffleItem[];
    }

    const props: IProps = $props();

    const sortedItems = $derived.by(() => {
        if (props.highlighted_id == null) return props.items;
        return [
            ...props.items.filter((item) => item.id === props.highlighted_id),
            ...props.items.filter((item) => item.id !== props.highlighted_id)
        ];
    });
</script>

{#each sortedItems as item (item.id)}
    <div class="mb-2 rounded bg-gray-700 p-2 text-white shadow" animate:flip>
        <p>{item.content}</p>
    </div>
{/each}
