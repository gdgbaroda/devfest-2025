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
    img: "/speakers/tarun-r-jain.jpg",
  },
  {
    name: "Prajyot Mainkar",
    role: "Founder",
    company: "Sofueled",
    img: "/speakers/prajyot-mainkar.jpg",
  },
  {
    name: "Amey Nerkar",
    role: "GDE for Payments",
    company: "",
    img: "/speakers/amey-nerkar.jpg",
  },
  {
    name: "Geeta Kakrani",
    role: "AI consultantm, GDE",
    company: "",
    img: "/speakers/geeta-kakrani.jpg",
  },
  {
    name: "Bhavesh Bhatt",
    role: "AVP Generative AI and YouTuber",
    company: "IDFC First Bank",
    img: "/speakers/bhavesh-bhatt.jpg",
  },
];

export default speakersData;
