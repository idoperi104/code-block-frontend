// import { storageService } from "./async-storage.service"
import { httpService } from './http.service'

import data from "../assets/json/user.json"
import { socketService } from "./socket.service"

const STORAGE_KEY = "user"
const STORAGE_KEY_LOGGEDIN_USER = "loggedinUser"

// --------------------------------------------------------------------
// This user service is both for local storage service and http service.
// --------------------------------------------------------------------

export const userService = {
  login,
  logout,
  signup,
  getLoggedinUser,
  getUsers,
  getById,
  remove,
  update,
  getEmptyLoginCred,
  getEmptySignupCred,
}


async function getUsers(filterBy = {}) {
  // let users = await storageService.query(STORAGE_KEY)

  // if (!users || users.length === 0) {
  //   localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  //   users = data
  // }

  // return users

  return await httpService.get(`user`, filterBy)
}

async function getById(userId) {
  // const user = await storageService.get("user", userId)
  const user = await httpService.get(`user/${userId}`)

  return user
}

function remove(userId) {
  // return storageService.remove("user", userId)
  return httpService.delete(`user/${userId}`)
}

async function update(user) {
  // const updatedUser = await getById(user._id)
  // user = await storageService.put("user", {...updatedUser, ...user})

  user = await httpService.put(`user/${user._id}`, user)

  return user
}

async function login(userCred) {
  // const users = await storageService.query("user")
  // const user = users.find(
  //   (user) =>
  //     user.username === userCred.username && user.password === userCred.password
  // )

  const user = await httpService.post('auth/login', userCred)

  if (user) {
    socketService.login(user._id)
    return _saveLocalUser(user)
  }
}

async function signup(userCred) {
  // const user = await storageService.post("user", userCred)

  const user = await httpService.post('auth/signup', userCred)

  socketService.login(user._id)

  return _saveLocalUser(user)
}

async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
  
  socketService.logout()
  return await httpService.post('auth/logout')
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function _saveLocalUser(user) {
  user = {
    _id: user._id,
    fullname: user.fullname,
    username: user.username,
    isAdmin: user.isAdmin,
  }
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
  return user
}

function getEmptyLoginCred() {
  return {
    username: "",
    password: "",
  }
}

function getEmptySignupCred() {
  return {
    fullname: "",
    username: "",
    password: "",
    isAdmin: false,
  }
}
