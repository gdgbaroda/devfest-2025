interface ScheduleItem {
  title: string;
  speaker?: string;
  time: string;
}

interface ScheduleSection {
  title: string;
  items: ScheduleItem[];
}

const scheduleData: ScheduleSection[] = [
  {
    title: "Keynote",
    items: [
      {
        title: "Opening Keynote",
        time: "9:30 - 9:45 AM",
      },
    ],
  },
  {
    title: "Slot 1",
    items: [
      {
        title: "Decoding the Giants- Unveiling the mysteries of LLMs",
        speaker: "Aashi Dutt",
        time: "9:45 - 10:30 AM",
      },
    ],
  },
  {
    title: "Slot 2",
    items: [
      {
        title:
          "Introduction to no-code gaming platforms and develop games for VR",
        speaker: "Harsh Mehta",
        time: "10:45 - 11:00 AM",
      },
    ],
  },
  {
    title: "Slot 3",
    items: [
      {
        title:
          "How to Ideate, Build and Launch your AI Powered Chrome Extension Under 30 Minutes",
        speaker: "Ashish Kamathi",
        time: "11:00 - 11:30 AM",
      },
    ],
  },
  {
    title: "Slot 4",
    items: [
      {
        title: "Statistical AI and Gen AI",
        speaker: "Jay Rajvadiya",
        time: "11:30 - 11:45 AM",
      },
    ],
  },
  {
    title: "Slot 5",
    items: [
      {
        title: "Navigating the AI Landscape with Prompt Engineering",
        speaker: "Vinu Abinayaa",
        time: "11:45 - 12:30 PM",
      },
    ],
  },
  {
    title: "Slot 6",
    items: [
      {
        title: "Lunch Break",
        speaker: "",
        time: "12:30 - 2:00 PM",
      },
    ],
  },
  {
    title: "Slot 7",
    items: [
      {
        title: "Game",
        speaker: "",
        time: "2:00 - 2:15 PM",
      },
    ],
  },
  {
    title: "Slot 8",
    items: [
      {
        title: "Retrieval Augmented Generation(RAG) explained with Gemma",
        speaker: "Ashok Vishwakarma",
        time: "2:15 - 2:50 PM",
      },
    ],
  },
  {
    title: "Slot 9",
    items: [
      {
        title: "Gemini for Developers",
        speaker: "Priya Sindkar",
        time: "2:50 - 3:05 PM",
      },
    ],
  },
  {
    title: "Slot 10",
    items: [
      {
        title: "Genkit: The AI Alchemist Turning Your Apps into Gold",
        speaker: "Pawan Kumar",
        time: "3:05 - 3:45 PM",
      },
    ],
  },
  {
    title: "Slot 11",
    items: [
      {
        title: "Sponsor slot 1",
        speaker: "Manoranjan Padhey",
        time: "3:45 - 4:00 PM",
      },
    ],
  },
  {
    title: "Slot 12",
    items: [
      {
        title: "Unlock the Power of Flutter Dev tools",
        speaker: "Vaidehi Shah",
        time: "4:00 - 4:35 PM",
      },
    ],
  },
  {
    title: "Slot 13",
    items: [
      {
        title: "Closing note",
        time: "4:35 - 5:00 PM",
      },
    ],
  },
];

export type { ScheduleItem, ScheduleSection };
export default scheduleData;
