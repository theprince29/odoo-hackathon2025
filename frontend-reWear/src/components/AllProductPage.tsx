import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";

interface Product {
  _id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  size: string;
  condition: string;
  tags: string[];
  images: {
    url: string;
    public_id: string;
    _id: string;
  }[];
  pointsValue: number;
  status: string;
  approvalStatus: string;
  owner: {
    _id: string;
    name: string;
    email: string;
  } | null;
  createdAt: string;
}

export default function AllProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterApproval, setFilterApproval] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/admin/allProduct");
        if (response.data.success) {
          setProducts(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleBuyNow = async (productId: string) => {
    try {
      const response = await api.post("/products/buyProduct", {
        productId: productId
      });
      
      if (response.data.success) {
        // Update the product status to "swapped" in the UI
        setProducts(products.map(product => 
          product._id === productId ? { ...product, status: "swapped" } : product
        ));
        alert("Product purchased successfully!");
      } else {
        alert(response.data.message || "Failed to purchase product");
      }
    } catch (error: any) {
      console.error("Error purchasing product:", error);
      alert(error.response?.data?.message || "An error occurred while purchasing");
    }
  };


  const handleApprove = async (productId: string) => {
    try {
      const response = await api.put(`/admin/products/${productId}/approve`);
      if (response.data.success) {
        setProducts(products.map(product => 
          product._id === productId ? { ...product, approvalStatus: "approved" } : product
        ));
      }
    } catch (error) {
      console.error("Error approving product:", error);
    }
  };

  const handleReject = async (productId: string) => {
    try {
      const response = await api.put(`/admin/products/${productId}/reject`);
      if (response.data.success) {
        setProducts(products.filter(product => product._id !== productId));
      }
    } catch (error) {
      console.error("Error rejecting product:", error);
    }
  };

  const filteredProducts = products.filter(product => {
    // Search filter
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesStatus = filterStatus === "all" || product.status === filterStatus;
    
    // Approval filter
    const matchesApproval = filterApproval === "all" || product.approvalStatus === filterApproval;
    
    return matchesSearch && matchesStatus && matchesApproval;
  });

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 cursor-pointer" onClick={() => navigate("/")}>Browse Product</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="swapped">Swapped</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select value={filterApproval} onValueChange={setFilterApproval}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by approval" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Approval Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Products Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Approval</TableHead>
                <TableHead>Action</TableHead> 
              
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      {product.images.length > 0 ? (
                        <img
                          src={product.images[0].url}
                          alt={product.title}
                          width={60}
                          height={60}
                          className="rounded-md object-cover"
                        />
                      ) : (
                        <div className="w-15 h-15 bg-gray-200 rounded-md flex items-center justify-center">
                          <span className="text-gray-500 text-xs">No Image</span>
                        </div>
                      )}
                      <div>
                        <h3 className="font-medium">{product.title}</h3>
                        <p className="text-sm text-gray-500">{product.category} - {product.type}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="text-sm"><span className="font-medium">Size:</span> {product.size}</p>
                      <p className="text-sm"><span className="font-medium">Condition:</span> {product.condition}</p>
                      <p className="text-sm"><span className="font-medium">Points:</span> {product.pointsValue}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {product.owner ? (
                      <div>
                        <p className="font-medium">{product.owner.name}</p>
                        <p className="text-sm text-gray-500">{product.owner.email}</p>
                      </div>
                    ) : (
                      <span className="text-gray-500">No owner</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={product.status === "available" ? "default" : "secondary"}>
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        product.approvalStatus === "approved" ? "default" :
                        product.approvalStatus === "pending" ? "outline" :
                        "destructive"
                      }
                    >
                      {product.approvalStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    
                  </TableCell>
                   <TableCell>
                    {product.status === "available" && product.approvalStatus === "approved" ? (
                      <Button 
                        size="sm"
                        onClick={() => handleBuyNow(product._id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Buy Now
                      </Button>
                    ) : (
                      <Badge variant="outline" className="text-gray-500">
                        {product.status === "swapped" ? "Already Purchased" : "Not Available"}
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  No products found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}