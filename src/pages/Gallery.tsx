import { useState, useEffect } from "react";
import { artworks, categories } from "@/data/mockData";
import { Artwork } from "@/types";
import ArtworkGrid from "@/components/ArtworkGrid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BadgeIndianRupee } from "lucide-react";

const Gallery = () => {
  const [filteredArtworks, setFilteredArtworks] = useState<Artwork[]>(artworks);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    filterArtworks();
  }, [searchQuery, selectedCategory, priceRange]);

  const filterArtworks = () => {
    let filtered = artworks;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (artwork) =>
          artwork.title.toLowerCase().includes(query) ||
          artwork.artist.name.toLowerCase().includes(query) ||
          artwork.description.toLowerCase().includes(query) ||
          artwork.category.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (artwork) => artwork.category === selectedCategory
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (artwork) =>
        artwork.price >= priceRange.min && artwork.price <= priceRange.max
    );

    setFilteredArtworks(filtered);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    setPriceRange({ min, max });
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl md:text-4xl font-serif mb-6">Explore Gallery</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {/* Sidebar with filters */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card p-4 rounded-lg border">
            <h3 className="font-medium mb-3">Search</h3>
            <Input
              placeholder="Search artworks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="bg-card p-4 rounded-lg border">
            <h3 className="font-medium mb-3">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  className="mr-2 mb-2"
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="bg-card p-4 rounded-lg border">
            <h3 className="font-medium mb-3">Price Range</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm flex items-center">
                  <BadgeIndianRupee className="h-3.5 w-3.5 mr-1" />
                  {priceRange.min.toLocaleString("en-IN")}
                </span>
                <span className="text-sm flex items-center">
                  <BadgeIndianRupee className="h-3.5 w-3.5 mr-1" />
                  {priceRange.max.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePriceRangeChange(0, 30000)}
                >
                  Under ₹30K
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePriceRangeChange(30000, 50000)}
                >
                  ₹30K - ₹50K
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePriceRangeChange(50000, 100000)}
                >
                  ₹50K - ₹1L
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePriceRangeChange(0, 100000)}
                >
                  All Prices
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content with artwork grid */}
        <div className="lg:col-span-3">
          {filteredArtworks.length > 0 ? (
            <ArtworkGrid artworks={filteredArtworks} />
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No artworks found matching your criteria.
              </p>
              <Button
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  setPriceRange({ min: 0, max: 100000 });
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
