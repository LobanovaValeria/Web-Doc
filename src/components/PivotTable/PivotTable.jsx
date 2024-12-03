import * as React from 'react';
import { useState, useEffect } from 'react';
import { Table, TableBody, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

import { StyledTableCell, StyledTableRow } from './constUiStyle';
import { getDocuments } from '../../services/api/apiDocuments';
import { resources } from '../../resources/resources';

export default function PivotTable() {
  const [sumCount, setSumCount] = useState([]);

  const sumAppAddNumber = (arr) => {
    
    const sumAppArr = arr.reduce((acc, arr) => {
      const docName = arr.documentName;
      if (!(docName in acc)) {
        acc[docName] = { count: 0};
      }
      acc[docName].count++;
      return acc;
    }, {});

    const separetionSumAppArr = Object.entries(sumAppArr).map(
      ([documentName, { count}]) => ({ documentName, count }),
    );

    return separetionSumAppArr;
  };

  const fetchSumCount = async () => {
    try {
      const applicationData = await getDocuments();
      const notNulapplicationData=Array.isArray(applicationData) ? applicationData : [];
      const arrSort = sumAppAddNumber(notNulapplicationData);
      arrSort.sort((a, b) => b.count - a.count);
      setSumCount(arrSort);
    } catch (error) {
      console.log(error);
      setSumCount([]);
    }
    
  };
  useEffect(() => {
    fetchSumCount();
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 320 }}>
        <TableHead>
          <TableRow>
            <StyledTableCell sx={{ width: '70px' }}>{resources.table.title.One}</StyledTableCell>
            <StyledTableCell>{resources.table.title.Two}</StyledTableCell>
            <StyledTableCell>{resources.table.title.three}</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sumCount.map((row, i) => (
            <StyledTableRow key={row.documentName}>
              <StyledTableCell component="th" scope="row">
                {i+1}
              </StyledTableCell>
              <StyledTableCell>{row.documentName}</StyledTableCell>
              <StyledTableCell>{row.count}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
