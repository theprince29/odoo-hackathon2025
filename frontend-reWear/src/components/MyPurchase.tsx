import { useEffect, useState } from "react";
import api from "@/lib/api"; // your axios setup
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShoppingBag, MapPin, Badge } from "lucide-react";

type Purchase = {
  _id: string;
  title: string;
  images?: { url: string }[];
  size?: string;
  owner: string;
  pointsValue?: number;
};

export default function MyPurchasesCard() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const res = await api.get("/user/productPurchases");
        setPurchases(res.data.data || []);
      } catch (error) {
        console.error("Failed to fetch purchases", error);
      }
    };

    fetchPurchases();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5" />
          My Purchases
        </CardTitle>
        <CardDescription>
          Items you've acquired through ReWear
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {purchases.length === 0 ? (
            <p className="text-sm text-gray-500">No purchases yet.</p>
          ) : (
            purchases.map((product) => (
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
                  <Badge className="absolute top-2 right-2 bg-blue-500">
                    Delivered
                  </Badge>
                </div>
                <CardContent className="p-3">
                  <h4 className="font-medium text-sm mb-1">
                    {product.title}
                  </h4>
                  <p className="text-xs text-gray-600 mb-2">
                    Size: {product.size} • From: {/* hardcoded or fetch seller info if available */}
                    Owner ID ending in: {product.owner.slice(-4)}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {product.pointsValue} points
                    </span>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <MapPin className="h-3 w-3" />
                      <span>Local</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
