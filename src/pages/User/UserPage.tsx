import { faker } from "@faker-js/faker";
import PlusIcon from "@rsuite/icons/Plus";
import TrashIcon from "@rsuite/icons/Trash";
import { useRef } from "react";
import { Button, Heading, Message, Stack, useToaster } from "rsuite";
import PopupDelete from "../../components/Popup/PopupDelete/PopupDelete";
import SearchForm, { Field } from "../../components/SearchForm/SearchForm";
import StatusTag from "../../components/StatusTag/StatusTag";
import TableRender, { Column } from "../../components/TableRender/TableRender";
import PopupUser from "./components/PopupUser";

const UserPage = () => {
  const popupRef = useRef(null);
  const popupDeleteRef = useRef(null);
  const tableRef = useRef(null);
  const toaster = useToaster();

  const defaultFormValue = {
    userName: "",
    fullName: "",
    email: "",
    phone: "",
  };

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

  const onSearch = (formValue: any) => {
    console.log(formValue);
  };

  const handleAdd = () => {
    popupRef.current?.create();
  };

  const handleEdit = (rowData: any) => {
    popupRef.current?.edit(rowData);
  };

  const handleDelete = (rowData: any) => {
    popupDeleteRef.current?.open({
      content: `Bạn có chắc chắn muốn xóa user ${rowData.userName}?`,
      data: rowData,
    });
  };

  const handleConfirmDelete = (rowData) => {
    console.log("delete", rowData);
  };

  const handleDeleteMultiple = () => {
    const listChecked = tableRef.current?.getSelectedRows();

    if (!listChecked || listChecked.length === 0) {
      toaster.push(
        <Message type="error">
          <strong>Vui lòng chọn user</strong>
        </Message>,
        {
          duration: 1000,
        }
      );
      return;
    }

    popupDeleteRef.current?.open({
      content: `Bạn có chắc chắn muốn xóa ${listChecked.length} user?`,
      data: listChecked,
    });
  };

  return (
    <Stack direction="column" alignItems="flex-start" spacing={10}>
      <Heading>Danh sách User</Heading>
      <Stack spacing={10}>
        <Button
          startIcon={<PlusIcon />}
          appearance="primary"
          onClick={handleAdd}
        >
          Thêm user
        </Button>
        <Button
          startIcon={<TrashIcon />}
          appearance="primary"
          onClick={handleDeleteMultiple}
        >
          Xóa user
        </Button>
      </Stack>

      <SearchForm
        fields={fields}
        onSearch={onSearch}
        defaultFormValue={defaultFormValue}
      />

      <Stack.Item style={{ width: "100%" }}>
        <TableRender
          ref={tableRef}
          columns={columns}
          data={data}
          primaryKey={"userName"}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </Stack.Item>

      <PopupUser ref={popupRef} />

      <PopupDelete
        ref={popupDeleteRef}
        handleConfirmDelete={handleConfirmDelete}
      />
    </Stack>
  );
};

export default UserPage;
