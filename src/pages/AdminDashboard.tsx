
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { artworks } from "@/data/mockData";
import { Artwork } from "@/types";
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
import { BadgeIndianRupee } from "lucide-react";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [totalSales] = useState(435000);
  const [totalOrders] = useState(8);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Redirect if not admin
  if (!user?.isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl md:text-4xl font-serif mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Sales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BadgeIndianRupee className="h-4 w-4 mr-1" />
              <span className="text-2xl font-bold">
                {totalSales.toLocaleString("en-IN")}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Available Artworks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{artworks.length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="orders">
        <TabsList>
          <TabsTrigger value="orders">Recent Orders</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
        </TabsList>
        
        <TabsContent value="orders" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>
                Manage and track customer orders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      id: "ORD-001",
                      customer: "Rahul Sharma",
                      date: "2023-04-26",
                      status: "Delivered",
                      amount: 52000,
                    },
                    {
                      id: "ORD-002",
                      customer: "Priya Patel",
                      date: "2023-04-25",
                      status: "Processing",
                      amount: 38000,
                    },
                    {
                      id: "ORD-003",
                      customer: "Amit Singh",
                      date: "2023-04-24",
                      status: "Shipped",
                      amount: 65000,
                    },
                    {
                      id: "ORD-004",
                      customer: "Neha Gupta",
                      date: "2023-04-23",
                      status: "Delivered",
                      amount: 45000,
                    },
                  ].map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "Processing"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end">
                          <BadgeIndianRupee className="h-3.5 w-3.5 mr-1" />
                          {order.amount.toLocaleString("en-IN")}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="inventory" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Artwork Inventory</CardTitle>
              <CardDescription>
                Manage your artwork inventory
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Artist</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {artworks.map((artwork: Artwork) => (
                    <TableRow key={artwork.id}>
                      <TableCell className="font-medium">
                        {artwork.title}
                      </TableCell>
                      <TableCell>{artwork.artist.name}</TableCell>
                      <TableCell>{artwork.category}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end">
                          <BadgeIndianRupee className="h-3.5 w-3.5 mr-1" />
                          {artwork.price.toLocaleString("en-IN")}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            artwork.inStock
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {artwork.inStock ? "In Stock" : "Sold Out"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Edit
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
