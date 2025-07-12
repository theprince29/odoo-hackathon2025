// import { Button } from "@/components/ui/button"
import { Route, Routes } from "react-router-dom";
import ReWearLanding from "./pages/home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ReWearLanding />} />
      </Routes>
    </>
  )
}

export default App