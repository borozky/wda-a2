export const GET_ALL_STAFF = "GET_ALL_STAFF";
export const getAllStaff = () => (dispatch, getState) => {
    const staff = {
        data: []
    }

    dispatch({ 
        type: GET_ALL_STAFF,
        payload: staff
    });
}