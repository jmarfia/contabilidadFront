import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import { useTheme } from "@material-ui/core/styles";
import { FormControl, MenuItem, InputLabel, Select } from "@material-ui/core";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";
// agregar radar chart para proveedores
// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const Report = (props) => {
  const [month, setMonth] = useState("All");
  const [year, setYear] = useState("All");
  const movements = props.movimientos;
  let suma = 0;

  const yearHandleChange = (event) => {
    setYear(event.target.value);
    setData();
  };
  const monthHandleChange = (event) => {
    setMonth(event.target.value);
    setData();
  };

  function getDate(date) {
    const parsedDate = new Date(date);
    return parsedDate.toDateString();
  }
  function sgetMonth(date) {
    const parsedDate = new Date(date);
    return parsedDate.getMonth();
  }
  function sgetYear(date) {
    const parsedDate = new Date(date);
    return parsedDate.getFullYear();
  }
  let parsedMovements = [];

  function setData(year, month) {
    for (let index = 0; index < movements.length; index++) {
      let selectedYear = sgetYear(movements[index].createdAt);
      let selectedMonth = sgetMonth(movements[index].createdAt);
      if (year === "All") {
        selectedYear = "All";
        selectedMonth = "All";
      }
      if (month === "All") {
        selectedMonth = "All";
      }
      console.log(selectedYear, selectedMonth, year, month, "laksdjflakjsdf");
      if (selectedYear === year) {
        if (selectedMonth === month) {
          if (movements[index].type === true) {
            parsedMovements.push(
              createData(
                getDate(movements[index].createdAt),
                movements[index].amount
              )
            );
            suma += movements[index].amount;
          } else {
            parsedMovements.push(
              createData(
                getDate(movements[index].createdAt),
                -movements[index].amount
              )
            );
            suma -= movements[index].amount;
          }
        }
      }
    }
  }
  setData(year, month);
  const theme = useTheme();

  return (
    <Box display="flex" flexWrap="nowrap">
      <Box p={1} flexGrow={1}>
        <ResponsiveContainer width={"90%"} height={300}>
          <LineChart data={parsedMovements}>
            <XAxis dataKey="time" stroke={"#8884d8"} />
            <YAxis stroke={"#8884d8"}>
              <Label
                angle={270}
                position="left"
                style={{
                  textAnchor: "middle",
                  fill: "#82ca9d",
                }}
              >
                Movimientos ($)
              </Label>
            </YAxis>
            <Line
              type="monotone"
              dataKey="amount"
              stroke={theme.palette.primary.main}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
      <Box p={1}>
        <div id="formContent">
          <form>
            <div className="row mt-3">
              <div className="col-xs-6 col-sm-6 col-md-6">
                <div className="form-group">
                  <FormControl>
                    <InputLabel id="year">Year</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="yearSelect"
                      value={year}
                      onChange={yearHandleChange}
                    >
                      <MenuItem value={"All"}>All</MenuItem>
                      <MenuItem value={2019}>2019</MenuItem>
                      <MenuItem value={2020}>2020</MenuItem>
                      <MenuItem value={2021}>2021</MenuItem>
                      <MenuItem value={2022}>2022</MenuItem>
                      <MenuItem value={2023}>2023</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6">
                <div className="form-group">
                  <FormControl>
                    <InputLabel id="month">Month</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="monthSelect"
                      value={month}
                      onChange={monthHandleChange}
                    >
                      <MenuItem value={"All"}>All</MenuItem>
                      <MenuItem value={0}>Jan</MenuItem>
                      <MenuItem value={1}>Feb</MenuItem>
                      <MenuItem value={2}>March</MenuItem>
                      <MenuItem value={3}>April</MenuItem>
                      <MenuItem value={4}>May</MenuItem>
                      <MenuItem value={5}>Jun</MenuItem>
                      <MenuItem value={6}>Jul</MenuItem>
                      <MenuItem value={7}>Aug</MenuItem>
                      <MenuItem value={8}>Sep</MenuItem>
                      <MenuItem value={9}>Oct</MenuItem>
                      <MenuItem value={10}>Nov</MenuItem>
                      <MenuItem value={11}>Dec</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
          </form>
        </div>
        <h1> Suma de todo: ${suma} </h1>
      </Box>
    </Box>
  );
};
export default Report;
