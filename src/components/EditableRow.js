import React, { useState } from 'react';
import { TableCell, TableRow, TextField, Button } from '@mui/material';

const EditableRow = ({ row, onSave, onCancel, countries }) => {
  const [editData, setEditData] = useState(row);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <TableRow>
      <TableCell>
        <TextField name="iso_code" value={editData.iso_code} onChange={handleChange} variant="outlined" />
      </TableCell>
      <TableCell>
        <TextField name="year" value={editData.year} onChange={handleChange} variant="outlined" />
      </TableCell>
      <TableCell>
        <TextField name="mortality_rate_female" value={editData.mortality_rate_female} onChange={handleChange} variant="outlined" />
      </TableCell>
      <TableCell>
        <TextField name="mortality_rate_male" value={editData.mortality_rate_male} onChange={handleChange} variant="outlined" />
      </TableCell>
      <TableCell>
        <TextField name="total_female" value={editData.total_female} onChange={handleChange} variant="outlined" />
      </TableCell>
      <TableCell>
        <TextField name="total_male" value={editData.total_male} onChange={handleChange} variant="outlined" />
      </TableCell>
      <TableCell>
        <TextField name="total_population" value={editData.total_population} onChange={handleChange} variant="outlined" />
      </TableCell>
      <TableCell>
        <Button variant="outlined" onClick={() => onSave(editData)}>Confirm</Button>
        <Button variant="outlined" color="secondary" onClick={onCancel}>Cancel</Button>
      </TableCell>
    </TableRow>
  );
};

export default EditableRow;
