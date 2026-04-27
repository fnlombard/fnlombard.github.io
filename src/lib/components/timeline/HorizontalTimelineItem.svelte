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
        {item.isFocused ? 'scale-110' : 'scale-75 opacity-50 hover:scale-95 hover:opacity-90'}"
    {onclick}
>
    {#if item.isSubEntry}
        <!-- Sub-entry: dot marker instead of logo -->
        <div
            class="h-3 w-3 rounded-full border-2 transition-all duration-300
                {item.isHighlighted
                    ? accent === 'study'
                        ? 'border-cyan-200 bg-cyan-200 scale-125'
                        : 'border-amber-200 bg-amber-200 scale-125'
                    : 'border-amber-200/60 bg-amber-200/60'}"
        ></div>
    {:else}
        <!-- Opaque background disc so the timeline line never shows through -->
        <div
            class="absolute inset-0 scale-[1.7] rounded-full
                {accent === 'study' ? 'bg-cyan-950' : 'bg-slate-950'}"
        ></div>
        <!-- Accent outline ring — active when highlighted, dim otherwise -->
        <div
            class="absolute inset-0 scale-[1.4] rounded-full border transition-colors duration-300
                {item.isHighlighted
                    ? accent === 'study'
                        ? 'border-cyan-200'
                        : 'border-amber-200'
                    : 'border-slate-600'}"
        ></div>
        <!-- Icon -->
        <div class="relative z-10 h-5 w-5">
            <Icon path={item.iconPath} is_focused={item.isHighlighted} />
        </div>
    {/if}
</button>
