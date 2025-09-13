interface Speaker {
  name: string;
  role: string;
  company: string;
  img: string;
}

const speakersData: Speaker[] = [
  {
    name: "Indranil Chandra",
    role: "ML & Data Architect",
    company: "Upstox",
    img: "/speakers/indranil-chandra.jpg",
  },
  {
    name: "Katja Sirazitdinova",
    role: "Sr. Dev Advocate",
    company: "NVIDIA",
    img: "/speakers/katja-sirazitdinova.jpg",
  },
  {
    name: "Srushti Raybhoge",
    role: "Software Engineer",
    company: "Addepar",
    img: "/speakers/srushti-raybhoge.jpg",
  },
  {
    name: "Tarun Jain",
    role: "Super Agent",
    company: "AI Planet",
    img: "/speakers/tarun-r-jain.png",
  },
];

export default speakersData;
