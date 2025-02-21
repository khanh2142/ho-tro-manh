import PlusIcon from "@rsuite/icons/Plus";
import TrashIcon from "@rsuite/icons/Trash";
import { useEffect, useRef } from "react";
import { Button, Heading, Message, Stack, useToaster } from "rsuite";
import PopupDelete from "../../../components/Popup/PopupDelete/PopupDelete";
import SearchForm, { Field } from "../../../components/SearchForm/SearchForm";
import StatusTag from "../../../components/StatusTag/StatusTag";
import TableRender, {
  Column,
} from "../../../components/TableRender/TableRender";
import { useApiService } from "../../../config/api/ApiService";
import PopupUser from "./components/PopupUser";

const UserPage = () => {
  const popupRef = useRef(null);
  const popupDeleteRef = useRef(null);
  const tableRef = useRef(null);
  const toaster = useToaster();
  const api = useApiService();

  useEffect(() => {}, []);

  const defaultFormValue = {
    userName: "",
    name: "",
    email: "",
    phoneNumber: "",
  };

  const fields: Field[] = [
    {
      label: "Tên tài khoản",
      name: "userName",
    },
    {
      label: "Họ và tên",
      name: "name",
    },
    {
      label: "Email",
      name: "email",
    },
    {
      label: "Số điện thoại",
      name: "phoneNumber",
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
      dataKey: "phoneNumber",
      width: 200,
    },
    {
      label: "Email",
      dataKey: "email",
      width: 200,
    },
    {
      label: "Phòng ban",
      dataKey: "departmentName",
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

  const onSearch = async (formValue: any) => {
    const queryString = `paging?first=0&rows=10&page=0&userName=${formValue.userName}&name=${formValue.name}&email=${formValue.email}&phoneNumber=${formValue.phoneNumber}`;

    const resp = await api.user_search({
      params: queryString,
    });

    tableRef.current?.setData(resp.data);
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
