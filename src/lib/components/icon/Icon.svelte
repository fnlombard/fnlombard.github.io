<script lang="ts">
    interface iconProps {
        path: string;
        is_focused?: boolean;
    }

    const props: iconProps = $props();
</script>

<!-- Workaround: Cannot transition fill opacity. -->
<div class="relative h-full w-full">
    <!-- Stroke SVG -->
    <svg
        class="absolute h-full w-full fill-none stroke-amber-100 stroke-1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 25 25"
    >
        <path d={props.path} />
    </svg>

    <!-- Fill SVG -->
    <svg
        class="absolute h-full w-full fill-amber-100 transition-opacity duration-300"
        class:opacity-0={!props.is_focused}
        class:opacity-100={props.is_focused}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 25 25"
    >
        <path d={props.path} />
    </svg>
</div>
