
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  subject: z.string().min(5, { message: "Subject is required" }),
  message: z.string().min(10, { message: "Message is too short" }),
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onSubmit = (values: FormValues) => {
    // In a real application, this would send an API request
    console.log("Form submitted:", values);
    
    toast({
      title: "Message Sent",
      description: "We'll get back to you as soon as possible.",
    });
    
    form.reset();
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl md:text-4xl font-serif mb-6">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <p className="mb-4">
            Have questions about a specific artwork? Want to learn more about our
            services? We'd love to hear from you. Fill out the form and our team
            will get back to you as soon as possible.
          </p>

          <div className="mt-6 space-y-4">
            <div className="bg-card p-4 rounded-lg border">
              <h3 className="font-medium">Address</h3>
              <address className="not-italic text-muted-foreground">
                Kala Bazaar Gallery
                <br />
                123 Art Street, Colaba
                <br />
                Mumbai, Maharashtra 400001
                <br />
                India
              </address>
            </div>

            <div className="bg-card p-4 rounded-lg border">
              <h3 className="font-medium">Email</h3>
              <p className="text-muted-foreground">
                info@kalabazaar.com
                <br />
                support@kalabazaar.com
              </p>
            </div>

            <div className="bg-card p-4 rounded-lg border">
              <h3 className="font-medium">Phone</h3>
              <p className="text-muted-foreground">
                +91 22 1234 5678
                <br />
                Mon-Fri, 10:00 AM - 6:00 PM IST
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-xl font-serif mb-6">Send a Message</h2>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
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
                      <Input placeholder="Your email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="Message subject" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Your message"
                        className="min-h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full bg-kala-primary hover:bg-kala-primary/90">
                Send Message
              </Button>
            </form>
          </Form>
        </div>
      </div>

      <div className="rounded-lg overflow-hidden h-80 mb-12">
        <iframe
          title="Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241316.64333236168!2d72.74110193988438!3d19.08252990602627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1651825200000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
