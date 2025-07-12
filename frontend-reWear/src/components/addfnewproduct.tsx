import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import api from "@/lib/api";

export default function AddProductForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    type: "",
    size: "",
    condition: "",
    tags: "",
    pointsValue: "",
  });
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length + images.length > 5) {
      alert("Maximum 5 images allowed");
      return;
    }
    setImages([...images, ...selectedFiles]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (images.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) =>
      formData.append(key, value)
    );
    images.forEach((file) => formData.append("images", file));

    try {
      setLoading(true);
      const res = await api.post("/product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data.success) {
        alert("Product uploaded successfully!");
        setForm({
          title: "",
          description: "",
          category: "",
          type: "",
          size: "",
          condition: "",
          tags: "",
          pointsValue: "",
        });
        setImages([]);
      }
    } catch (error) {
      alert("Error uploading product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto">

      {/* Title */}
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          required
        />
      </div>

      {/* Category Select */}
      <div>
        <Label htmlFor="category">Category</Label>
        <Select onValueChange={(val) => handleSelectChange("category", val)} value={form.category}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {["men", "women", "kids", "unisex"].map((option) => (
              <SelectItem key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Type Select */}
      <div>
        <Label htmlFor="type">Type</Label>
        <Select onValueChange={(val) => handleSelectChange("type", val)} value={form.type}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {["top", "bottom", "dress", "outerwear", "footwear", "accessory"].map((option) => (
              <SelectItem key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Size */}
      <div>
        <Label htmlFor="size">Size</Label>
        <Input
          id="size"
          name="size"
          type="text"
          value={form.size}
          onChange={handleChange}
          required
        />
      </div>

      {/* Condition Select */}
      <div>
        <Label htmlFor="condition">Condition</Label>
        <Select onValueChange={(val) => handleSelectChange("condition", val)} value={form.condition}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select condition" />
          </SelectTrigger>
          <SelectContent>
            {["new", "like_new", "good", "fair", "poor"].map((option) => (
              <SelectItem key={option} value={option}>
                {option.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tags */}
      <div>
        <Label htmlFor="tags">Tags (comma separated)</Label>
        <Input
          id="tags"
          name="tags"
          type="text"
          value={form.tags}
          onChange={handleChange}
        />
      </div>

      {/* Points */}
      <div>
        <Label htmlFor="pointsValue">Points</Label>
        <Input
          id="pointsValue"
          name="pointsValue"
          type="number"
          value={form.pointsValue}
          onChange={handleChange}
          required
        />
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          required
        />
      </div>

      {/* Image Upload */}
      <div>
        <Label htmlFor="images">Upload Images</Label>
        <Input type="file" id="images" multiple accept="image/*" onChange={handleImageChange} />
        <div className="mt-2 flex gap-2 flex-wrap">
          {images.map((file, index) => (
            <img
              key={index}
              src={URL.createObjectURL(file)}
              className="w-16 h-16 object-cover rounded"
              alt={`preview-${index}`}
            />
          ))}
        </div>
      </div>

      {/* Submit */}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Uploading..." : "Create Product"}
      </Button>
    </form>
  );
}
