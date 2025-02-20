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
import PopupCategory from "./components/PopupCategory";

const CategoryPage = () => {
  const popupRef = useRef(null);
  const popupDeleteRef = useRef(null);
  const tableRef = useRef(null);
  const toaster = useToaster();

  const defaultFormValue = {
    categoryCode: "",
    categoryName: "",
  };

  const fields: Field[] = [
    {
      label: "Mã danh mục",
      name: "usercategoryCodeName",
    },
    {
      label: "Tên danh mục",
      name: "categoryName",
    },
  ];

  const columns: Column[] = [
    {
      label: "Mã danh mục",
      dataKey: "categoryCode",
      width: 200,
    },
    {
      label: "Tên danh mục",
      dataKey: "categoryName",
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
    categoryCode: faker.food.adjective(),
    categoryName: faker.food.adjective(),
    categoryParent: faker.food.adjective(),
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
      content: `Bạn có chắc chắn muốn xóa danh mục ${rowData.categoryCode}?`,
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
          <strong>Vui lòng chọn danh mục</strong>
        </Message>,
        {
          duration: 1000,
        }
      );
      return;
    }

    popupDeleteRef.current?.open({
      content: `Bạn có chắc chắn muốn xóa ${listChecked.length} danh mục?`,
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
      <Heading>Danh sách danh mục</Heading>
      <Stack spacing={10}>
        <Button
          startIcon={<PlusIcon />}
          appearance="primary"
          onClick={handleAdd}
        >
          Thêm danh mục
        </Button>
        <Button
          startIcon={<TrashIcon />}
          appearance="primary"
          onClick={handleDeleteMultiple}
        >
          Xóa danh mục
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

      <PopupCategory ref={popupRef} />

      <PopupDelete
        ref={popupDeleteRef}
        handleConfirmDelete={handleConfirmDelete}
      />
    </Stack>
  );
};

export default CategoryPage;
