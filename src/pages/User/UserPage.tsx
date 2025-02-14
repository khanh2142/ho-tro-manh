import PlusIcon from "@rsuite/icons/Plus";
import TrashIcon from "@rsuite/icons/Trash";
import { Button, Heading, Stack } from "rsuite";
import SearchForm, { Field } from "../../components/SearchForm/SearchForm";
import TableRender, { Column } from "../../components/TableRender/TableRender";

const UserPage = () => {
  const fields: Field[] = [
    {
      label: "Tên tài khoản",
      name: "userName",
    },
    {
      label: "Họ và tên",
      name: "fullName",
    },
    {
      label: "Email",
      name: "email",
    },
    {
      label: "Số điện thoại",
      name: "phone",
    },
  ];

  const columns: Column[] = [
    {
      dataKey: "idx",
      label: "STT",
      width: 100,
    },
  ];

  const data = [
    {
      idx: 1,
      userName: "admin",
      fullName: "Admin",
      email: "",
    },
  ];

  return (
    <Stack direction="column" alignItems="flex-start" spacing={10}>
      <Heading>Danh sách User</Heading>
      <Stack spacing={10}>
        <Button startIcon={<PlusIcon />} appearance="primary">
          Thêm user
        </Button>
        <Button startIcon={<TrashIcon />} appearance="primary">
          Xóa user
        </Button>
      </Stack>

      <SearchForm fields={fields} />

      <Stack.Item style={{ width: "100%" }}>
        <TableRender columns={columns} data={data} />
      </Stack.Item>
    </Stack>
  );
};

export default UserPage;
