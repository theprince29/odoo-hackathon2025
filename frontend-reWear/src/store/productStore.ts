import { create } from 'zustand';
import { getAllProducts } from '@/lib/adminApi';

type Product = {
  title: string;
  images: any;
  pointsValue: number;
  description: string;
  _id: string;
  approvalStatus: string;
  owner: { name: string; email: string };
};

type ProductStore = {
  products: Product[];
  fetchProducts: () => Promise<void>;
};

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  fetchProducts: async () => {
    const res = await getAllProducts();
    if (res.success) {
      set({ products: res.data });
    }
  },
}));
