interface NavItem {
    label: string;
    icon: string;
    id: string;
}

interface Link {
    label: string;
    url: string;
    icon: string;
}

interface TimelineItem {
    id: number;
    title: string;
    organization: string;
    short_description: string;
    description: string;
    highlights: string[];
    outcomes: string[];
    date_start: string;
    date_end: string;
    iconPath: string;
    url: string;
}

interface TimelineItemVM extends TimelineItem {
    isHighlighted: boolean;
    left: number;
    zIndex: number | null;
}
