import * as types from "./Type";

export interface Employee {
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

export interface State {
  loading: boolean;
  error: null | string;
  messege?: string;
  employees: Employee[];
  employeeId: Employee | null;
  isLoading: boolean;
  searchText: string;
  selectedProducts: Employee[];
  deleteSelectedDialogVisible: boolean;
}
export interface Action {
    type: string;
    payload?: any;
    value?: any;

}

const reducer = (state: State, action: Action): State => {
  console.log(state);
  console.log(action);
  switch (action.type) {
    case types.CREATE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.CREATE_SUCCESS:
      return {
        ...state,
        employees: [...state.employees, (action as { type: string; payload: Employee }).payload],
        loading: false,
        error: null,
      };
    case types.CREATE_ERROR:
      return {
        ...state,
        messege: (action as { type: string; payload: string }).payload,
        loading: false,
        error: null,
      };
    case types.GET_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_SUCCESS:
      return { ...state, employees: (action as { type: string; payload: Employee[] }).payload, employeeId: null };
    case types.GET_ERROR:
      return {
        ...state,
        messege: (action as { type: string; payload: string }).payload,
        loading: false,
        error: null,
      };
    case types.GETID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        employeeId: null,
        isLoading: true,
      };
    case types.GETID_SUCCESS:
      return {
        ...state,
        employeeId: (action as { type: string; payload: Employee }).payload,
        loading: false,
        error: null,
      };
    case types.GETID_ERROR:
      return {
        ...state,
        messege: (action as { type: string; payload: string }).payload,
        loading: false,
        error: null,
      };
    case types.UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.UPDATE_SUCCESS:
      const updatedEmployees = state.employees.map((employee) =>
        employee.id === (action as { type: string; payload: Employee }).payload.id ? (action as { type: string; payload: Employee }).payload : employee
      );
      return { ...state, employees: updatedEmployees, employeeId: null };
    case types.UPDATE_ERROR:
      return {
        ...state,
        messege: (action as { type: string; payload: string }).payload,
        loading: false,
        error: null,
      };
    case types.DELETE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.DELETE_SUCCESS:
      const filteredEmployees = state.employees.filter(
        (employee) => employee.id !== (action as { type: string; payload: string }).payload
      );
      return { ...state, employees: filteredEmployees };
    case types.DELETE_ERROR:
      return {
        ...state,
        messege: (action as { type: string; payload: string }).payload,
        loading: false,
        error: null,
      };
    case "SET_LOADING":
      return { ...state, isLoading: (action as { type: string; value: boolean }).value };
    case "SET_SEARCH_TEXT":
      return { ...state, searchText: (action as { type: string; value: string }).value };
    case "SET_SELECTED_PRODUCTS":
      return { ...state, selectedProducts: (action as { type: string; value: Employee[] }).value };
    case "SET_DELETE_SELECTED_DIALOG_VISIBLE":
      return { ...state, deleteSelectedDialogVisible: (action as { type: string; payload: boolean }).payload };
    default:
      return state;
  }
};

export default reducer;
