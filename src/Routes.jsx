import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Answer from "./pages/Answer";
import { MemberstackProvider } from "@memberstack/react";

const RouteCmp = () => {
  return (
    <>
      <MemberstackProvider
        config={{
          publicKey: import.meta.env.VITE_MEMBERSTACK_PUBLIC_KEY,
          useCookies: true,
          setCookieOnRootDomain: true,
        }}
      >
        <Routes>
          <Route path="*" element={<Navigate to="/quizcam" replace />} />
          <Route path="/" element={<Navigate to="/quizcam" replace />} />
          <Route path="/quizcam" element={<Home />} />
          <Route path="/answer" element={<Answer />} />
        </Routes>
      </MemberstackProvider>
    </>
  );
};

export default RouteCmp;
