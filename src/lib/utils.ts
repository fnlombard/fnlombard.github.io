import { todayStr } from "$lib/constants";

export function normalizeDate(dateString: string): string {
    return dateString.toLowerCase() === "current" ? todayStr : dateString;
}

export function toDate(dateString: string): number {
    return new Date(normalizeDate(dateString)).getTime();
}
