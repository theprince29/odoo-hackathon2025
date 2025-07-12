import { Button } from "@/components/ui/button";
import { Ghost } from "lucide-react";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <Ghost className="w-16 h-16 text-gray-400 mb-4" />
      <h1 className="text-4xl font-bold text-gray-900 mb-2">
        404 - Page Not Found
      </h1>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </p>
      <Button onClick={() => navigate("/")} className="text-white">
        Go back home
      </Button>
    </div>
  );
};

export default NotFound;
