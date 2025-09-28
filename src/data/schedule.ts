interface ScheduleItem {
  title: string;
  speaker?: string;
  speakerTitle?: string;
  time: string;
  description?: string;
  level?: 'Started' | 'Progressing' | 'Expert';
  isBreak?: boolean;
}

interface ScheduleSection {
  title: string;
  items: ScheduleItem[];
}

interface ScheduleDay {
  day: string;
  date: string;
  type: string;
  sections: ScheduleSection[];
}

const scheduleData: ScheduleDay[] = [
  {
    day: "Day 1",
    date: "Workshops Day",
    type: "workshops",
    sections: [
      {
        title: "Registration",
        items: [
          {
            title: "Registration + Breakfast",
            time: "8:00 AM - 9:00 AM",
            description: "Welcome and networking",
            isBreak: true
          }
        ]
      },
      {
        title: "Workshop 1",
        items: [
          {
            title: "From Pretrained to Powerful: Fine-Tune Gemma on GCP Vertex AI",
            speaker: "Geeta Kakrani",
            speakerTitle: "AI Consultant, Google Developer Expert (GDE) in ML",
            time: "9:30 AM - 11:30 AM",
            level: "Progressing",
            description: "Take your AI to the next level by fine-tuning Gemma, Google's open-source language model, using Vertex AI on Google Cloud. Learn to fine-tune Gemma easily using Vertex AI, improve model accuracy with your own data, and deploy it at scale with Google Cloud tools."
          }
        ]
      },
      {
        title: "Workshop 2",
        items: [
          {
            title: "The Death of the Funnel, The Rise of the Flywheel",
            speaker: "Prajyot Mainkar",
            speakerTitle: "Founder - Sofueled",
            time: "11:30 AM - 1:30 PM",
            level: "Progressing",
            description: "The traditional marketing funnel is dead. Learn why 'grab attention → win over → push for sale' doesn't work anymore, how people really make decisions in 2025, The Art of Human-in-the-Loop Business, and how to keep customers so happy they bring others with them."
          }
        ]
      },
      {
        title: "Lunch",
        items: [
          {
            title: "Lunch Break",
            time: "1:30 PM - 2:30 PM",
            description: "Networking and refreshments",
            isBreak: true
          }
        ]
      },
      {
        title: "Workshop 3",
        items: [
          {
            title: "Long term Memory layer for Agents using Gemini and Mem0ai",
            speaker: "Tarun R Jain",
            speakerTitle: "Super Agent at AI Planet, GDE in AI",
            time: "2:30 PM - 4:30 PM",
            level: "Started",
            description: "AI Agents are improving, but most lack persistent memory. Learn to build Agents with persistent memory, enable Agents to learn from user interactions, create personalized experiences with long-term memory, and use Gemini and Mem0ai to build memory-aware Agentic workflows using Agno. We will further trace the memory conversation metadata using OPIK."
          }
        ]
      }
    ]
  },
  {
    day: "Day 2",
    date: "Talks & Keynotes Day",
    type: "talks",
    sections: [
      {
        title: "Registration",
        items: [
          {
            title: "Registration + Breakfast",
            time: "8:00 AM - 9:00 AM",
            description: "Welcome and networking",
            isBreak: true
          }
        ]
      },
      {
        title: "Opening",
        items: [
          {
            title: "Welcome Note",
            time: "9:30 AM - 9:45 AM",
            description: "Opening remarks and event introduction"
          },
          {
            title: "Keynote Address",
            speaker: "M Nagarajan",
            time: "9:45 AM - 10:20 AM",
            description: "Opening keynote speech"
          }
        ]
      },
      {
        title: "Session 1",
        items: [
          {
            title: "Leading the Next Generation: Guiding GenZ in an AI-First Era",
            speaker: "Srushti Raybhoge",
            speakerTitle: "Software Engineer 2 @ Addepar",
            time: "10:20 AM - 11:00 AM",
            level: "Started",
            description: "Navigating the AI Revolution as a mentor and Gen Z professional. Building Real AI Applications with Google's Gemini, Vertex AI, Firebase Genkit. High-growth AI career paths and practical workflow for building full-stack AI applications."
          }
        ]
      },
      {
        title: "Session 2",
        items: [
          {
            title: "From Fraud Prevention to Personalized Experiences: AI's Impact on Payments",
            speaker: "Amey Nerkar",
            speakerTitle: "Google Developer Expert (GDE) in Payments",
            time: "11:00 AM - 11:45 AM",
            level: "Progressing",
            description: "AI's role in fraud detection and real-time monitoring, automation of payment processes, AI-driven personalized payment experiences, and tailoring recommendations and rewards based on customer behavior."
          }
        ]
      },
      {
        title: "Session 3",
        items: [
          {
            title: "Don't Just RAG It, Graph It: Smarter Responses with Neo4j & Gemini",
            speaker: "Bhavesh Bhatt",
            speakerTitle: "AVP Generative AI @ IDFC First Bank, GDE in ML",
            time: "11:45 AM - 12:20 PM",
            level: "Progressing",
            description: "Fundamentals of RAG and why graph databases matter. Microsoft GraphRAGs + Neo4j for context-rich responses. Cypher language for unlocking connected data. Gemini's capabilities for accurate synthesis."
          }
        ]
      },
      {
        title: "Session 4",
        items: [
          {
            title: "What is Comfy UI and Why Every Developer Needs to Learn It?",
            speaker: "Shreyan Mehta",
            speakerTitle: "Founder @ Asambhav Solutions",
            time: "12:20 PM - 1:00 PM",
            level: "Started",
            description: "Introduction to Comfy UI for Gen AI models, core functionalities and practical applications, managing workflows and streamlining development, and accelerating deployment of AI-driven products."
          }
        ]
      },
      {
        title: "Lunch",
        items: [
          {
            title: "Lunch Break",
            time: "1:00 PM - 2:15 PM",
            description: "Networking and refreshments",
            isBreak: true
          }
        ]
      },
      {
        title: "Activities",
        items: [
          {
            title: "Games & Activities",
            time: "2:15 PM - 2:30 PM",
            description: "Interactive community engagement",
            isBreak: true
          }
        ]
      },
      {
        title: "Session 5",
        items: [
          {
            title: "The Future of AI: Key Trends Shaping What's Next",
            speaker: "Katja Sirazitdinova",
            speakerTitle: "Sr. Developer Advocate @ NVIDIA",
            time: "2:30 PM - 3:15 PM",
            level: "Progressing",
            description: "Multimodality and agentic workflows, reasoning capabilities in AI systems, scaling laws and autonomous systems, and the next wave of intelligent technology."
          }
        ]
      },
      {
        title: "Session 6",
        items: [
          {
            title: "Can you \"RAG\" like a pro?",
            speaker: "Indranil Chandra",
            speakerTitle: "ML & Data Architect @ Upstox",
            time: "3:15 PM - 4:00 PM",
            level: "Expert",
            description: "Scaling RAG in production environments, dynamic semantic chunking to avoid context dilution, adaptive-k retrieval for recall vs precision balance, building provenance-aware retrieval pipelines, and live demo: stress-testing a RAG system."
          }
        ]
      },
      {
        title: "Panel",
        items: [
          {
            title: "Panel Discussion",
            time: "4:00 PM - 4:30 PM",
            description: "Industry experts discuss AI trends, challenges, and opportunities"
          }
        ]
      },
      {
        title: "Closing",
        items: [
          {
            title: "Closing + Networking",
            time: "4:30 PM - 5:30 PM",
            description: "Final remarks, certificates, and community networking",
            isBreak: true
          }
        ]
      }
    ]
  }
];

export type { ScheduleItem, ScheduleSection, ScheduleDay };
export default scheduleData;