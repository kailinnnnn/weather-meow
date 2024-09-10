import { Outlet } from "react-router-dom";
import { AuthProvider } from "./context/authContext";

function App() {
  return (
    <div className="flex h-screen w-full">
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </div>
  );
}

export default App;
