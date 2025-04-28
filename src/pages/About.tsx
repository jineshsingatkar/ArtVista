
import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container py-8">
      <h1 className="text-3xl md:text-4xl font-serif mb-6">About Kala Bazaar</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <p className="text-lg mb-4">
            Kala Bazaar is India's premier online marketplace for discovering and
            collecting fine art from renowned and emerging Indian artists.
          </p>
          <p className="mb-4">
            Founded in 2023, our mission is to make exceptional Indian art
            accessible to collectors worldwide while supporting local artists and
            preserving our rich cultural heritage.
          </p>
          <p>
            We carefully curate our collection to showcase diverse styles,
            mediums, and perspectives that represent the vibrant landscape of
            contemporary Indian art.
          </p>
        </div>
        <div className="bg-secondary/30 rounded-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?q=80&w=800&auto=format&fit=crop"
            alt="Art gallery"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-serif mb-4">Our Vision</h2>
        <p className="mb-4">
          We envision a world where Indian art is globally recognized and valued
          for its rich heritage, diversity, and contemporary expressions. Kala
          Bazaar serves as a bridge connecting artists with art enthusiasts,
          creating a thriving ecosystem for Indian art to flourish.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-xl font-serif mb-3">For Collectors</h3>
          <p>
            We offer a curated selection of authentic artworks, each accompanied
            by comprehensive documentation and certification. Our secure platform
            ensures a seamless buying experience with trusted shipping and
            handling.
          </p>
        </div>
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-xl font-serif mb-3">For Artists</h3>
          <p>
            We provide a platform for both established and emerging artists to
            showcase their work to a global audience. Through fair compensation
            and promotion, we help artists build sustainable careers.
          </p>
        </div>
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-xl font-serif mb-3">For Art</h3>
          <p>
            We are committed to preserving and promoting the rich tapestry of
            Indian art traditions while embracing contemporary expressions and
            innovations that push boundaries.
          </p>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-serif mb-4">Our Team</h2>
        <p className="mb-4">
          Kala Bazaar was founded by a team of art enthusiasts, technologists,
          and cultural advocates who share a passion for Indian art and a
          commitment to making it accessible to a wider audience.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          {[
            {
              name: "Arjun Mehta",
              role: "Founder & CEO",
              image:
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
            },
            {
              name: "Leela Sharma",
              role: "Art Director",
              image:
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
            },
            {
              name: "Vikram Singh",
              role: "Head of Operations",
              image:
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
            },
            {
              name: "Meera Patel",
              role: "Chief Curator",
              image:
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
            },
          ].map((member, index) => (
            <div key={index} className="text-center">
              <div className="overflow-hidden rounded-full w-24 h-24 mx-auto mb-3">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-medium">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-serif mb-4">Join Our Journey</h2>
        <p>
          Whether you're an art collector, an artist, or simply an art
          enthusiast, we invite you to join us on this exciting journey of
          discovering and celebrating Indian art. Browse our collection, connect
          with our community, and be a part of the Kala Bazaar family.
        </p>
      </div>
    </div>
  );
};

export default About;
