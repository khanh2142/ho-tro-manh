import EditIcon from "@rsuite/icons/Edit";
import TrashIcon from "@rsuite/icons/Trash";
import React, { forwardRef, useImperativeHandle } from "react";
import {
  Checkbox,
  IconButton,
  Pagination,
  RowProps,
  Stack,
  Table,
} from "rsuite";
import { Cell, HeaderCell } from "rsuite-table";
import Column from "rsuite/esm/Table/TableColumn";
import { CheckCell } from "./components/CheckCell/CheckCell";
import "./components/styling/style.scss";

export interface Column {
  width?: number;
  label: string;
  dataKey: string;
  cell?: (rowData: any) => React.ReactNode;
}

interface TableRenderProps {
  columns: Column[];
  primaryKey: string;
  handleEdit?: (rowData: any) => void;
  handleDelete?: (rowData: any) => void;
}

const TableRender = forwardRef(
  (
    { columns, primaryKey, handleEdit, handleDelete }: TableRenderProps,
    ref
  ) => {
    useImperativeHandle(ref, () => ({
      getSelectedRows: () => {
        return data.filter((item) => {
          return checkedKeys.includes(item[primaryKey]);
        });
      },
      setData: (data: any[]) => {
        setData(data);
      },
    }));

    const [data, setData] = React.useState<any[]>([]);
    const [checkedKeys, setCheckedKeys] = React.useState<any[]>([]);
    let checked = false;
    let indeterminate = false;

    if (checkedKeys.length === data.length) {
      checked = true;
    } else if (checkedKeys.length === 0) {
      checked = false;
    } else if (checkedKeys.length > 0 && checkedKeys.length < data.length) {
      indeterminate = true;
    }

    const handleCheckAll = (value, checked) => {
      const keys = checked ? data.map((item) => item[primaryKey]) : [];
      setCheckedKeys(keys);
    };
    const handleCheck = (value, checked) => {
      const keys = checked
        ? [...checkedKeys, value]
        : checkedKeys.filter((item) => item !== value);
      setCheckedKeys(keys);
    };

    const [limit, setLimit] = React.useState(10);
    const [page, setPage] = React.useState(1);

    const handleChangeLimit = (limit: number) => {
      setPage(1);
      setLimit(limit);
    };

    const filterData = data
      .filter((v, i) => {
        const start = limit * (page - 1);
        const end = start + limit;
        return i >= start && i < end;
      })
      .map((item, index) => {
        return {
          ...item,
          // idx calculate index of item in data
          idx: index + 1 + limit * (page - 1),
        };
      });

    return (
      <Stack
        direction="column"
        alignItems="flex-start"
        style={{
          background: "#fff",
        }}
      >
        <Stack.Item style={{ width: "100%" }}>
          <Table
            height={400}
            data={filterData}
            style={{
              background: "#fff",
            }}
          >
            <Column width={50} align="center">
              <HeaderCell style={{ padding: 0 }}>
                <div style={{ lineHeight: "40px" }}>
                  <Checkbox
                    inline
                    checked={checked}
                    indeterminate={indeterminate}
                    onChange={handleCheckAll}
                  />
                </div>
              </HeaderCell>
              <CheckCell
                dataKey={primaryKey}
                checkedKeys={checkedKeys}
                onChange={handleCheck}
              />
            </Column>

            <Column width={50}>
              <HeaderCell>STT</HeaderCell>
              <Cell dataKey={"idx"} />
            </Column>

            <Column width={100}>
              <HeaderCell>Hành động</HeaderCell>
              <Cell dataKey={"action"}>
                {(rowData: RowProps) => {
                  return (
                    <Stack spacing={10}>
                      <Stack.Item>
                        <IconButton
                          icon={<EditIcon />}
                          appearance="primary"
                          size="xs"
                          onClick={() => handleEdit?.(rowData)}
                        ></IconButton>
                      </Stack.Item>
                      <Stack.Item>
                        <IconButton
                          icon={<TrashIcon />}
                          appearance="primary"
                          color="red"
                          size="xs"
                          onClick={() => handleDelete?.(rowData)}
                        ></IconButton>
                      </Stack.Item>
                    </Stack>
                  );
                }}
              </Cell>
            </Column>

            {columns.map((column, index) => {
              return (
                <Column width={column.width ?? 100} key={index}>
                  <HeaderCell>{column.label}</HeaderCell>
                  {column.cell ? (
                    <Cell dataKey={column.dataKey}>{column.cell}</Cell>
                  ) : (
                    <Cell dataKey={column.dataKey}></Cell>
                  )}
                </Column>
              );
            })}
          </Table>
        </Stack.Item>

        <Stack.Item style={{ width: "100%", padding: "10px 0" }}>
          <Stack justifyContent="flex-end" style={{ width: "100%" }}>
            <Pagination
              prev
              next
              first
              last
              ellipsis
              boundaryLinks
              maxButtons={5}
              size="sm"
              layout={["total", "-", "limit", "|", "pager", "skip"]}
              total={data.length}
              limitOptions={[5, 10, 15, 20, 25]}
              limit={limit}
              activePage={page}
              onChangePage={setPage}
              onChangeLimit={handleChangeLimit}
            />
          </Stack>
        </Stack.Item>
      </Stack>
    );
  }
);

export default TableRender;
