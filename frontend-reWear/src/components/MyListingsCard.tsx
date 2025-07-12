import { useEffect, useState } from "react";
import api from "@/lib/api"; // your axios setup
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Plus, Package, Star } from "lucide-react";
import AddProductForm from "./addfnewproduct";


type Product = {
  _id: string;
  title: string;
  images?: { url: string }[];
  status: string;
  size?: string;
  condition?: string;
  pointsValue?: number;
};

export default function MyListingsCard() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/user/productUpload");
        setProducts(res.data.products || []);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              My Listings
            </CardTitle>
            <CardDescription>
              Clothing items you've listed for exchange
            </CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Listing
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl w-full">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>
              <AddProductForm />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <Card
              key={product._id}
              className="overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-square bg-gray-100 relative">
                <img
                  src={
                    product.images?.[0]?.url ??
                    "https://ui.shadcn.com/placeholder.svg"
                  }
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                <Badge
                  className={`absolute top-2 right-2 ${
                    product.status === "available"
                      ? "bg-green-500"
                      : "bg-gray-400"
                  }`}
                >
                  {product.status}
                </Badge>
              </div>
              <CardContent className="p-3">
                <h4 className="font-medium text-sm mb-1">
                  {product.title}
                </h4>
                <p className="text-xs text-gray-600 mb-2">
                  Size: {product.size} • Condition: {product.condition}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-600">
                    {product.pointsValue} points
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs">4.8</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
