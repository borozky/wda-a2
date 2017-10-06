import {Actions} from "../helpers/Constants";
import * as CommentActions from "../actions/CommentActions";

const initialState = {
    data: [],
    loading: false
}

export default function comments(state = initialState, action){
    switch (action.type) {
        case CommentActions.ADDING_COMMENT:
            return {
                ...state,
                loading: true
            };
        case CommentActions.COMMENT_ADDED:
            return {
                ...state,
                data: state.data.concat(action.payload),
                loading: false
            }
        case CommentActions.GETTING_ALL_COMMENTS:
            return {
                ...state,
                loading: true
            };
        case CommentActions.COMMENTS_RETRIEVED:
            return {
                ...state,
                data: action.payload,
                loading: false
            }
        case CommentActions.GETTING_TICKET_COMMENTS:
            return {
                ...state,
                loading: true
            };
        case CommentActions.TICKET_COMMENTS_RETRIEVED:
            return {
                ...state,
                loading: false,
                // combine all existing and addded comments
                // then remove the duplicates
                data: state.data.concat(action.payload).filter((comment, index, self) => {
                    var uniqCommentIDs = self.map(i => i.id).filter((i, idx, s) => (s.indexOf(i) == idx));
                    return uniqCommentIDs.indexOf(comment.id) == index;
                })
            };
        default:
            return state
    }
}