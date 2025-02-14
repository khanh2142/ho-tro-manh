import { Stack } from "rsuite";
import SideBar from "./layouts/SideBar/SideBar";
import UserPage from "./pages/User/UserPage";

function App() {
  return (
    <Stack
      alignItems="flex-start"
      style={{
        background: "#dcd7d7",
      }}
    >
      <SideBar />

      <UserPage />
    </Stack>
  );
}

export default App;
