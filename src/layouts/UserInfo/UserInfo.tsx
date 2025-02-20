import { useNavigate } from "react-router";
import { Avatar, Dropdown, Text } from "rsuite";
import { useAuthStore } from "../../store/useAuthStore";

const UserInfo = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  console.log(user);

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleChangePassword = () => {
    navigate("/changePassword");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="avatar">
      <Dropdown
        renderToggle={(props) => (
          <Avatar
            circle
            {...props}
            src={user.avatar}
            color="red"
            bordered
            alt={user.fullName}
          />
        )}
        placement="topStart"
      >
        <Dropdown.Item onClick={handleProfile}>Hồ sơ của tôi</Dropdown.Item>
        <Dropdown.Item onClick={handleChangePassword}>
          Đổi mật khẩu
        </Dropdown.Item>
        <Dropdown.Item onClick={handleLogout}>Đăng xuất</Dropdown.Item>
      </Dropdown>

      <Text>
        <strong>{user.fullName}</strong>
      </Text>
    </div>
  );
};

export default UserInfo;
