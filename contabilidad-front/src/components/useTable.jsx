import React from "react";
import { Table, TableCell, TableHead, TableRow } from "@material-ui/core";
export default function useTable(records, headCells) {
  const TblContainer = (props) => <Table>{props.children}</Table>;
  const TblHead = (props) => {
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell key={headCell.id}>{headCell.label}</TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };
  return {
    TblContainer,
    TblHead
  };
}
