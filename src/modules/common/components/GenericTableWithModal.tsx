import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Pagination, Typography, Checkbox } from "@mui/material";

interface GenericTableWithModalProps<T> {
  title: string;
  data: T[];
  columns: {
    header: string;
    render: (item: T) => React.ReactNode;
  }[];
  total: number;
  page: number;
  pageSize: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  filterComponent?: React.ReactNode;
  modal?: React.ReactNode;
  selectTable?: boolean;
  onSelectRow?: (item: T) => void;
  onSelectAll?: (items: T[]) => void;
  accion?: React.ReactNode;
  onSelect?: (items: T[]) => void;
  selected?: T[];
}

const GenericTableWithModal = <T,>(props: GenericTableWithModalProps<T>) => {
  const {
    title,
    data,
    columns,
    total,
    page,
    onPageChange,
    filterComponent,
    modal,
    selectTable = false,
    onSelectRow,
    onSelectAll,
    accion,
    onSelect,
    selected,
  } = props;

  const onPageChangeInternal = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    onPageChange(event, value);
    onSelect?.([]);
  };

  const handleSelectRow = (item: T) => {
    if (onSelectRow) onSelectRow(item);
    const index = selected?.indexOf(item);
    if (index === -1) {
      onSelect?.([...(selected || []), item]);
    } else {
      onSelect?.((selected || []).filter((i) => i !== item));
    }
  };

  const handleSelectAll = () => {
    if (onSelectAll) onSelectAll(data);
    onSelect?.(data);
  };

  const handleUnselectAll = () => {
    onSelect?.([]);
  };

  const handleToggleSelectAll = () => {
    if ((selected || []).length === data.length) {
      handleUnselectAll();
    } else {
      handleSelectAll();
    }
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>

      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        mt={2}
        position="sticky"
        bottom={0}
        pb={5}
        zIndex={1}
      >
        {modal}
      </Box>

      {filterComponent && (
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          mt={2}
          position="sticky"
          bottom={0}
          pb={5}
          gap={2}
          zIndex={1}
        >
          {filterComponent}
        </Box>
      )}

      {selected && selected.length > 0 && accion}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              {selectTable && (
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={
                      (selected || []).length > 0 &&
                      (selected || []).length < data.length
                    }
                    checked={(selected || []).length === data.length}
                    onChange={handleToggleSelectAll}
                  />
                </TableCell>
              )}

              {columns.map((column) => (
                <TableCell
                  key={column.header}
                  align="center"
                  sx={{ fontWeight: "bold" }}
                >
                  {column.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {selectTable && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={(selected || []).indexOf(item) !== -1}
                      onChange={() => handleSelectRow(item)}
                    />
                  </TableCell>
                )}
                {columns.map((column, index) => (
                  <TableCell key={index} align="center">
                    {column.render(item)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt={2}
        position="sticky"
        bottom={0}
        p={2}
        zIndex={1}
        borderTop="1px solid #e0e0e0"
        bgcolor={(theme) =>
          theme.palette.mode === "dark" ? "#333" : "#f5f5f5"
        }
      >
        <Pagination
          count={total}
          size="large"
          color="primary"
          page={page}
          onChange={onPageChangeInternal}
        />
      </Box>
    </>
  );
};

export default GenericTableWithModal;
