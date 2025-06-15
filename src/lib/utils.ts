export function toDate(dateString: string): number {
    return new Date(dateString).getTime();
}
