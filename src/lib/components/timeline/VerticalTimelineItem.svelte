<script lang="ts">
    interface IProps {
        item: TimelineItem;
        isSelected?: boolean;
    }

    const props: IProps = $props();
</script>

<div class="mb-2 rounded bg-gray-700 p-2 text-white shadow">
    {props.item.label}
</div>
