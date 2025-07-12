import { useEffect } from "react";
import { useProductStore } from "@/store/productStore";
import ProductCard from "@/components/admin/ProductCard";

const ManageListingsTab = () => {
    const { products, fetchProducts } = useProductStore();
  
    useEffect(() => {
      fetchProducts();
    }, []);
  return (
    <div>
      {" "}
      <div className="space-y-4">
        {products.map((prod) => (
          <ProductCard
            key={prod._id}
            id={prod._id}
            title={prod.title}
            description={prod.description}
            pointsValue={prod.pointsValue}
            approvalStatus={prod.approvalStatus}
            owner={prod.owner}
            imageUrl={prod.images?.[0]?.url}
          />
        ))}
      </div>
    </div>
  );
};

export default ManageListingsTab;
