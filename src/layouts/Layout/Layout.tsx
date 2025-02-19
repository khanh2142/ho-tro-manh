import { Outlet } from "react-router";
import { Stack } from "rsuite";
import SideBar from "../SideBar/SideBar";

const Layout = () => {
  return (
    <Stack
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <Stack.Item
        style={{
          height: "100%",
        }}
      >
        <SideBar />
      </Stack.Item>
      <Stack.Item
        style={{
          padding: "10px",
          height: "100%",
          overflow: "hidden",
          width: "100%",
        }}
      >
        <Outlet />
      </Stack.Item>
    </Stack>
  );
};

export default Layout;
