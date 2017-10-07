import { ref } from "../client";

export const GETTING_ALL_STAFF = "GETTING_ALL_STAFF";
export const STAFF_RETRIEVED = "STAFF_RETRIEVED";

export const GETTING_STAFF_PROFILE = "GETTING_STAFF_PROFILE";
export const STAFF_PROFILE_RETRIEVED = "STAFF_PROFILE_RETRIEVED";
export const STAFF_PROFILE_NOT_FOUND = "STAFF_PROFILE_NOT_FOUND";

export const UPDATING_STAFF_PROFILE = "UPDATING_STAFF_PROFILE";
export const STAFF_PROFILE_UPDATED = "STAFF_PROFILE_UPDATED";
export const PROFILE_UPDATE_FAILED = "PROFILE_UPDATE_FAILED";


// Get all staff members who manage tickets
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

// Get staff profile information
// This includes their fullname, email, role, role level and UID
export const getStaffProfile = (userID) => (dispatch, getState) => {
    dispatch({ type: GETTING_STAFF_PROFILE });

    ref.child("staff/" + userID).once("value").then(function(snapshot){
        console.log("PROFILE: ", snapshot.val());
        dispatch({
            type: STAFF_PROFILE_RETRIEVED,
            payload: snapshot.val()
        })
    }).catch(function(error){
        dispatch({
            type: STAFF_PROFILE_NOT_FOUND,
            payload: error.message
        })
    });
}


// Update staff profile
export const updateStaffProfile = (userID, profile = {}) => (dispatch, getState) => {
    dispatch({ type: UPDATING_STAFF_PROFILE });

    ref.child("staff/" + userID + "").update(profile, function(error){
        if (error) {
            dispatch({ type: PROFILE_UPDATE_FAILED })
        } else {
            dispatch({
                type: STAFF_PROFILE_UPDATED,
                payload: profile
            })
        }
    })
}
