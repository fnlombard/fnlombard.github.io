<script lang="ts">
    interface iconProps {
        path: string;
        is_focused?: boolean;
    }

    const props: iconProps = $props();
</script>

<!-- Wrap the SVGs in a span with defined size and no overflow -->
<div class="relative h-full w-full overflow-visible">
    <!-- Stroke SVG -->
    <svg
        class="absolute inset-0 h-full w-full fill-none stroke-amber-100 stroke-1"
        class:opacity-0={props.is_focused}
        class:opacity-100={!props.is_focused}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 25 25"
    >
        <path d={props.path} />
    </svg>

    <!-- Fill SVG -->
    <svg
        class="absolute inset-0 h-full w-full fill-amber-100 drop-shadow-sm drop-shadow-amber-100 transition-opacity duration-300"
        class:opacity-0={!props.is_focused}
        class:opacity-100={props.is_focused}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 25 25"
    >
        <path d={props.path} />
    </svg>
</div>
