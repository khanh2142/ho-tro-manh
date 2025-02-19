import GridIcon from "@rsuite/icons/Grid";
import React from "react";
import { Nav, Sidenav } from "rsuite";

const CustomSidenav = ({
  openKeys,
  expanded,
  onOpenChange,
  onExpand,
  ...navProps
}: any) => {
  const styles = {
    width: 240,
    display: "inline-table",
    marginRight: 10,
    height: "100vh",
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
            <Nav.Menu eventKey="3" title="Common" icon={<GridIcon />}>
              <Nav.Item eventKey="3-1">User</Nav.Item>
              <Nav.Item eventKey="3-2">Phòng ban</Nav.Item>
              <Nav.Item eventKey="3-3">Danh mục</Nav.Item>
              <Nav.Item eventKey="3-4">Hạng mục</Nav.Item>
              <Nav.Item divider />
            </Nav.Menu>
            <Nav.Menu eventKey="4" title="WFM" icon={<GridIcon />}>
              <Nav.Item eventKey="4-1">Loại công việc</Nav.Item>
              <Nav.Item eventKey="4-2">Cấu hình chuyển trạng thái</Nav.Item>
              <Nav.Item eventKey="4-3">Quản lý công việc</Nav.Item>
            </Nav.Menu>
          </Nav>
        </Sidenav.Body>
        <Sidenav.Toggle onToggle={onExpand} />
      </Sidenav>
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
