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
    title: "Morning Sessions",
    items: [
      {
        title: "Registration & Breakfast",
        time: "8:00 - 9:00 AM",
      },
      {
        title: "Opening Keynote",
        speaker: "John Smith",
        time: "9:00 - 10:00 AM",
      },
    ],
  },
  {
    title: "Track 1 - Web Development",
    items: [
      {
        title: "Modern Frontend Frameworks",
        speaker: "Jane Doe",
        time: "10:15 - 11:00 AM",
      },
      {
        title: "Backend Architecture",
        speaker: "Mike Johnson",
        time: "11:15 - 12:00 PM",
      },
    ],
  },
  {
    title: "Afternoon Sessions",
    items: [
      {
        title: "Lunch Break",
        time: "12:00 - 1:00 PM",
      },
      {
        title: "Cloud Computing Workshop",
        speaker: "Sarah Wilson",
        time: "1:00 - 2:30 PM",
      },
    ],
  },
];

export type { ScheduleItem, ScheduleSection };
export default scheduleData;
