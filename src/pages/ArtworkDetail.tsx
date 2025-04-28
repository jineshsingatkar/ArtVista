
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { artworks } from "@/data/mockData";
import { Artwork } from "@/types";
import { Button } from "@/components/ui/button";
import { BadgeIndianRupee } from "lucide-react";
import { useCart } from "@/context/CartContext";
import ArtworkGrid from "@/components/ArtworkGrid";

const ArtworkDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [relatedWorks, setRelatedWorks] = useState<Artwork[]>([]);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const foundArtwork = artworks.find((a) => a.id === id);
    
    if (foundArtwork) {
      setArtwork(foundArtwork);
      
      // Find related works by same artist or category
      const related = artworks
        .filter(
          (a) =>
            (a.artist.id === foundArtwork.artist.id ||
              a.category === foundArtwork.category) &&
            a.id !== foundArtwork.id
        )
        .slice(0, 4);
      
      setRelatedWorks(related);
    } else {
      navigate("/gallery");
    }
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (artwork) {
      addToCart(artwork, quantity);
    }
  };

  if (!artwork) {
    return (
      <div className="container py-12 text-center">
        <p>Loading artwork...</p>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-6">
        <Link to="/gallery" className="text-sm text-muted-foreground hover:text-foreground">
          &larr; Back to Gallery
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-lg overflow-hidden shadow-lg">
          <img
            src={artwork.image}
            alt={artwork.title}
            className="w-full h-auto"
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-serif">{artwork.title}</h1>
          
          <div className="flex items-center space-x-2">
            <Link 
              to={`/artist/${artwork.artist.id}`} 
              className="font-medium hover:text-kala-primary"
            >
              {artwork.artist.name}
            </Link>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">{artwork.category}</span>
          </div>
          
          <div className="price-tag text-2xl">
            <BadgeIndianRupee className="mr-1 h-5 w-5" />
            {artwork.price.toLocaleString('en-IN')}
          </div>
          
          <div className="border-t border-b py-6 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-sm text-muted-foreground">Medium</p>
                <p>{artwork.medium}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Dimensions</p>
                <p>{artwork.dimensions}</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium">Description</h3>
            <p className="text-muted-foreground">{artwork.description}</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span className="w-8 text-center">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </div>
            
            <Button 
              className="flex-1 bg-kala-primary hover:bg-kala-primary/90"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      {relatedWorks.length > 0 && (
        <div className="border-t pt-12">
          <ArtworkGrid artworks={relatedWorks} title="You May Also Like" />
        </div>
      )}
    </div>
  );
};

export default ArtworkDetail;
