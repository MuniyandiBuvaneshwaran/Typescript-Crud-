import * as types from './Type';

interface EmployeeAction {
  type: string;
  payload?: any;
}

export const actionTypes = {
  SET_FIELD: "SET_FIELD",
  SET_ERRORS: "SET_ERRORS",
  SET_IS_EDITING: "SET_IS_EDITING",
  SET_LOADING: "SET_LOADING",
};

// Addemployee
export function addEmployeeRequest(data: any): EmployeeAction {
  return {
    type: types.CREATE_REQUEST,
    payload: data
  };
}

export function addEmployeeSuccess(data: any): EmployeeAction {
  return {
    type: types.CREATE_SUCCESS,
    payload: data
  };
}

export function addEmployeeError(data: any): EmployeeAction {
  return {
    type: types.CREATE_ERROR,
    payload: data
  };
}

// getemployee
export function getEmployeeRequest(): EmployeeAction {
  return {
    type: types.GET_REQUEST,
  };
}

export function getEmployeeSuccess(data: any): EmployeeAction {
  return {
    type: types.GET_SUCCESS,
    payload: data
  };
}

export function getEmployeeError(data: any): EmployeeAction {
  return {
    type: types.GET_ERROR,
    payload: data
  };
}

// getidemmployee
export function getidEmployeeRequest(data: any): EmployeeAction {
  return {
    type: types.GETID_REQUEST,
    payload: data
  };
}

export function getidEmployeeSuccess(data: any): EmployeeAction {
  return {
    type: types.GETID_SUCCESS,
    payload: data
  };
}

export function getidEmployeeError(data: any): EmployeeAction {
  return {
    type: types.GETID_ERROR,
    payload: data
  };
}

// Updateemployee
export function updateEmployeeRequest(data: any): EmployeeAction {
  return {
    type: types.UPDATE_REQUEST,
    payload: data
  };
}

export function updateEmployeeSuccess(data: any): EmployeeAction {
  return {
    type: types.UPDATE_SUCCESS,
    payload: data
  };
}

export function updateEmployessError(data: any): EmployeeAction {
  return {
    type: types.UPDATE_ERROR,
    payload: data
  };
}

// Deleteemployee
export function deleteEmployeeRequest(data: any): EmployeeAction {
  return {
    type: types.DELETE_REQUEST,
    payload: data
  };
}

export function deleteEmployeeSuccess(data: any): EmployeeAction {
  return {
    type: types.DELETE_SUCCESS,
    payload: data
  };
}

export function deleteEmployeeError(data: any): EmployeeAction {
  return {
    type: types.DELETE_ERROR,
    payload: data
  };
}
