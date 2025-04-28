
import { Artist, Artwork } from "@/types";

export const artists: Artist[] = [
  {
    id: "artist-1",
    name: "Ananya Sharma",
    bio: "Contemporary artist known for vibrant abstract compositions inspired by Indian culture.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop"
  },
  {
    id: "artist-2",
    name: "Vikram Mehta",
    bio: "Specializes in landscape paintings that capture the serene beauty of rural India.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop"
  },
  {
    id: "artist-3",
    name: "Priya Patel",
    bio: "Modern artist exploring the intersection of traditional Indian art forms and contemporary techniques.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop"
  },
  {
    id: "artist-4",
    name: "Rajiv Singh",
    bio: "Digital artist known for blending photography with digital manipulation to create surreal landscapes.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop"
  }
];

export const artworks: Artwork[] = [
  {
    id: "art-1",
    title: "Mystic Ganges at Dawn",
    description: "A vibrant depiction of the holy Ganges river at sunrise, with boats and temples silhouetted against the golden sky.",
    price: 45000,
    image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?q=80&w=500&auto=format&fit=crop",
    category: "Landscape",
    medium: "Oil on Canvas",
    dimensions: "30 x 40 inches",
    artist: artists[0],
    inStock: true
  },
  {
    id: "art-2",
    title: "Urban Rhythms",
    description: "An abstract representation of the hustle and bustle of Mumbai streets, capturing the energy and chaos of urban India.",
    price: 35000,
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?q=80&w=500&auto=format&fit=crop",
    category: "Abstract",
    medium: "Acrylic on Canvas",
    dimensions: "36 x 48 inches",
    artist: artists[1],
    inStock: true
  },
  {
    id: "art-3",
    title: "Himalayan Serenity",
    description: "A peaceful landscape capturing the majestic Himalayan mountains at dusk, with soft pastel colors and gentle brushstrokes.",
    price: 52000,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=500&auto=format&fit=crop",
    category: "Landscape",
    medium: "Watercolor",
    dimensions: "24 x 36 inches",
    artist: artists[2],
    inStock: true
  },
  {
    id: "art-4",
    title: "Monsoon Melodies",
    description: "A contemporary piece capturing the essence of Indian monsoon - the patterns of rain, the scent of wet earth, and the vibrant greenery.",
    price: 28000,
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=500&auto=format&fit=crop",
    category: "Contemporary",
    medium: "Mixed Media",
    dimensions: "30 x 30 inches",
    artist: artists[3],
    inStock: true
  },
  {
    id: "art-5",
    title: "Heritage Echoes",
    description: "A detailed portrayal of ancient Indian architecture, featuring intricate carvings and stunning symmetry of a historic temple.",
    price: 65000,
    image: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?q=80&w=500&auto=format&fit=crop",
    category: "Architecture",
    medium: "Charcoal and Ink",
    dimensions: "40 x 50 inches",
    artist: artists[0],
    inStock: true
  },
  {
    id: "art-6",
    title: "Dancing Light",
    description: "An abstract exploration of light and shadow, inspired by the play of sunshine through temple windows.",
    price: 42000,
    image: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?q=80&w=500&auto=format&fit=crop",
    category: "Abstract",
    medium: "Oil on Canvas",
    dimensions: "36 x 36 inches",
    artist: artists[1],
    inStock: true
  },
  {
    id: "art-7",
    title: "Village Chronicles",
    description: "A narrative painting depicting daily life in a rural Indian village, showcasing traditional customs and simple joys.",
    price: 38000,
    image: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?q=80&w=500&auto=format&fit=crop",
    category: "Folk Art",
    medium: "Acrylic on Handmade Paper",
    dimensions: "24 x 36 inches",
    artist: artists[2],
    inStock: true
  },
  {
    id: "art-8",
    title: "Cosmic Reflections",
    description: "A modern interpretation of ancient cosmic symbolism in Indian mythology, rendered in a contemporary style.",
    price: 55000,
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=500&auto=format&fit=crop",
    category: "Contemporary",
    medium: "Digital Print on Canvas",
    dimensions: "40 x 40 inches",
    artist: artists[3],
    inStock: true
  }
];

export const categories = [
  "All",
  "Landscape",
  "Abstract",
  "Contemporary",
  "Architecture",
  "Folk Art"
];
