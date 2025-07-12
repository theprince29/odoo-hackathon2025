import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload } from "lucide-react";

export default function ProductDetailPage() {
  const [status, setStatus] = useState("available");

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Search bar */}
      <div className="flex justify-between items-center mb-6 border rounded px-4 py-2">
        <input
          type="text"
          placeholder="Search..."
          className="w-full focus:outline-none"
        />
        <Button variant="ghost" size="icon">
          🔍
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Add Images Section */}
        <div className="border border-dashed border-gray-300 rounded flex items-center justify-center h-64">
          <div className="text-center">
            <Upload className="mx-auto mb-2" />
            <p className="text-sm text-gray-500">Add Images</p>
          </div>
        </div>

        {/* Add Product Description */}
        <div>
          <Textarea
            placeholder="Add Product Description"
            className="h-64 resize-none"
          />
          <div className="flex justify-end mt-4">
            <Button
              variant={status === "available" ? "default" : "outline"}
              onClick={() =>
                setStatus(status === "available" ? "swapped" : "available")
              }
            >
              {status === "available" ? "Available" : "Swap"}
            </Button>
          </div>
        </div>
      </div>

      {/* Previous Listings */}
      <div className="mt-10">
        <h3 className="font-semibold mb-4">Previous Listings:</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="border rounded overflow-hidden hover:shadow-md transition"
            >
              <div className="aspect-square bg-gray-100"></div>
              <div className="p-2">
                <h4 className="text-sm font-medium">Item #{item}</h4>
                <p className="text-xs text-gray-500">Condition: Good</p>
                <Badge className="mt-1">Available</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
