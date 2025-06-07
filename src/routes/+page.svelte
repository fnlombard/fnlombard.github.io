<script lang="ts">
    import { icons } from "$lib/icons";
    import VerticalNavBar from "$lib/components/vertical-nav-bar/VerticalNavBar.svelte";
    import Timeline from "$lib/components/timeline/Timeline.svelte";

    const links: Link[] = [
        { label: "GitHub", url: "https://github.com/fnlombard", icon: icons["github"] },
        {
            label: "LinkedIn",
            url: "https://www.linkedin.com/in/fnlombard/",
            icon: icons["linkedin"]
        }
    ];

    const iconPath = "/favicon.png";
    const title = "Francois Lombard";

    const items: TimelineItem[] = [
        {
            id: 0,
            title: "BEng Robitics (Cum Laude)",
            institution: "Stellenbosch University",
            short_description: "Stellenbosch University, ZA",
            description: "I did some things here.",
            responsibilities: [
                "83% average. Received Dean’s Merit for most 3rd and 4th-year modules.",
                "Teaching demonstrator for first and second year engineering mathematics.",
                "Internship at VASTech: Identified unknown signals' framing, modulation, and coding using MATLAB.",
                "Internship at VASTech: Assisted in AfrikaBurn location planning, exporting camp GPS coordinates using JavaFX."
            ],
            technologies: [
                "Electromagnetics and Antenna Design",
                "Digital Signal Processing and Filters",
                "Nonlinear Control Systems",
                "Analogue Micro Electronics",
                "Power Electronics",
                "Computer Embedded Systems",
                "FPGA & VHDL"
            ],
            date_start: "2014-01-01",
            iconPath: icons["stellenbosch"],
            url: "https://ee.sun.ac.za/"
        },
        {
            id: 1,
            title: "MEng Electronic Engineering",
            institution: "Electronic Systems Laboratory",
            short_description: "Stellenbosch University, ZA",
            description:
                "Full-time two-year thesis programme: http://hdl.handle.net/10019.1/107946",
            responsibilities: [
                "70% average. Satellite Systems 813 with a 79% grade.",
                "Co-author: Mining Surveillance Application Using a CubeSat Constellation",
                "Teaching demonstrator for third and fourth year control system theory.",
                "Internship at S-PLANE: Developed an aircraft mock data generator for simulations using Python."
            ],
            technologies: [
                "Orbital Mechanics",
                "Classical Computer Vision",
                "Satellite System Design",
                "Research",
                "Signal Processing"
            ],
            date_start: "2018-01-01",
            iconPath: icons["esl"],
            url: "https://www.esl.sun.ac.za/"
        },
        {
            id: 2,
            title: "Software Engineer",
            institution: "S-PLANE",
            short_description: "S-PLANE, ZA",
            description: "Long Description",
            responsibilities: [
                "Explored HMI software for aircraft cockpits.",
                "Engineered Paragon, a mission-and-aircraft management application.",
                "Integrated AIS and ARGOS-II systems, enabling data handling from datasheets to UIs."
            ],
            technologies: [
                "C++11",
                "Python",
                "Git",
                "SVN",
                "NoesisGUI",
                "XML Code Generation",
                "IData",
                "Qt",
                "C#",
                "WPF",
                "XAML",
                "Visual Studio"
            ],
            date_start: "2020-01-01",
            iconPath: icons["splane"],
            url: "https://s-plane.com/products/isr-payload-operation/paragonisr/"
        },
        {
            id: 3,
            title: "Software Engineer",
            institution: "VASTech",
            short_description: "VASTech, ZA",
            description: "Long Description",
            responsibilities: [
                "Maintained and adapted internal tools for external deployment.",
                "Designed and developed web UIs, facilitating petabyte-scale data analysis.",
                "Participated in INCOSE GYSEOY 2023."
            ],
            technologies: [
                "C++20",
                "Qt",
                "Typescript",
                "Git",
                "Jira",
                "Docker",
                "VueJS",
                "NodeJS",
                "Protobuf",
                "Thrift",
                "WSL",
                "Linux",
                "Jira",
                "Bitbucket",
                "Vite",
                "Conan",
                "VS Code"
            ],
            date_start: "2022-09-01",
            iconPath: icons["vastech"],
            url: "https://www.vastech.co.za/"
        },
        {
            id: 4,
            title: "Software Engineer",
            institution: "Zenseact",
            short_description: "Zenseact, SE",
            description: "Long Description",
            responsibilities: [
                "Maintain and innovate HIL testing frameworks.",
                "Provide internal support to framework users and troubleshoot HIL failures."
            ],
            technologies: [
                "Python",
                "Javascript",
                "Git",
                "Docker",
                "Linux",
                "C++",
                "Jira",
                "Svelte",
                "Typescript",
                "Gerrit",
                "VS Code",
                "Copilot"
            ],
            date_start: "2024-01-01",
            iconPath: icons["zenseact"],
            url: "https://zenseact.com/our-software/"
        }
    ];

    let width = $state("12rem");
    function updateWidth(newWidth: string): void {
        // This function can be used to update the width of the timeline if needed
        console.log("New width:", newWidth);
        width = newWidth;
    }
</script>

<main class="flex max-h-full max-w-full transition-all duration-300" style="margin-left: {width};">
    <VerticalNavBar {title} {iconPath} {links} {updateWidth} />
    <div class="flex w-full flex-col items-center bg-gray-800 px-8">
        <Timeline {items} />
    </div>
</main>
