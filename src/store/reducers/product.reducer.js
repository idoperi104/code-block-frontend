export const SET_PRODUCTS = "SET_PRODUCTS"
export const ADD_PRODUCT = "ADD_PRODUCT"
export const REMOVE_PRODUCT = "REMOVE_PRODUCT"
export const UPDATE_PRODUCT = "UPDATE_PRODUCT"
export const SET_FILTER_BY = "SET_FILTER_BY"
export const SET_USER_PRODUCTS = "SET_USER_PRODUCTS"
export const REMOVE_USER_PRODUCT = "REMOVE_USER_PRODUCT"

const INITIAL_STATE = {
  products: null,
  userProducts: null,
  filterBy: {
    name: "",
    category: "",
    stock: "",
    sortBy: "",
    amount: 0,
  },
}

export function productReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.products,
      }
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.product],
      }
    case REMOVE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== action.productId
        ),
      }
    case UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map((product) =>
          product._id === action.product._id ? action.product : product
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
