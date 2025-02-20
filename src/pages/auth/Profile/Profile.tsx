import { useRef } from "react";
import { Avatar, Button, FlexboxGrid, Heading, Stack, Text } from "rsuite";
import PopupAddress from "./components/Popup/PopupAddress";
import PopupProfile from "./components/Popup/PopupProfile";
import "./components/styling/style.scss";

const Profile = () => {
  const popupProfileRef = useRef<any>(null);
  const popupAddressRef = useRef<any>(null);

  const handleEditProfile = () => {
    popupProfileRef.current.edit();
  };

  const handleEditAddress = () => {
    popupAddressRef.current.edit();
  };

  return (
    <Stack direction="column" alignItems="flex-start">
      <Stack spacing={10} alignItems="center">
        <Avatar
          size="xl"
          circle
          src="https://avatars.githubusercontent.com/u/139426"
        />

        <Stack
          direction="column"
          alignItems="flex-start"
          style={{
            height: "90px",
          }}
        >
          <Heading>Tên tài khoản</Heading>

          <Stack spacing={10}>
            <Button appearance="primary">Chọn ảnh đại diện</Button>
            <Button appearance="primary">Xóa ảnh đại diện</Button>
          </Stack>
        </Stack>
      </Stack>

      <Stack.Item style={{ width: "100%" }}>
        <Stack
          direction="column"
          alignItems="flex-start"
          className="profile-info"
          spacing={10}
        >
          <Stack justifyContent="space-between">
            <Stack.Item>
              <Heading level={5}>Thông tin cá nhân</Heading>
            </Stack.Item>
            <Stack.Item className="profile-info__edit">
              <Button appearance="primary" onClick={handleEditProfile}>
                Sửa
              </Button>
            </Stack.Item>
          </Stack>

          <FlexboxGrid>
            <FlexboxGrid.Item
              colspan={8}
              style={{
                marginBottom: "30px",
              }}
            >
              <Stack direction="column">
                <Text>Tên tài khoản</Text>
                <strong>khanh2142</strong>
              </Stack>
            </FlexboxGrid.Item>

            <FlexboxGrid.Item colspan={8}>
              <Stack direction="column">
                <Text>Họ</Text>
                <strong>Nguyễn Bá</strong>
              </Stack>
            </FlexboxGrid.Item>

            <FlexboxGrid.Item colspan={8}>
              <Stack direction="column">
                <Text>Tên</Text>
                <strong>Khánh</strong>
              </Stack>
            </FlexboxGrid.Item>

            <FlexboxGrid.Item colspan={8}>
              <Stack direction="column">
                <Text>Số điện thoại</Text>
                <strong>0369698501</strong>
              </Stack>
            </FlexboxGrid.Item>

            <FlexboxGrid.Item colspan={8}>
              <Stack direction="column">
                <Text>Email</Text>
                <strong>k2142a@gmail.com</strong>
              </Stack>
            </FlexboxGrid.Item>

            <FlexboxGrid.Item colspan={8}>
              <Stack direction="column">
                <Text>Phòng ban</Text>
                <strong></strong>
              </Stack>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Stack>
      </Stack.Item>

      <Stack.Item style={{ width: "100%", marginTop: "10px" }}>
        <Stack
          direction="column"
          alignItems="flex-start"
          className="profile-info"
          spacing={10}
        >
          <Stack justifyContent="space-between">
            <Stack.Item>
              <Heading level={5}>Địa chỉ liên hệ</Heading>
            </Stack.Item>
            <Stack.Item className="profile-info__edit">
              <Button appearance="primary" onClick={handleEditAddress}>
                Sửa
              </Button>
            </Stack.Item>
          </Stack>

          <FlexboxGrid>
            <FlexboxGrid.Item
              colspan={12}
              style={{
                marginBottom: "30px",
              }}
            >
              <Stack direction="column">
                <Text>Tỉnh/Thành phố</Text>
                <strong>Hà Nội</strong>
              </Stack>
            </FlexboxGrid.Item>

            <FlexboxGrid.Item colspan={12}>
              <Stack direction="column">
                <Text>Quận/Huyện</Text>
                <strong>Cầu Giấy</strong>
              </Stack>
            </FlexboxGrid.Item>

            <FlexboxGrid.Item colspan={12}>
              <Stack direction="column">
                <Text>Phường/Xã</Text>
                <strong>Dịch Vọng Hậu</strong>
              </Stack>
            </FlexboxGrid.Item>

            <FlexboxGrid.Item colspan={12}>
              <Stack direction="column">
                <Text>Tên đường, Tòa nhà, Số nhà</Text>
                <strong></strong>
              </Stack>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Stack>
      </Stack.Item>

      <PopupProfile ref={popupProfileRef} />

      <PopupAddress ref={popupAddressRef} />
    </Stack>
  );
};

export default Profile;
