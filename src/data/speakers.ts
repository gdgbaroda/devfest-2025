interface Speaker {
  name: string;
  role: string;
  company: string;
  img: string;
}

const speakersData: Speaker[] = [
  {
    name: "Ayush Makwana",
    role: "Senior Developer",
    company: "Tech Corp",
    img: "/Speaker.svg",
  },
  {
    name: "Jane Smith",
    role: "Cloud Architect",
    company: "Cloud Co",
    img: "/Speaker.svg",
  },
  {
    name: "John Doe",
    role: "ML Engineer",
    company: "AI Labs",
    img: "/Speaker.svg",
  },
  {
    name: "Sarah Wilson",
    role: "UX Designer",
    company: "Design Inc",
    img: "/Speaker.svg",
  },
  {
    name: "Mike Johnson",
    role: "DevOps Lead",
    company: "DevOps Pro",
    img: "/Speaker.svg",
  },
  {
    name: "Emily Brown",
    role: "Frontend Expert",
    company: "Web Tech",
    img: "/Speaker.svg",
  },
];

export default speakersData;
