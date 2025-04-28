
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

interface RazorpayCheckoutProps {
  onSuccess: (paymentId: string) => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const RazorpayCheckout = ({ onSuccess }: RazorpayCheckoutProps) => {
  const { totalAmount, cartItems } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => {
        toast({
          title: "Error",
          description: "Failed to load Razorpay. Please try again later.",
          variant: "destructive",
        });
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);
    
    // Load Razorpay script
    const res = await loadRazorpayScript();
    
    if (!res) {
      setLoading(false);
      return;
    }

    // In a real implementation, you would create an order on your server
    // and get the order_id from that response
    // For this mock implementation, we'll use a random order ID
    const orderId = `order_${Math.random().toString(36).substring(2, 15)}`;
    
    const options = {
      key: "rzp_test_YourTestAPIKey", // Replace with your Razorpay Key ID
      amount: totalAmount * 100, // Amount in paise
      currency: "INR",
      name: "Kala Bazaar",
      description: `${cartItems.length} item${cartItems.length > 1 ? 's' : ''}`,
      order_id: orderId,
      handler: function (response: any) {
        toast({
          title: "Payment Successful",
          description: `Payment ID: ${response.razorpay_payment_id}`,
        });
        onSuccess(response.razorpay_payment_id);
      },
      prefill: {
        name: user?.name || "",
        email: user?.email || "",
        contact: "", // Would be populated with actual user phone in a real application
      },
      notes: {
        address: "Kala Bazaar Corporate Office",
      },
      theme: {
        color: "#9b87f5",
      },
    };

    try {
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
      console.error("Razorpay Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      onClick={handlePayment} 
      className="w-full bg-kala-primary hover:bg-kala-primary/90"
      disabled={loading || cartItems.length === 0}
    >
      {loading ? "Processing..." : `Pay ₹${totalAmount.toLocaleString('en-IN')}`}
    </Button>
  );
};

export default RazorpayCheckout;
