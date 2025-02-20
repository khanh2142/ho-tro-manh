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
import PopupItem from "./components/PopupItem";

const ItemPage = () => {
  const popupRef = useRef(null);
  const popupDeleteRef = useRef(null);
  const tableRef = useRef(null);
  const toaster = useToaster();

  const defaultFormValue = {
    itemCode: "",
    itemName: "",
  };

  const fields: Field[] = [
    {
      label: "Mã hạng mục",
      name: "itemCode",
    },
    {
      label: "Tên hạng mục",
      name: "itemName",
    },
    {
      label: "Mã danh mục",
      name: "categoryCode",
    },
  ];

  const columns: Column[] = [
    {
      dataKey: "itemCode",
      label: "Mã hạng mục",
      width: 200,
    },
    {
      label: "Tên hạng mục",
      dataKey: "itemName",
      width: 200,
    },
    {
      label: "hạng mục cha",
      dataKey: "itemParent",
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
    itemCode: faker.commerce.product(),
    itemName: faker.commerce.product(),
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
      content: `Bạn có chắc chắn muốn xóa hạng mục ${rowData.itemCode}?`,
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
          <strong>Vui lòng chọn hạng mục</strong>
        </Message>,
        {
          duration: 1000,
        }
      );
      return;
    }

    popupDeleteRef.current?.open({
      content: `Bạn có chắc chắn muốn xóa ${listChecked.length} hạng mục?`,
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
      <Heading>Danh sách hạng mục</Heading>
      <Stack spacing={10}>
        <Button
          startIcon={<PlusIcon />}
          appearance="primary"
          onClick={handleAdd}
        >
          Thêm hạng mục
        </Button>
        <Button
          startIcon={<TrashIcon />}
          appearance="primary"
          onClick={handleDeleteMultiple}
        >
          Xóa hạng mục
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

      <PopupItem ref={popupRef} />

      <PopupDelete
        ref={popupDeleteRef}
        handleConfirmDelete={handleConfirmDelete}
      />
    </Stack>
  );
};

export default ItemPage;
