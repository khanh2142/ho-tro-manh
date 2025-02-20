import { faker } from "@faker-js/faker";
import PlusIcon from "@rsuite/icons/Plus";
import TrashIcon from "@rsuite/icons/Trash";
import { useRef } from "react";
import { Button, Heading, Message, Stack, useToaster } from "rsuite";
import PopupDelete from "../../../components/Popup/PopupDelete/PopupDelete";
import SearchForm, { Field } from "../../../components/SearchForm/SearchForm";
import StatusTag from "../../../components/StatusTag/StatusTag";
import TableRender, {
  Column,
} from "../../../components/TableRender/TableRender";
import PopupDepartment from "./components/PopupDepartment";

const DepartmentPage = () => {
  const popupRef = useRef(null);
  const popupDeleteRef = useRef(null);
  const tableRef = useRef(null);
  const toaster = useToaster();

  const defaultFormValue = {
    departmentCode: "",
    departmentName: "",
  };

  const fields: Field[] = [
    {
      label: "Mã phòng ban",
      name: "userdepartmentCodeName",
    },
    {
      label: "Tên phòng ban",
      name: "departmentName",
    },
  ];

  const columns: Column[] = [
    {
      dataKey: "departmentCode",
      label: "Mã phòng ban",
      width: 200,
    },
    {
      label: "Tên phòng ban",
      dataKey: "departmentName",
      width: 200,
    },
    {
      label: "Phòng ban cha",
      dataKey: "departmentParent",
      width: 200,
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
    departmentCode: faker.commerce.department(),
    departmentName: faker.commerce.department(),
    departmentParent: faker.commerce.department(),
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
      content: `Bạn có chắc chắn muốn xóa phòng ban ${rowData.departmentCode}?`,
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
          <strong>Vui lòng chọn phòng ban</strong>
        </Message>,
        {
          duration: 1000,
        }
      );
      return;
    }

    popupDeleteRef.current?.open({
      content: `Bạn có chắc chắn muốn xóa ${listChecked.length} phòng ban?`,
      data: listChecked,
    });
  };

  return (
    <Stack
      direction="column"
      alignItems="flex-start"
      spacing={10}
      style={{
        width: "100%",
      }}
    >
      <Heading>Danh sách Phòng ban</Heading>
      <Stack spacing={10}>
        <Button
          startIcon={<PlusIcon />}
          appearance="primary"
          onClick={handleAdd}
        >
          Thêm phòng ban
        </Button>
        <Button
          startIcon={<TrashIcon />}
          appearance="primary"
          onClick={handleDeleteMultiple}
        >
          Xóa phòng ban
        </Button>
      </Stack>

      <Stack.Item style={{ width: "100%" }}>
        <SearchForm
          fields={fields}
          onSearch={onSearch}
          defaultFormValue={defaultFormValue}
        />
      </Stack.Item>

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

      <PopupDepartment ref={popupRef} />

      <PopupDelete
        ref={popupDeleteRef}
        handleConfirmDelete={handleConfirmDelete}
      />
    </Stack>
  );
};

export default DepartmentPage;
