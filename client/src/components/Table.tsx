import React from "react";
import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell
} from "@table-library/react-table-library/table";
import { useTheme } from "@table-library/react-table-library/theme";
import { Event } from "../types/eventTypes";


interface TableProps {
  data: Event[];
  columns: any[];
  onRowClick: (item: Event) => void;
}

const THEME = {
  Table: `
	  border-collapse: collapse;
	  width: 100%;
	  margin: 20px 0;
	  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); /* If you want to keep the shadow */
	`,
  BaseRow: `
	font-size: 14px;
  `,
  HeaderRow: `
  z-index: 1;
	background-color: #eaf5fd;
  `,
  Row: `
	&:nth-of-type(odd) {
	  background-color: #d2e9fb;
	}

	&:nth-of-type(even) {
	  background-color: #eaf5fd;
	}
  `,
  HeaderCell: `
	  padding: 10px;
	  border: 1px solid #ddd;
	  text-align: left;
	  font-weight: bold;
	  background-color: #f4f4f4; /* Header background */
	`,
  Cell: `
	  padding: 10px;
	  border: 1px solid #ddd;
	  text-align: left;
	`,
  BaseCell: `
	  padding: 8px;
	  text-align: left;
	`,
};

const MainTable: React.FC<TableProps> = ({
  data,
  columns,
  onRowClick,
}) => {
  const tableData = { nodes: data };
  const theme = useTheme(THEME);

  return (
      <Table data={tableData} theme={theme}>
        {(tableList: any) => (
          <>
            <Header>
              <HeaderRow>
                {columns.map((column, index) => (
                  <HeaderCell key={index}>{column.Header}</HeaderCell>
                ))}
              </HeaderRow>
            </Header>
            <Body>
              {tableList.map((item: any) => (
                <Row key={item.id} item={item} onClick={() => onRowClick(item)}>
                  {columns.map((column, index) => (
                    <Cell key={index}>
                      {column.accessor ? column.accessor(item) : ""}
                    </Cell>
                  ))}
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
  );
};

export default MainTable;
