
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { BadgeIndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import RazorpayCheckout from "@/components/RazorpayCheckout";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Valid phone number is required" }),
  address: z.string().min(5, { message: "Address is required" }),
  city: z.string().min(2, { message: "City is required" }),
  state: z.string().min(2, { message: "State is required" }),
  pincode: z.string().min(6, { message: "Valid PIN code is required" }),
});

type FormValues = z.infer<typeof formSchema>;

const Checkout = () => {
  const { cartItems, totalAmount, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Redirect if cart is empty
    if (cartItems.length === 0) {
      navigate("/cart");
    }
    
    // Redirect if not authenticated
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to proceed with checkout",
      });
      navigate("/login", { state: { from: "/checkout" } });
    }
  }, [cartItems, isAuthenticated, navigate, toast]);

  const handlePaymentSuccess = (paymentId: string) => {
    toast({
      title: "Order Placed Successfully!",
      description: `Your order has been placed successfully with payment ID: ${paymentId}`,
    });
    clearCart();
    navigate("/order-confirmation", { state: { paymentId } });
  };

  if (cartItems.length === 0 || !isAuthenticated) {
    return null;
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl md:text-4xl font-serif mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-card p-6 rounded-lg border mb-6">
            <h2 className="text-xl font-serif mb-4">Shipping Information</h2>
            
            <Form {...form}>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your city" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your state" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="pincode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>PIN Code</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter PIN code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-card p-6 rounded-lg border sticky top-20">
            <h2 className="text-xl font-serif mb-4">Order Summary</h2>
            
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
            
            <RazorpayCheckout onSuccess={handlePaymentSuccess} />
            
            <p className="text-xs text-center text-muted-foreground mt-4">
              By placing your order, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
