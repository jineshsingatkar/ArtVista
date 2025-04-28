
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const paymentId = location.state?.paymentId;

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // If there's no payment ID, redirect to home
    if (!paymentId) {
      navigate("/");
    }
  }, [paymentId, navigate]);

  if (!paymentId) {
    return null;
  }

  return (
    <div className="container py-12">
      <div className="max-w-lg mx-auto text-center space-y-6">
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-serif">Order Confirmed!</h1>
        
        <p className="text-muted-foreground">
          Thank you for your purchase. Your order has been confirmed and will be
          shipped soon.
        </p>
        
        <div className="bg-secondary/50 p-4 rounded-lg">
          <p className="text-sm text-muted-foreground">Payment ID</p>
          <p className="font-mono font-medium">{paymentId}</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Button asChild>
            <Link to="/gallery">Continue Shopping</Link>
          </Button>
          
          <Button variant="outline" asChild>
            <Link to="/profile">View My Orders</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
