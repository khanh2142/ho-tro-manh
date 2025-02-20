import GridIcon from "@rsuite/icons/Grid";
import React from "react";
import { useNavigate } from "react-router";
import { Nav, Sidenav } from "rsuite";
// import "rsuite/Dropdown/styles/index.css";
import { commonRoutes } from "../../routes/common";
import UserInfo from "../UserInfo/UserInfo";
import "./style.scss";

const CustomSidenav = ({
  openKeys,
  expanded,
  onOpenChange,
  onExpand,
  ...navProps
}: any) => {
  const navigate = useNavigate();

  const styles = {
    width: 240,
    height: "100%",
    position: "relative",
  };

  const onNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div style={styles}>
      <Sidenav
        expanded={expanded}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        style={{
          height: "100%",
        }}
      >
        <Sidenav.Body>
          <Nav {...navProps}>
            <Nav.Menu title="Common" icon={<GridIcon />}>
              {commonRoutes.map((item) => {
                return (
                  <Nav.Item
                    key={item.key}
                    onSelect={() => onNavigate(item.path)}
                  >
                    {item.text}
                  </Nav.Item>
                );
              })}
              <Nav.Item divider />
            </Nav.Menu>
            <Nav.Menu eventKey="4" title="WFM" icon={<GridIcon />}>
              <Nav.Item eventKey="4-1">Loại công việc</Nav.Item>
              <Nav.Item eventKey="4-2">Cấu hình chuyển trạng thái</Nav.Item>
              <Nav.Item eventKey="4-3">Quản lý công việc</Nav.Item>
            </Nav.Menu>
          </Nav>
        </Sidenav.Body>
      </Sidenav>

      <UserInfo />
    </div>
  );
};

const SideBar = () => {
  const [activeKey, setActiveKey] = React.useState<string>("1");
  const [openKeys, setOpenKeys] = React.useState<string[]>(["3", "4"]);
  const [expanded, setExpand] = React.useState<boolean>(true);

  return (
    <CustomSidenav
      activeKey={activeKey}
      openKeys={openKeys}
      onSelect={setActiveKey}
      onOpenChange={setOpenKeys}
      expanded={expanded}
      onExpand={setExpand}
    />
  );
};

export default SideBar;
