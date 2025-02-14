import React from "react";
import { Pagination, Stack, Table } from "rsuite";
import { Cell, HeaderCell } from "rsuite-table";
import Column from "rsuite/esm/Table/TableColumn";

export interface Column {
  width?: number;
  label: string;
  dataKey: string;
}

interface TableRenderProps {
  columns: Column[];
  data: any[];
}

const TableRender = ({ columns, data = [] }: TableRenderProps) => {
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);

  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };

  const filterData = data.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });

  console.log(filterData);

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
          onRowClick={(rowData) => {
            console.log(rowData);
          }}
          style={{
            background: "#fff",
          }}
        >
          {columns.map((column, index) => {
            return (
              <Column width={column.width ?? 100} key={index}>
                <HeaderCell>{column.label}</HeaderCell>
                <Cell dataKey={column.dataKey} />
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
            size="xs"
            layout={["total", "-", "limit", "|", "pager", "skip"]}
            total={filterData.length}
            limitOptions={[10, 30, 50]}
            limit={limit}
            activePage={page}
            onChangePage={setPage}
            onChangeLimit={handleChangeLimit}
          />
        </Stack>
      </Stack.Item>
    </Stack>
  );
};

export default TableRender;
