
import { Artwork } from "@/types";
import { BadgeIndianRupee } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

interface ArtworkCardProps {
  artwork: Artwork;
}

const ArtworkCard = ({ artwork }: ArtworkCardProps) => {
  const { addToCart } = useCart();

  return (
    <div className="art-card group">
      <Link to={`/artwork/${artwork.id}`}>
        <div className="overflow-hidden">
          <img 
            src={artwork.image} 
            alt={artwork.title} 
            className="art-card-image"
          />
        </div>
      </Link>
      <div className="p-4 space-y-2">
        <Link to={`/artwork/${artwork.id}`}>
          <h3 className="font-serif font-medium line-clamp-1">{artwork.title}</h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-1">by {artwork.artist.name}</p>
        <div className="flex items-center justify-between pt-2">
          <div className="price-tag">
            <BadgeIndianRupee className="mr-1 h-4 w-4" />
            {artwork.price.toLocaleString('en-IN')}
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              addToCart(artwork);
            }}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ArtworkCard;
