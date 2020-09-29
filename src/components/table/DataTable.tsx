import React from 'react';

import classes from './DataTable.module.scss';

export type TableDataArr = Array<{
  name: string;
  [keyName: string]: string | number | JSX.Element | boolean | null;
}>;

type DataTableProps = {
  tableName: string;
  headers: Array<{
    name: string;
    keyName: string;
  }>;
  data: TableDataArr | null;
};

const DataTable: React.FC<DataTableProps> = ({ tableName, headers, data }) => {
  return (
    <table id={tableName} className={classes.table}>
      <thead>
        <tr className={classes.headClass}>
          {headers.map((header, indx) => (
            <th
              key={`tableHead_${header.name}${indx + 1}`}
              className={classes.tableTh}
            >
              {header.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {!data || data.length === 0 ? (
          <tr>
            <td className={classes.emptyTable} colSpan={headers.length}>
              No Data found
            </td>
          </tr>
        ) : (
          data.map((row, rowI: number) => (
            <tr key={`row_${rowI + 1}`}>
              {headers.map((header, headI) => (
                <td
                  key={`tableCell_${rowI + 1}${headI + 1}${header.keyName}`}
                  className={classes.tdClass}
                >
                  {row[header.keyName]}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default DataTable;
