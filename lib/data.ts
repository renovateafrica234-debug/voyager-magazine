export type Article = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  gallery: string[];
  author: string;
  authorRole: string;
  authorImage: string;
  date: string;
  readTime: string;
  premium?: boolean;
  video?: boolean;
};

export const articles: Article[] = [
  {
    id: "obi-cubana",
    title: "Obi Cubana: A Legacy of Influence in Nigerian Business",
    excerpt: "From a humble lounge in Oba to a nationwide luxury brand — the inside story of Nigeria's most celebrated hospitality mogul.",
    content: `Obi Cubana's journey from the small town of Oba in Anambra State to becoming one of Nigeria's most recognizable hospitality entrepreneurs is a masterclass in vision, resilience, and cultural branding.

In 2006, what started as a modest lounge in Oba has evolved into the Cubana Group — a conglomerate spanning nightclubs, restaurants, real estate, and luxury lifestyle services across Nigeria's major cities.

The turning point came in 2021, when the burial of his mother became a national phenomenon. But beyond the spectacle lies a calculated business mind that understands the intersection of luxury, culture, and Nigerian aspiration.

Today, Cubana's influence extends far beyond hospitality. He's become a symbol of what ambitious Nigerian entrepreneurship looks like when rooted in authenticity and scaled with precision.

His latest ventures into luxury real estate and import-export signal a maturation of the brand — from nightlife king to diversified business mogul. For Voyager, this is the story of how one man redefined what it means to build a luxury brand in Africa's most dynamic economy.`,
    category: "Culture",
    image: "/images/obi-cubana.jpg",
    gallery: ["/images/obi-cubana-3.jpg", "/images/Obi-Cubana2.jpg"],
    author: "Voyager Editorial",
    authorRole: "Chief Editor",
    authorImage: "/images/obi-cubana.jpg",
    date: "June 26, 2026",
    readTime: "10 min",
    premium: true,
    video: true,
  },
  {
    id: "abuja-luxury",
    title: "Abuja's Hidden Luxury: The New Gold Standard",
    excerpt: "Inside the gated communities, penthouses, and waterfront estates redefining premium living in the capital.",
    content: `Abuja's luxury real estate market has quietly become one of the most sophisticated in West Africa. From the hills of Maitama to the waterfronts of Jabi, a new standard of living is emerging — one that rivals anything in Lagos or Johannesburg.

The city's unique position as Nigeria's political capital has created a concentration of wealth that demands world-class amenities. Gated estates now feature smart home technology, private cinemas, and concierge services that would feel at home in Dubai or London.

What makes Abuja's luxury market distinct is its blend of space and serenity. Unlike Lagos, where luxury often means vertical living, Abuja offers sprawling estates with genuine privacy — a rarity in modern African cities.`,
    category: "Travel",
    image: "/images/obi-cubana-3.jpg",
    gallery: ["/images/Obi-Cubana2.jpg", "/images/Obi-cubana-2-.jpeg"],
    author: "Amina Bello",
    authorRole: "Real Estate Editor",
    authorImage: "/images/obi-cubana.jpg",
    date: "June 24, 2026",
    readTime: "6 min",
  },
  {
    id: "monaco",
    title: "Monaco: Where the Mediterranean Meets Majesty",
    excerpt: "A jewel on the French Riviera that continues to define the art of luxury living.",
    content: `Monaco needs no introduction. This 2.1-square-kilometer principality has been the world's benchmark for luxury longer than most nations have existed.

From the iconic Casino de Monte-Carlo to the harbor filled with superyachts, Monaco represents the pinnacle of European sophistication. But beyond the glitz lies a surprisingly livable city-state with excellent infrastructure, world-class healthcare, and unmatched security.

For African entrepreneurs and creatives, Monaco offers something increasingly rare: a neutral ground where business can be conducted without the baggage of colonial history or geopolitical tension.`,
    category: "Travel",
    image: "/images/Obi-Cubana2.jpg",
    gallery: ["/images/obi-cubana-3.jpg"],
    author: "Tara Obi",
    authorRole: "Travel Editor",
    authorImage: "/images/obi-cubana.jpg",
    date: "June 22, 2026",
    readTime: "5 min",
    premium: true,
    video: true,
  },
  {
    id: "greenland",
    title: "Glimmers of Ice: Greenland",
    excerpt: "The world's largest island offers a landscape so dramatic it feels otherworldly.",
    content: `Greenland defies every expectation. It's the world's largest island, yet home to only 56,000 people. It's covered in ice, yet warming faster than anywhere on Earth.

For the adventurous traveler, Greenland offers experiences that simply don't exist elsewhere. The Ilulissat Icefjord, a UNESCO World Heritage site, calves icebergs the size of city blocks into Disko Bay. The Northern Lights dance across the sky for months on end.`,
    category: "Travel",
    image: "/images/Obi-cubana-2-.jpeg",
    gallery: ["/images/obi-cubana-3.jpg"],
    author: "Zara Adeyemi",
    authorRole: "Culture Editor",
    authorImage: "/images/obi-cubana.jpg",
    date: "June 20, 2026",
    readTime: "7 min",
  },
  {
    id: "fashion-week",
    title: "Lagos Fashion Week 2026: The Designers Who Stole the Show",
    excerpt: "From avant-garde runway pieces to wearable art, here are the collections everyone is talking about.",
    content: `Lagos Fashion Week 2026 will be remembered as the year Nigerian design fully claimed its place on the global stage. The runways at the Federal Palace Hotel showcased collections that were unapologetically African in inspiration and uncompromisingly global in execution.

Standout moments included Kenneth Ize's continuation of his aso-oke revolution, Mowalola's provocative fusion of Yoruba tailoring with London streetwear, and emerging designer Aisha Kabir's sculptural pieces that referenced Hausa architecture.`,
    category: "Fashion",
    image: "/images/obi-cubana-3.jpg",
    gallery: ["/images/Obi-Cubana2.jpg", "/images/Obi-cubana-2-.jpeg"],
    author: "Zara Adeyemi",
    authorRole: "Culture Editor",
    authorImage: "/images/obi-cubana.jpg",
    date: "June 18, 2026",
    readTime: "4 min",
    premium: true,
  },
  {
    id: "kano-culture",
    title: "Kano's Ancient Walls: A 700-Year Legacy Under Threat",
    excerpt: "As modern development encroaches, conservationists race to preserve one of Africa's most significant historical landmarks.",
    content: `The ancient walls of Kano, stretching 14 kilometers and rising up to 15 meters in places, have stood since the 14th century. They are the most complete example of medieval African military architecture surviving anywhere on the continent.

But today, the walls face an existential threat. Urban expansion, lack of maintenance funding, and climate-induced erosion are combining to destroy a heritage that belongs not just to Nigeria, but to all of humanity.`,
    category: "Culture",
    image: "/images/Obi-Cubana2.jpg",
    gallery: ["/images/obi-cubana-3.jpg"],
    author: "Ibrahim Musa",
    authorRole: "History Correspondent",
    authorImage: "/images/obi-cubana.jpg",
    date: "June 15, 2026",
    readTime: "7 min",
  },
];

export const categories = ["All", "Culture", "Travel", "Fashion", "Real Estate", "Technology", "Lifestyle"];

export const editors = [
  {
    name: "Emeka Phenson Ogamba",
    role: "Chief Editor & Founder",
    bio: "Award-winning journalist and media entrepreneur. Former editor at ThisDay Style and founding partner at WhiteLion Voyage. Emeka has spent 15 years documenting Africa's luxury and cultural landscape.",
    image: "/images/obi-cubana.jpg",
    email: "editor@voyagermagazine.africa",
  },
  {
    name: "Jane Mayhem",
    role: "Creative Director",
    bio: "Visual storyteller and brand strategist. Jane leads Voyager's aesthetic direction, ensuring every image, layout, and experience meets our gold standard.",
    image: "/images/obi-cubana-3.jpg",
    email: "creative@voyagermagazine.africa",
  },
];

export const ads = [
  { id: "ad1", title: "Emirates First Class", subtitle: "Abuja → Dubai from ₦2.4M", image: "/images/Obi-cubana-2-.jpeg", cta: "Book Now" },
  { id: "ad2", title: "WhiteLion Voyage", subtitle: "Luxury African Expeditions", image: "/images/Obi-Cubana2.jpg", cta: "Explore" },
];
