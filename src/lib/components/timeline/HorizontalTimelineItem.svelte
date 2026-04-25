<script lang="ts">
    import Icon from "$lib/components/icon/Icon.svelte";

    interface itemProps {
        item: TimelineItemVM;
        accent?: string;
        onclick?: () => void;
    }

    const { item, accent = "default", onclick }: itemProps = $props();
</script>

<button
    class="relative flex h-8 w-8 -translate-x-1/2 cursor-pointer items-center justify-center
        rounded-full transition-all duration-300 focus:outline-none
        {item.isHighlighted ? 'scale-110' : 'scale-75 opacity-50 hover:scale-95 hover:opacity-90'}"
    {onclick}
>
    <!-- Blurred backdrop for readability over the timeline line -->
    <div
        class="absolute inset-0 scale-150 rounded-full blur-sm
            {item.isHighlighted
                ? accent === 'study'
                    ? 'bg-cyan-950/90'
                    : 'bg-slate-950/90'
                : 'bg-slate-950/70'}"
    ></div>
    <!-- Icon -->
    <div class="relative z-10 h-5 w-5">
        <Icon path={item.iconPath} is_focused={item.isHighlighted} />
    </div>
</button>
