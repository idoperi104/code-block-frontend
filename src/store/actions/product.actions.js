import { productService } from "../../services/product.service"
import {
  REMOVE_PRODUCT,
  SET_PRODUCTS,
  SET_FILTER_BY,
  UPDATE_PRODUCT,
} from "../reducers/product.reducer"

export function loadProducts() {
  return async (dispatch, getState) => {
    try {
      const products = await productService.query(getState().productModule.filterBy)
      const action = {
        type: SET_PRODUCTS,
        products,
      }
      dispatch(action)
    } catch (error) {
      console.log("error:", error)
    }
  }
}

export function removeProduct(productId) {
  return async (dispatch) => {
    try {
      await productService.remove(productId)
      const action = { type: REMOVE_PRODUCT, productId }
      dispatch(action)
      return "Removed!"
    } catch (error) {
      console.log("error:", error)
    }
  }
}

export function updateProductKeyVal(product, key, val) {
  return async (dispatch) => {
    try {
      product = await productService.save({ ...product, [key]: val })
      const action = { type: UPDATE_PRODUCT, product }
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
    dispatch(loadProducts())
  }
}
