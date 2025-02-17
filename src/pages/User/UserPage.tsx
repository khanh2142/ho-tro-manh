import { faker } from "@faker-js/faker";
import PlusIcon from "@rsuite/icons/Plus";
import TrashIcon from "@rsuite/icons/Trash";
import { Button, Heading, Stack } from "rsuite";
import SearchForm, { Field } from "../../components/SearchForm/SearchForm";
import StatusTag from "../../components/StatusTag/StatusTag";
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
      dataKey: "userName",
      label: "Tên tài khoản",
      width: 200,
    },
    {
      label: "Họ",
      dataKey: "firstName",
      width: 100,
    },
    {
      label: "Tên",
      dataKey: "lastName",
      width: 100,
    },
    {
      label: "Số điện thoại",
      dataKey: "phone",
      width: 200,
    },
    {
      label: "Email",
      dataKey: "email",
      width: 200,
    },
    {
      label: "Phòng ban",
      dataKey: "department",
      width: 150,
    },
    {
      label: "Trạng thái",
      dataKey: "status",
      width: 100,
      cell: (rowData) => {
        return <StatusTag status={rowData.status} />;
      },
    },
  ];

  const data = Array.from({ length: 100 }).map((_, index) => ({
    // use faker to generate fake data
    userName: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phone: faker.phone.number(),
    email: faker.internet.email(),
    department: faker.commerce.department(),
    status: faker.helpers.arrayElement(["active", "inactive"]),
  }));

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
        <TableRender columns={columns} data={data} primaryKey={"userName"} />
      </Stack.Item>
    </Stack>
  );
};

export default UserPage;
