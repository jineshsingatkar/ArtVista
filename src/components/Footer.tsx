
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-serif font-bold tracking-tight text-kala-primary">
                Art<span className="text-foreground">Vista</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Discover and collect exceptional artworks from renowned Indian artists.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="font-medium">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/gallery" className="text-sm text-muted-foreground hover:text-foreground">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/artists" className="text-sm text-muted-foreground hover:text-foreground">
                  Artists
                </Link>
              </li>
              <li>
                <Link to="/exhibitions" className="text-sm text-muted-foreground hover:text-foreground">
                  Exhibitions
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-medium">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-sm text-muted-foreground hover:text-foreground">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-sm text-muted-foreground hover:text-foreground">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-medium">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-6">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ArtVista. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
