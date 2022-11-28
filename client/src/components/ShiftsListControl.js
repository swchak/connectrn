import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
// import LinearIndeterminate from "./LinearIndeterminate";

const columns = [
  { id: "name", label: "Shift", minWidth: 100 },
  { id: "start", label: "Start Date", minWidth: 170 },
  {
    id: "end",
    label: "End Date",
    minWidth: 170,
  },
  {
    id: "qual_required",
    label: "Qualification Required",
    minWidth: 170,
  },
  {
    id: "nurse",
    label: "Nurse Assigned",
    minWidth: 170,
  },
];

export default function ShiftsListControl() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [tableData, setTableData] = React.useState([]);
 
const fetchWithRetries = (url, retries) => fetch(url).then(res => {
  if (res.ok) {
    return res.json();
  }

  if(retries > 0) {
    return fetchWithRetries(url, retries-1);
  }
  throw new Error(res.status)
}).catch(error => console.log(error))

  React.useEffect(() => {
    Promise.all([
      fetchWithRetries("http://localhost:9001/nurses", 4),
      fetchWithRetries("http://localhost:9001/shifts", 4),
    ]).then(([nurses, shifts]) => {
      setTableData(
        shifts.map((shift) => {
          const nurse =
            shift.nurse_id === null
              ? null
              : nurses.find((nurse) => nurse.id === shift.nurse_id);
          return {
            ...shift,
            nurse:
              nurse === null
                ? ""
                : `${nurse.first_name}  ${nurse.last_name} ${nurse.qualification}`,
          };
        })
      );
    });
  }, []);

  // React.useEffect(() => {
  //   const fetchNurses = async () => {
  //     const res = await fetch("http://localhost:9001/nurses");
  //     const data = await res.json();
  //     setNurseList(data);
  //     setLoading(false);
  //   };
  //   setLoading(true);
  //   fetchNurses();
  // }, [])
  // React.useEffect(()=> {
  //    const fetchShifts = async () => {
  //        const res = await fetch("http://localhost:9001/shifts")
  //        const data = await res.json();
  //       setShiftList(data);
  // }
  // fetchShifts();
  //   console.log(shiftList)
  //   setTableData(
  //     shiftList.map((shift) => {
  //       const nurse = nurseList.find((nurse) => nurse.id === shift.nurse_id);
  //       return {
  //         ...shift,
  //         "nurse": `${nurse.first_name}  ${nurse.last_name}`,
  //       };
  //     })
  //   );
  // }, []);

    // React.useEffect(() => {
    //   fetchNurses();
    // }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((shift) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={shift.id}>
                    {columns.map((column) => {
                      const value = shift[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={tableData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}