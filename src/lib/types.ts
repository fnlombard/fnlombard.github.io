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
    institution: string;
    short_description: string;
    description: string;
    responsibilities: string[];
    technologies: string[];
    date_start: string;
    iconPath: string;
    url: string;
}