import { Button } from "@/components/ui/button";
import { updateApproval } from "@/lib/adminApi";
import { useProductStore } from "@/store/productStore";

type Props = {
  id: string;
  title: string;
  description: string;
  pointsValue: number;
  approvalStatus: string;
  owner?: { name: string; email: string } | null;
  imageUrl?: string;
};

export default function ProductCard({
  id,
  title,
  description,
  pointsValue,
  approvalStatus,
  owner,
  imageUrl
}: Props) {
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  const handleUpdate = async (status: "approved" | "rejected") => {
    await updateApproval(id, status);
    fetchProducts();
  };

  return (
    <div className="flex items-start justify-between border p-4 rounded-xl shadow-sm">
      {/* Image */}
      <div className="w-24 h-24 rounded-md bg-gray-100 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            width={96}
            height={96}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">No Image</div>
        )}
      </div>

      {/* Details */}
      <div className="flex-1 px-4">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
        <p className="text-xs mt-1 text-gray-600">Points: {pointsValue}</p>
        {owner ? (
          <p className="text-xs text-gray-500 mt-1">
            Owner: {owner.name} ({owner.email})
          </p>
        ) : (
          <p className="text-xs text-red-400 mt-1">Owner: None</p>
        )}
        <p className="text-xs mt-1">
          Status:{" "}
          <span
            className={`font-medium ${
              approvalStatus === "approved"
                ? "text-green-600"
                : approvalStatus === "rejected"
                ? "text-red-600"
                : "text-yellow-600"
            }`}
          >
            {approvalStatus}
          </span>
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2">
        {approvalStatus === "pending" && (
          <>
            <Button
              variant="default"
              onClick={() => handleUpdate("approved")}
            >
              Approve
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleUpdate("rejected")}
            >
              Reject
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
