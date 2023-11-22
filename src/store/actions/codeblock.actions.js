import { codeblockService } from "../../services/codeblock.service.local"
import {
  REMOVE_CODEBLOCK,
  SET_CODEBLOCKS,
  SET_FILTER_BY,
  UPDATE_CODEBLOCK,
} from "../reducers/codeblock.reducer"

export function loadCodeblocks() {
  return async (dispatch, getState) => {
    try {
      const codeblocks = await codeblockService.query(getState().codeblockModule.filterBy)
      const action = {
        type: SET_CODEBLOCKS,
        codeblocks,
      }
      dispatch(action)
    } catch (error) {
      console.log("error:", error)
    }
  }
}

export function removeCodeblock(codeblockId) {
  return async (dispatch) => {
    try {
      await codeblockService.remove(codeblockId)
      const action = { type: REMOVE_CODEBLOCK, codeblockId }
      dispatch(action)
      return "Removed!"
    } catch (error) {
      console.log("error:", error)
    }
  }
}

export function updateCodeblockKeyVal(codeblock, key, val) {
  return async (dispatch) => {
    try {
      codeblock = await codeblockService.save({ ...codeblock, [key]: val })
      const action = { type: UPDATE_CODEBLOCK, codeblock }
      dispatch(action)
      return "Updated!"
    } catch (error) {
      console.log("error:", error)
    }
  }
}

// Filter by:
export function setFilterBy(filterBy) {
  return (dispatch) => {
    dispatch({ type: SET_FILTER_BY, filterBy })
    dispatch(loadCodeblocks())
  }
}
