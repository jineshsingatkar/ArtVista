
import { Artwork } from "@/types";
import ArtworkCard from "./ArtworkCard";

interface ArtworkGridProps {
  artworks: Artwork[];
  title?: string;
}

const ArtworkGrid = ({ artworks, title }: ArtworkGridProps) => {
  return (
    <section className="py-8">
      {title && (
        <h2 className="text-2xl md:text-3xl font-serif mb-6">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {artworks.map((artwork) => (
          <ArtworkCard key={artwork.id} artwork={artwork} />
        ))}
      </div>
    </section>
  );
};

export default ArtworkGrid;
