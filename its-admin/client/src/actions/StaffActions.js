import { ref } from "../client";

export const GETTING_ALL_STAFF = "GETTING_ALL_STAFF";
export const STAFF_RETRIEVED = "STAFF_RETRIEVED";
export const GETTING_STAFF_ROLE = "GETTING_STAFF_ROLE";
export const STAFF_ROLE_RETRIEVED = "STAFF_ROLE_RETRIEVED";
export const STAFF_ROLE_NOT_IDENTIFIED = "STAFF_ROLE_NOT_IDENTIFIED";

export const getAllStaff = () => (dispatch, getState) => {
    dispatch({
        type: GETTING_ALL_STAFF
    });
    ref.child("staff").once("value").then(function(snapshot){
        dispatch({ 
            type: STAFF_RETRIEVED,
            payload: snapshot.val()
        });
    });
}

export const getStaffRole = (userID) => (dispatch, getState) => {
    dispatch({type: GETTING_STAFF_ROLE});

    ref.child("staff/" + userID + "/role").once("value").then(function(snapshot){
        console.log("ROLE", snapshot.val());
        dispatch({
            type: STAFF_ROLE_RETRIEVED,
            payload: {
                uid: userID,
                role: snapshot.val()
            }
        })
    }).catch(function(error){
        dispatch({ type: STAFF_ROLE_NOT_IDENTIFIED });
    });
}