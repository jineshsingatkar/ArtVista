
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { BadgeIndianRupee } from "lucide-react";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, totalAmount } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (cartItems.length === 0) {
    return (
      <div className="container py-12">
        <h1 className="text-3xl md:text-4xl font-serif mb-6">Your Cart</h1>
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-6">Your cart is empty</p>
          <Button asChild>
            <Link to="/gallery">Browse Gallery</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl md:text-4xl font-serif mb-6">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.artwork.id}
                className="flex flex-col sm:flex-row items-start gap-4 p-4 bg-card rounded-lg border"
              >
                <Link 
                  to={`/artwork/${item.artwork.id}`}
                  className="sm:w-32 flex-shrink-0"
                >
                  <img
                    src={item.artwork.image}
                    alt={item.artwork.title}
                    className="w-full h-auto rounded-md"
                  />
                </Link>
                
                <div className="flex-1">
                  <Link 
                    to={`/artwork/${item.artwork.id}`}
                    className="font-medium hover:text-kala-primary"
                  >
                    {item.artwork.title}
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    by {item.artwork.artist.name}
                  </p>
                  <div className="flex items-center mt-2">
                    <BadgeIndianRupee className="h-3.5 w-3.5 mr-1" />
                    <span>{item.artwork.price.toLocaleString("en-IN")}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mt-4 sm:mt-0">
                  <div className="flex items-center border rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        updateQuantity(item.artwork.id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        updateQuantity(item.artwork.id, item.quantity + 1)
                      }
                    >
                      +
                    </Button>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromCart(item.artwork.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-card p-6 rounded-lg border sticky top-20">
            <h2 className="text-xl font-medium mb-4">Order Summary</h2>
            
            <div className="space-y-2 mb-4">
              {cartItems.map((item) => (
                <div key={item.artwork.id} className="flex justify-between">
                  <span className="text-sm text-muted-foreground line-clamp-1">
                    {item.artwork.title} ({item.quantity})
                  </span>
                  <span className="text-sm flex items-center">
                    <BadgeIndianRupee className="h-3 w-3 mr-0.5" />
                    {(item.artwork.price * item.quantity).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span className="flex items-center">
                  <BadgeIndianRupee className="h-4 w-4 mr-1" />
                  {totalAmount.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
            
            <Button className="w-full bg-kala-primary hover:bg-kala-primary/90" asChild>
              <Link to="/checkout">Proceed to Checkout</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
