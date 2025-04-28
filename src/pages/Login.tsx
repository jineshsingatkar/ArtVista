
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/context/AuthContext";
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
import { LogIn } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    // If user is already logged in, redirect them
    if (isAuthenticated) {
      const from = location.state?.from || "/";
      navigate(from);
    }
  }, [isAuthenticated, navigate, location]);

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    
    try {
      const success = await login(values.email, values.password);
      
      if (success) {
        const from = location.state?.from || "/";
        navigate(from);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-12">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">
            Sign in to your Kala Bazaar account
          </p>
        </div>
        
        <div className="bg-card p-6 rounded-lg border shadow-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end">
                <Link to="/forgot-password" className="text-sm text-kala-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              
              <Button
                type="submit"
                className="w-full bg-kala-primary hover:bg-kala-primary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
                <LogIn className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center text-sm">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="text-kala-primary hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>
            For demo purposes, use:
            <br />
            Email: <strong>admin@kalabazaar.com</strong>
            <br />
            Password: <strong>admin123</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
