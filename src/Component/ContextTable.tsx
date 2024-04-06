import React, { useRef, useState, useEffect } from "react";
import { useGlobalContext } from "../Context/ContextState";
import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
// import { Backdrop, CircularProgress } from "@mui/material";
import * as jsPDF from "jspdf";
import "jspdf-autotable";
import { Action } from "redux";

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  cpass: string;
  language: string;
  gender: string;
  dob: string;
}

const EmployeeList: React.FC = () => {
  const navigate = useNavigate();
  const dt = useRef<any>(null);
  const { stateEmp, removeEmployee, dispatch, getEmployee } =
    useGlobalContext();
  const [selectedProducts, setSelectedProducts] = useState<Employee[]>([]);
  const [rowClick] = useState(true);
  const [open, setOpen] = useState(true);
  const [state, setState] = useState<{
    deleteDialogVisible: boolean;
    deleteSelectedDialogVisible: boolean;
    deleteTarget: Employee | null;
  }>({
    deleteDialogVisible: false,
    deleteSelectedDialogVisible: false,
    deleteTarget: null,
  });
  const [globalSearchText, setGlobalSearchText] = useState("");

  const getdata = async () => {
    await getEmployee();
    setOpen(stateEmp.loading);
  };

  useEffect(() => {
    getdata();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditClick = (id: string) => {
    navigate(`/ContextForm/${id}`);
  };
  interface SetSearchTextAction extends Action {
    type: "SET_SEARCH_TEXT";
    stateEmp: string;
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const action: SetSearchTextAction = {
      type: "SET_SEARCH_TEXT",
      stateEmp: e.target.value,
    };

    dispatch(action);
    setGlobalSearchText(e.target.value);
  };

  const filteredData = stateEmp.employees.filter((row: Employee) =>
    [
      "name",
      "email",
      "phone",
      "password",
      "cpass",
      "language",
      "dob",
      "gender",
    ].some((field) =>
      (row as any)[field]
        ?.toLowerCase()
        .includes(globalSearchText.toLowerCase())
    )
  );

  const clearFilters = () => {
    dt.current.reset();
    setGlobalSearchText("");
    dt.current.filter("", "name", "equals");
    dt.current.filter("", "email", "equals");
    dt.current.filter("", "phone", "equals");
  };

  const confirmDelete = () => {
    if (state.deleteTarget) {
      const employeeId = state.deleteTarget.id;
      removeEmployee(employeeId);
      setState({ ...state, deleteDialogVisible: false });
      setSelectedProducts([]);
    }
    toast.success(" User Deleted Successfully !!!", {
      position: "top-right",
    });
  };

  const confirmDeleteSelected = () => {
    setState({ ...state, deleteSelectedDialogVisible: true });
  };

  const deleteSelectedUsers = async () => {
    try {
      const selectedEmployeeIds = selectedProducts.map(
        (employee) => employee.id
      );

      await Promise.all(
        selectedEmployeeIds.map(async (employeeId) => {
          await removeEmployee(employeeId);
        })
      );

      // After successful deletion, clear selected products
      setSelectedProducts([]);

      toast.success("Selected Users Deleted Successfully !!!", {
        position: "top-right",
      });
    } catch (error: any) {
      // Explicitly specify the type of error as Error
      toast.error((error as Error).message, {
        position: "top-right",
      });
    } finally {
      setState({ ...state, deleteSelectedDialogVisible: false });
    }
  };

  const exportPdf = () => {
    const doc = new jsPDF.default();
    (doc as any).autoTable({
      head: [
        [
          "Name",
          "E-mail",
          "Phone",
          "Password",
          "Confirm Password",
          "Language",
          "Gender",
          "Date of Birth",
        ],
      ],
      body: stateEmp.employees.map((row: Employee) => [
        row.name,
        row.email,
        row.phone,
        row.password,
        row.cpass,
        row.language,
        row.gender,
        row.dob,
      ]),
    });

    doc.save("Student Details.pdf");
  };
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(stateEmp.employees);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "User Data");
    XLSX.writeFile(workbook, "UserDetails.xlsx");
  };

  const header = (
    <div className="d-md-flex justify-content-between gap-2">
      <div>
        <h3>User Details</h3>
      </div>
      <div className="d-md-flex">
        <div className="my-auto">
          <Button
            onClick={clearFilters}
            className="pi pi-filter-slash p-button-outlined me-3 p-2"
          >
            <span className="ms-2">Clear</span>
          </Button>
        </div>
        <div className="me-2">
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              value={globalSearchText}
              onChange={handleSearch}
              placeholder="Keyword Search"
            />
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="text-center col-10 mx-auto  mt-5">
      <div className="d-md-flex border shadow justify-content-between p-3 my-3">
        <div className="d-flex justify-content-center">
          <div>
            <Link to="/form">
              <Button className="p-button p-button-success  me-2">
                <span>Add User</span>
              </Button>
            </Link>
          </div>
          <div>
            <Button
              onClick={confirmDeleteSelected}
              className="p-button p-button-danger"
              disabled={!selectedProducts || selectedProducts.length === 0}
            >
              <FaTrashAlt className="me-2" />
              <span>Delete </span>
            </Button>
          </div>
        </div>

        <div className="d-flex justify-content-center mt-2 mt-md-0">
          <Button
            label=""
            type="button"
            className="mx-1 export-buttons"
            icon="pi pi-file-pdf "
            rounded
            severity="warning"
            onClick={() => exportPdf()}
            data-pr-tooltip="Export to PDF"
          />
          <Button
            label=""
            type="button"
            className="mx-1 export-buttons"
            icon="pi pi-file-excel"
            rounded
            onClick={exportExcel}
            data-pr-tooltip="Export to Excel"
          />
        </div>
      </div>
      <Tooltip target=".export-buttons>button" position="bottom" />

      <div className="datatable">
        <DataTable
          ref={dt}
          value={filteredData}
          paginator
          header={header}
          rows={5}
          className="card shadow mb-5"
          rowsPerPageOptions={[5, 10, 25, 50]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          columnResizeMode="expand"
          resizableColumns
          showGridlines
          selectionMode={rowClick ? null : "checkbox"}
          selection={selectedProducts}
          onSelectionChange={(e: { value: Employee[] }) =>
            setSelectedProducts(e.value)
          }
          dataKey="id"
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
          ></Column>
          <Column
            field="name"
            header="Name"
            sortable
            filter
            filterPlaceholder="Search by name"
            style={{ width: "25%" }}
          />
          <Column
            field="email"
            header="Email"
            sortable
            filter
            filterPlaceholder="Search by email"
            style={{ width: "25%" }}
          />
          <Column
            field="phone"
            header="Phone"
            sortable
            filter
            filterPlaceholder="Search by phone"
            style={{ width: "25%" }}
          />
          <Column
            field="password"
            header="Password"
            sortable
            filter
            filterPlaceholder="Search by password"
            style={{ width: "25%" }}
          />
          <Column
            field="cpass"
            header="Confirm Password"
            sortable
            filter
            filterPlaceholder="Search by cpass"
            style={{ width: "25%" }}
          />
          <Column
            field="dob"
            header="Date of Birth"
            sortable
            filter
            filterPlaceholder="Search by dob"
            style={{ width: "25%" }}
          />
          <Column
            field="language"
            header="Language"
            sortable
            filter
            filterPlaceholder="Search by language"
            style={{ width: "25%" }}
          />
          <Column
            field="gender"
            header="Gender"
            sortable
            filter
            filterPlaceholder="Search by gender"
            style={{ width: "25%" }}
          />
          <Column
            body={(rowData: Employee) => (
              <>
                <div key={rowData.id}></div>
                <Link to={`/ContextForm/${rowData.id}`}>
                  <Button
                    onClick={() => handleEditClick(rowData.id)}
                    icon={<FaPencilAlt />}
                    className="p-button p-button-primary mx-2"
                  />
                </Link>
                <Button
                  onClick={() =>
                    setState({
                      ...state,
                      deleteDialogVisible: true,
                      deleteTarget: rowData,
                    })
                  }
                  icon={<FaTrashAlt />}
                  className="p-button p-button-danger"
                />
              </>
            )}
            header="Actions"
          />
        </DataTable>
        {/* <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop> */}
      </div>

      <Dialog
        visible={state.deleteDialogVisible}
        onHide={() =>
          setState({ ...state, deleteDialogVisible: false, deleteTarget: null })
        }
        header="Confirm Deletion"
        footer={
          <div>
            <Button
              label="No"
              icon="pi pi-times"
              className="p-button-text"
              onClick={() =>
                setState({
                  ...state,
                  deleteDialogVisible: false,
                  deleteTarget: null,
                })
              }
            />
            <Button
              label="Yes"
              icon="pi pi-check"
              className="p-button-danger"
              onClick={confirmDelete}
            />
          </div>
        }
      >
        {state.deleteTarget && (
          <p>
            Are you sure you want to delete the user{" "}
            <strong>{state.deleteTarget.name}</strong>?
          </p>
        )}
      </Dialog>

      <Dialog
        visible={state.deleteSelectedDialogVisible}
        onHide={() =>
          setState({ ...state, deleteSelectedDialogVisible: false })
        }
        header="Confirm Deletion"
        footer={
          <div>
            <Button
              label="No"
              icon="pi pi-times"
              className="p-button-text"
              onClick={() =>
                setState({ ...state, deleteSelectedDialogVisible: false })
              }
            />
            <Button
              label="Yes"
              icon="pi pi-check"
              className="p-button-danger"
              onClick={deleteSelectedUsers}
            />
          </div>
        }
      >
        <p>Are you sure you want to delete the selected users?</p>
      </Dialog>
    </div>
  );
};

export default EmployeeList;
