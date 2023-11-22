export const SET_CODEBLOCKS = "SET_CODEBLOCKS"
export const ADD_CODEBLOCK = "ADD_CODEBLOCK"
export const REMOVE_CODEBLOCK = "REMOVE_CODEBLOCK"
export const UPDATE_CODEBLOCK = "UPDATE_CODEBLOCK"
export const SET_FILTER_BY = "SET_FILTER_BY"
export const SET_USER_CODEBLOCKS = "SET_USER_CODEBLOCKS"
export const REMOVE_USER_CODEBLOCK = "REMOVE_USER_CODEBLOCK"

const INITIAL_STATE = {
  codeblocks: null,
  filterBy: {
    title: ""
  },
}

export function codeblockReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case SET_CODEBLOCKS:
      return {
        ...state,
        codeblocks: action.codeblocks,
      }
    case ADD_CODEBLOCK:
      return {
        ...state,
        codeblocks: [...state.codeblocks, action.codeblock],
      }
    case REMOVE_CODEBLOCK:
      return {
        ...state,
        codeblocks: state.codeblocks.filter(
          (codeblock) => codeblock._id !== action.codeblockId
        ),
      }
    case UPDATE_CODEBLOCK:
      return {
        ...state,
        codeblocks: state.codeblocks.map((codeblock) =>
          codeblock._id === action.codeblock._id ? action.codeblock : codeblock
        ),
      }
    case SET_FILTER_BY:
      return {
        ...state,
        filterBy: { ...action.filterBy },
      }

    default:
      return state
  }
}
