import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Share2, MessageCircle, Star, MapPin, Calendar, Ruler, Palette, Search } from "lucide-react"
import { useState } from "react"

export default function ItemListing() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isFavorited, setIsFavorited] = useState(false)

  const productImages = [
    "https://ui.shadcn.com/placeholder.svg?height=400&width=400",
    "https://ui.shadcn.com/placeholder.svg?height=400&width=400",
    "https://ui.shadcn.com/placeholder.svg?height=400&width=400",
    "https://ui.shadcn.com/placeholder.svg?height=400&width=400",
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            
            <h1 className="text-2xl font-bold text-gray-900">Item Listing</h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search for clothing items..." className="pl-10" />
            </div>
          </div>

          <div className="w-8 h-8 rounded-full bg-gray-200"></div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images Section */}
          <div className="space-y-4">
            {/* Main Product Image */}
            <Card className="overflow-hidden">
              <div className="aspect-square bg-gray-100 relative">
                <img
                  src={productImages[selectedImage] || "/placeholder.svg"}
                  alt="Product Image"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    size="icon"
                    variant={isFavorited ? "default" : "secondary"}
                    onClick={() => setIsFavorited(!isFavorited)}
                  >
                    <Heart className={`h-4 w-4 ${isFavorited ? "fill-current" : ""}`} />
                  </Button>
                  <Button size="icon" variant="secondary">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
                <Badge className="absolute bottom-4 left-4 bg-green-500">Available</Badge>
              </div>
            </Card>

            {/* Product Images Thumbnails */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Product Images</h3>
              <div className="grid grid-cols-4 gap-3">
                {productImages.map((image, index) => (
                  <Card
                    key={index}
                    className={`overflow-hidden cursor-pointer transition-all ${
                      selectedImage === index ? "ring-2 ring-blue-500" : "hover:shadow-md"
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <div className="aspect-square bg-gray-100">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Product view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">Vintage Denim Jacket</CardTitle>
                    <CardDescription className="text-lg mt-1">
                      Classic 90s style denim jacket in excellent condition
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">150 Points</div>
                    <div className="text-sm text-gray-500">or Direct Swap</div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Product Description */}
                <div>
                  <h3 className="font-semibold mb-3">Description</h3>
                  <div className="space-y-2 text-gray-700">
                    <p>
                      This beautiful vintage denim jacket is perfect for layering and adds a classic touch to any
                      outfit.
                    </p>
                    <p>Features include authentic vintage wash, classic button closure, and two front pockets.</p>
                    <p>Worn only a few times and kept in excellent condition. No stains, tears, or significant wear.</p>
                    <p>
                      Perfect for someone looking to add a timeless piece to their wardrobe while supporting sustainable
                      fashion.
                    </p>
                    <p>Open to direct swaps for similar vintage pieces or casual wear in size M-L.</p>
                  </div>
                </div>

                <Separator />

                {/* Item Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Ruler className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      <strong>Size:</strong> Medium
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Palette className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      <strong>Color:</strong> Classic Blue
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      <strong>Condition:</strong> Excellent
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      <strong>Listed:</strong> 2 days ago
                    </span>
                  </div>
                </div>

                <Separator />

                {/* Seller Information */}
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg?height=48&width=48" />
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-medium">Sarah Martinez</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>4.9 (127 reviews)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>Brooklyn, NY</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                </div>

                <Separator />

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button className="flex-1" size="lg">
                    Exchange for 150 Points
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent" size="lg">
                    Propose Direct Swap
                  </Button>
                  <Button variant="outline" size="lg">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
