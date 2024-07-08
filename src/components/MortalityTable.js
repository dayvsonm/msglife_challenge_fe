import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Select, MenuItem, FormControl, InputLabel, Container, Grid, Box,
} from '@mui/material';
import EditableRow from './EditableRow';
import { getMortalityTable, getCountries } from '../services/api';

const MortalityTable = () => {
  const [year, setYear] = useState('');
  const [data, setData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [editId, setEditId] = useState(null);


  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = 1900; year <= currentYear; year++) {
      years.push(year);
    }
    return years;
  };

  const years = generateYears();

  useEffect(() => {
    fetchMortalityData();
    fetchCountries();
  }, []);

  const fetchMortalityData = async () => {
    try {
      const response = await getMortalityTable(selectedCountry, year);
      if (Array.isArray(response.data)) {
        const dataWithUniqueIds = response.data.map((item) => ({
          ...item,
          uniqueId: `${item.id}-${item.year}`,
        }));
        setData(dataWithUniqueIds);
      } else {
        const item = response.data;
        const dataWithUniqueId = {
          ...item,
          uniqueId: `${item.id}-${item.year}`,
        };
        setData([dataWithUniqueId]);
      }
    } catch (error) {
      console.error('Error fetching mortality data:', error);
    }
  };

  const handleFetchDataClick = () => {
    if (selectedCountry && year) { 
      fetchMortalityData();
    } else {
      console.warn('Por favor, selecione um ano e um país antes de buscar dados.');
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await getCountries();
      setCountries(response.data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const handleEdit = (id) => {
    setEditId(id);
  };

  const handleSave = (updatedRow) => {
    const updatedData = data.map((row) => (row.uniqueId === updatedRow.uniqueId ? updatedRow : row));
    setData(updatedData);
    setEditId(null);
  };

  const handleCancel = () => {
    setEditId(null);
  };

  const handleYearChange = (e) => {
    const newYear = e.target.value;
    setYear(newYear);
  };

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
  };

  const filteredData = data.filter((row) =>
    (selectedCountry ? row.iso_code === selectedCountry : true) &&
    row.year === parseInt(year)
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Mortality Table
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Box my={4}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Year</InputLabel>
                <Select value={year} onChange={handleYearChange} label="Year">
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>{year}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Country</InputLabel>
                <Select value={selectedCountry} onChange={handleCountryChange} label="Country">
                  {countries.map((country) => (
                    <MenuItem key={country.code} value={country.code}>
                      {country.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleFetchDataClick}>
                Buscar Dados
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Paper elevation={3}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ISO Code</TableCell>
                  <TableCell>Year</TableCell>
                  <TableCell>Mortality Rate Female</TableCell>
                  <TableCell>Mortality Rate Male</TableCell>
                  <TableCell>Total Female</TableCell>
                  <TableCell>Total Male</TableCell>
                  <TableCell>Total Population</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((row) =>
                  editId === row.uniqueId ? (
                    <EditableRow
                      key={row.uniqueId}
                      row={row}
                      onSave={handleSave}
                      onCancel={handleCancel}
                      countries={countries}
                    />
                  ) : (
                    <TableRow key={row.uniqueId}>
                      <TableCell>{row.iso_code}</TableCell>
                      <TableCell>{row.year}</TableCell>
                      <TableCell>{row.mortality_rate_female}</TableCell>
                      <TableCell>{row.mortality_rate_male}</TableCell>
                      <TableCell>{row.total_female}</TableCell>
                      <TableCell>{row.total_male}</TableCell>
                      <TableCell>{row.total_population}</TableCell>
                      <TableCell>
                        <Button variant="outlined" onClick={() => handleEdit(row.uniqueId)}>Edit</Button>
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </>
  );
};

export default MortalityTable;
