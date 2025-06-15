// Prevent HTML injection
function escapeHTML(str: string): string {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// (text)[link]
function linkMarkdown(str: string): string {
    return str.replace(
        /\((.*?)\)\[(https?:\/\/[^\s\]]+)\]/g,
        '<a href="$2" class="underline text-amber-100 hover:text-blue-300" target="_blank" rel="noopener noreferrer">$1</a>'
    );
}

function boldMarkdown(str: string): string {
    return str.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

function italicsMarkdown(str: string): string {
    return str.replace(/\*(.*?)\*/g, '<em>$1</em>');
}

export function customMarkdown(str: string): string {
    const escaped = escapeHTML(str);
    return [linkMarkdown, boldMarkdown, italicsMarkdown].reduce(
        (acc, fn) => fn(acc),
        escaped
    );
}