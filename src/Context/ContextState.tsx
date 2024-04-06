import React, {
    createContext,
    useReducer,
    useContext,
    ReactNode,
    useEffect,
  } from "react";
  import reducer, { State, Action } from "./Reducer";
  import {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getUser,
  } from "../Services/Api";
  import {
    addEmployeeRequest,
    addEmployeeSuccess,
    addEmployeeError,
    getEmployeeSuccess,
    getEmployeeRequest,
    getEmployeeError,
    deleteEmployeeError,
    deleteEmployeeRequest,
    deleteEmployeeSuccess,
    updateEmployeeRequest,
    updateEmployeeSuccess,
    updateEmployessError,
    getidEmployeeSuccess,
    getidEmployeeError,
    getidEmployeeRequest,
  } from "./Action";
  
  interface GlobalContextProps {
    stateEmp: State;
    dispatch: React.Dispatch<Action>;
    addEmployee: (employee: Employee) => Promise<void>;
    updateEmployees: (employee: Employee) => Promise<void>;
    removeEmployee: (id: string) => Promise<void>;
    getEmployee: () => Promise<void>;
    getidEmployee: (employee: Employee) => Promise<void>;
  }
  
  interface GlobalProviderProps {
    children: ReactNode;
  }
  
  interface Employee {
    id: string;
    name: string;
    email: string;
    phone: string;
    dob: string;
    password: string;
    cpass: string;
    language: string;
    gender: string;
  }
  
  const initialState: State = {
    loading: false,
    error: null,
    isLoading: false,
    searchText: "",
    deleteSelectedDialogVisible: false,
    employees: [],
    selectedProducts: [],
    employeeId: null,
    // Include initial values for other properties as needed
  };
  
  const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);
  
  export const useGlobalContext = (): GlobalContextProps => {
    const context = useContext(GlobalContext);
    if (!context) {
      throw new Error("useGlobalContext must be used within a GlobalProvider");
    }
    return context;
  };
  
  export const GlobalProvider = ({
    children,
  }: GlobalProviderProps): JSX.Element => {
    const [stateEmp, dispatch] = useReducer(reducer, initialState);
  
    const getEmployee = async (): Promise<void> => {
      dispatch(getEmployeeRequest());
      try {
        const res = await getUsers();
        if (res.status === 200 || res.status === 201) {
          dispatch(getEmployeeSuccess(res.data));
        } else {
          dispatch(getEmployeeError("Employee creation failed."));
        }
      } catch (error) {
        console.error("Error fetching initial employee data:", error);
      }
    };
  
    //   const getidEmployee = async (employee: Employee): Promise<void> => {
    //     dispatch(getidEmployeeRequest());
    //     try {
    //       const res = await getUser(employee);
    //       if (res.status === 200 || res.status === 201) {
    //         dispatch(getidEmployeeSuccess(res.data));
    //       } else {
    //         dispatch(getidEmployeeError("Employee creation failed."));
    //       }
    //     } catch (error) {
    //       console.error("Error fetching initial employee data:", error);
    //     }
    //   };
  
    const getidEmployee = async (employee: Employee): Promise<void> => {
      dispatch(getidEmployeeRequest(employee));
      try {
        const res = await getUser(employee.id); // Assuming employee has an 'id' property
        if (res.status === 200 || res.status === 201) {
          dispatch(getidEmployeeSuccess(res.data));
        } else {
          dispatch(getidEmployeeError("Employee creation failed."));
        }
      } catch (error) {
        console.error("Error fetching initial employee data:", error);
      }
    };
  
    const addEmployee = async (employee: Employee): Promise<void> => {
      dispatch(addEmployeeRequest(employee));
      try {
        const res = await createUser(employee);
        if (res.status === 200 || res.status === 201 || res.status === 204) {
          dispatch(addEmployeeSuccess(employee));
        } else {
          dispatch(addEmployeeError("Employee creation failed."));
        }
      } catch (error) {
        console.error("Error creating employee:", error);
      }
    };
  
    const updateEmployees = async (employee: Employee): Promise<void> => {
      dispatch(updateEmployeeRequest(employee));
      try {
        const res = await updateUser(employee.id, employee);
        if (res.status === 200) {
          dispatch(updateEmployeeSuccess(employee));
        } else {
          dispatch(updateEmployessError("Employee update failed."));
        }
      } catch (error) {
        console.error("Error updating employee:", error);
      }
    };
  
    const removeEmployee = async (id: string): Promise<void> => {
      dispatch(deleteEmployeeRequest(id));
      try {
        const res = await deleteUser(id);
        if (res.status === 200) {
          dispatch(deleteEmployeeSuccess(id));
        } else {
          dispatch(deleteEmployeeError("Employee creation failed."));
        }
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    };
  
    useEffect(() => {
      getEmployee();
    }, []);
  
    return (
      <GlobalContext.Provider
        value={{
          stateEmp,
          dispatch,
          addEmployee,
          updateEmployees,
          removeEmployee,
          getEmployee,
          getidEmployee,
        }}
      >
        {children}
      </GlobalContext.Provider>
    );
  };
  