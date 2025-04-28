import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { getFirestore, collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Order {
  id: string;
  userId: string;
  items: Array<{
    artwork: {
      id: string;
      title: string;
      price: number;
      image: string;
    };
    quantity: number;
  }>;
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

interface Inquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
  status: 'new' | 'read' | 'replied';
}

interface Artwork {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  medium: string;
  dimensions: string;
  inStock: boolean;
  createdAt: Date;
}

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newArtwork, setNewArtwork] = useState({
    title: "",
    description: "",
    price: 0,
    image: "",
    category: "",
    medium: "",
    dimensions: "",
    inStock: true,
  });

  useEffect(() => {
    if (!isAdmin) return;
    fetchData();
  }, [isAdmin]);

  const fetchData = async () => {
    try {
      const db = getFirestore();
      
      // Fetch orders
      const ordersSnapshot = await getDocs(collection(db, "orders"));
      const ordersData = ordersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
      })) as Order[];
      setOrders(ordersData);

      // Fetch inquiries
      const inquiriesSnapshot = await getDocs(collection(db, "inquiries"));
      const inquiriesData = inquiriesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
      })) as Inquiry[];
      setInquiries(inquiriesData);

      // Fetch artworks
      const artworksSnapshot = await getDocs(collection(db, "artworks"));
      const artworksData = artworksSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
      })) as Artwork[];
      setArtworks(artworksData);

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: "Failed to fetch data",
        variant: "destructive",
      });
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: Order['status']) => {
    try {
      const db = getFirestore();
      await updateDoc(doc(db, "orders", orderId), { status: newStatus });
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
      toast({
        title: "Order Updated",
        description: `Order status changed to ${newStatus}`,
      });
    } catch (error) {
      console.error("Error updating order:", error);
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive",
      });
    }
  };

  const updateInquiryStatus = async (inquiryId: string, newStatus: Inquiry['status']) => {
    try {
      const db = getFirestore();
      await updateDoc(doc(db, "inquiries", inquiryId), { status: newStatus });
      setInquiries(inquiries.map(inquiry => 
        inquiry.id === inquiryId ? { ...inquiry, status: newStatus } : inquiry
      ));
      toast({
        title: "Inquiry Updated",
        description: `Inquiry status changed to ${newStatus}`,
      });
    } catch (error) {
      console.error("Error updating inquiry:", error);
      toast({
        title: "Error",
        description: "Failed to update inquiry status",
        variant: "destructive",
      });
    }
  };

  const addNewArtwork = async () => {
    try {
      const db = getFirestore();
      const docRef = await addDoc(collection(db, "artworks"), {
        ...newArtwork,
        createdAt: new Date(),
      });
      setArtworks([...artworks, { id: docRef.id, ...newArtwork, createdAt: new Date() }]);
      setNewArtwork({
        title: "",
        description: "",
        price: 0,
        image: "",
        category: "",
        medium: "",
        dimensions: "",
        inStock: true,
      });
      toast({
        title: "Artwork Added",
        description: "New artwork has been added successfully",
      });
    } catch (error) {
      console.error("Error adding artwork:", error);
      toast({
        title: "Error",
        description: "Failed to add new artwork",
        variant: "destructive",
      });
    }
  };

  if (!isAdmin) {
    return <Navigate to="/login" state={{ from: "/admin" }} />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl md:text-4xl font-serif mb-6">Admin Dashboard</h1>

      <Tabs defaultValue="orders" className="space-y-4">
        <TabsList>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
          <TabsTrigger value="artworks">Artworks</TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order Management</CardTitle>
              <CardDescription>Manage customer orders and shipments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.shippingAddress.name}</TableCell>
                      <TableCell>₹{order.totalAmount}</TableCell>
                      <TableCell>
                        <Badge variant={order.status === 'delivered' ? 'default' : 'secondary'}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{order.createdAt.toLocaleDateString()}</TableCell>
                      <TableCell>
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                          className="border rounded p-1"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inquiries">
          <Card>
            <CardHeader>
              <CardTitle>Customer Inquiries</CardTitle>
              <CardDescription>Manage customer inquiries and messages</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inquiries.map((inquiry) => (
                    <TableRow key={inquiry.id}>
                      <TableCell>{inquiry.name}</TableCell>
                      <TableCell>{inquiry.email}</TableCell>
                      <TableCell>{inquiry.subject}</TableCell>
                      <TableCell>
                        <Badge variant={inquiry.status === 'new' ? 'default' : 'secondary'}>
                          {inquiry.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{inquiry.createdAt.toLocaleDateString()}</TableCell>
                      <TableCell>
                        <select
                          value={inquiry.status}
                          onChange={(e) => updateInquiryStatus(inquiry.id, e.target.value as Inquiry['status'])}
                          className="border rounded p-1"
                        >
                          <option value="new">New</option>
                          <option value="read">Read</option>
                          <option value="replied">Replied</option>
                        </select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="artworks">
          <Card>
            <CardHeader>
              <CardTitle>Artwork Management</CardTitle>
              <CardDescription>Manage artwork inventory and add new pieces</CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Add New Artwork</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Artwork</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={newArtwork.title}
                        onChange={(e) => setNewArtwork({ ...newArtwork, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newArtwork.description}
                        onChange={(e) => setNewArtwork({ ...newArtwork, description: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="price">Price</Label>
                      <Input
                        id="price"
                        type="number"
                        value={newArtwork.price}
                        onChange={(e) => setNewArtwork({ ...newArtwork, price: Number(e.target.value) })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="image">Image URL</Label>
                      <Input
                        id="image"
                        value={newArtwork.image}
                        onChange={(e) => setNewArtwork({ ...newArtwork, image: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Input
                        id="category"
                        value={newArtwork.category}
                        onChange={(e) => setNewArtwork({ ...newArtwork, category: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="medium">Medium</Label>
                      <Input
                        id="medium"
                        value={newArtwork.medium}
                        onChange={(e) => setNewArtwork({ ...newArtwork, medium: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="dimensions">Dimensions</Label>
                      <Input
                        id="dimensions"
                        value={newArtwork.dimensions}
                        onChange={(e) => setNewArtwork({ ...newArtwork, dimensions: e.target.value })}
                      />
                    </div>
                    <Button onClick={addNewArtwork}>Add Artwork</Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Table className="mt-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {artworks.map((artwork) => (
                    <TableRow key={artwork.id}>
                      <TableCell>{artwork.title}</TableCell>
                      <TableCell>₹{artwork.price}</TableCell>
                      <TableCell>{artwork.category}</TableCell>
                      <TableCell>
                        <Badge variant={artwork.inStock ? 'default' : 'destructive'}>
                          {artwork.inStock ? 'In Stock' : 'Out of Stock'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const db = getFirestore();
                            updateDoc(doc(db, "artworks", artwork.id), {
                              inStock: !artwork.inStock,
                            });
                            setArtworks(artworks.map(a =>
                              a.id === artwork.id ? { ...a, inStock: !a.inStock } : a
                            ));
                          }}
                        >
                          Toggle Stock
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
