export type SponsorshipTier = {
  id: string;
  name: string;
  subtitle: string;
  investment: string;
  summaryPoints: string[];
  modalTitle: string;
  modalDescription: string;
  inclusions: {
    label: string;
    items: string[];
  }[];
};

export const sponsorshipTiers: SponsorshipTier[] = [
  {
    id: "silver",
    name: "Silver Partner",
    subtitle: "Perfect For Startups, small businesses, and organizations.",
    investment: "INR 25,000 + GST",
    summaryPoints: [
      "2 complimentary tickets",
      "1 seat at the evening dinner",
      "Logo and hyperlink on website",
      "Mention during speeches",
    ],
    modalTitle: "Silver Partner",
    modalDescription:
      "Our Silver Partnership offers an excellent entry point for organizations looking to connect with the DevFest Baroda community while maintaining a budget-friendly approach.",
    inclusions: [
      {
        label: "Benefits",
        items: [
          "2 complimentary tickets to the event",
          "1 seat at the evening dinner with speakers",
          "Logo and hyperlink on the official DevFest website",
          "Logo on the tickets sale website",
          "Mention during the opening and closing speeches",
          "Logo on screens during breaks",
        ],
      },
    ],
  },
  {
    id: "gold",
    name: "Gold Partner",
    subtitle:
      "Perfect for growing companies seeking premium visibility and direct engagement with developers and tech leaders.",
    investment: "INR 50,000 + GST",
    summaryPoints: [
      "5 complimentary tickets",
      "2 seats at the evening dinner",
      "Sponsored social media message",
      "Booth and table for two people",
    ],
    modalTitle: "Gold Partner",
    modalDescription:
      "Elevate your brand with premium positioning at DevFest Baroda. Connect directly with senior engineers, product leaders, and decision-makers who shape technology adoption across India's fastest-growing companies.",
    inclusions: [
      {
        label: "Benefits",
        items: [
          "5 complimentary tickets to the event",
          "2 seats at the evening dinner with speakers",
          "Sponsored social media message",
          "Dedicated Booth and table for two people",
          "Logo and hyperlink on the official DevFest website",
          "Logo on the tickets sale website",
          "Mention during the opening and closing speeches",
          "Logo on screens during breaks",
        ],
      },
    ],
  },
  {
    id: "platinum",
    name: "Platinum Partner",
    subtitle:
      "The ultimate partnership for industry leaders who want to showcase innovation, drive product adoption, and build lasting relationships with India's developer community.",
    investment: "INR 75,000 + GST",
    summaryPoints: [
      "10 complimentary tickets",
      "5 seats at the evening dinner",
      "Prominent logo placement",
      "Enhanced mention during speeches",
    ],
    modalTitle: "Platinum Partner",
    modalDescription:
      "Join the elite circle of technology leaders at DevFest Baroda. As our premier partner, you'll have unmatched access to showcase your products, launch beta programs, and build strategic relationships with the developers who power India's digital transformation.",
    inclusions: [
      {
        label: "Benefits",
        items: [
          "10 complimentary tickets to the event",
          "5 seats at the evening dinner with speakers",
          "More prominent logo placement on all websites and tickets",
          "Enhanced mention during opening and closing speeches",
          "Larger logo display on screens during breaks",
          "A sponsored message on our social media for hiring",
          "Booth and table for two people to meet attendees",
        ],
      },
    ],
  },
];

export default sponsorshipTiers;
