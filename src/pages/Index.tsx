
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { artworks } from "@/data/mockData";
import ArtworkGrid from "@/components/ArtworkGrid";
import { motion } from "framer-motion";

const Index = () => {
  const [featuredArtworks, setFeaturedArtworks] = useState(artworks.slice(0, 4));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold">
                Discover Exceptional <span className="text-kala-primary">Indian Art</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Explore and collect contemporary artwork from India's finest artists.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link to="/gallery">Explore Gallery</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/about">About Us</Link>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src={artworks[0].image}
                  alt="Featured artwork"
                  className="w-full h-auto rounded-lg object-cover aspect-[3/4] shadow-lg"
                />
                <img
                  src={artworks[1].image}
                  alt="Featured artwork"
                  className="w-full h-auto rounded-lg object-cover aspect-[4/3] shadow-lg"
                />
              </div>
              <div className="space-y-4 mt-8">
                <img
                  src={artworks[2].image}
                  alt="Featured artwork"
                  className="w-full h-auto rounded-lg object-cover aspect-[4/3] shadow-lg"
                />
                <img
                  src={artworks[3].image}
                  alt="Featured artwork"
                  className="w-full h-auto rounded-lg object-cover aspect-[3/4] shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Artworks Section */}
      <section className="container py-16">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-serif">Featured Artworks</h2>
          <Link to="/gallery" className="text-kala-primary hover:underline mt-2 md:mt-0">
            View all artworks
          </Link>
        </div>
        <ArtworkGrid artworks={featuredArtworks} />
      </section>

      {/* Why Choose Us */}
      <section className="bg-secondary/50 py-16">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-serif text-center mb-12">
            Why Choose Kala Bazaar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Authentic Artworks",
                description: "Every piece is verified for authenticity and comes with a certificate of authenticity.",
              },
              {
                title: "Support Indian Artists",
                description: "We work directly with artists to ensure they receive fair compensation for their work.",
              },
              {
                title: "Secure Payments",
                description: "Shop with confidence using our secure Razorpay payment gateway.",
              },
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-serif mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-16">
        <div className="bg-kala-primary text-white rounded-lg p-8 md:p-12">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-serif">
              Ready to Start Your Art Collection?
            </h2>
            <p className="text-white/80">
              Join thousands of art enthusiasts who have found their perfect piece on Kala Bazaar.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/signup">Create an Account</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
