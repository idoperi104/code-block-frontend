import { storageService } from "./async-storage.service.js"
import data from "../assets/json/codeblock.json"

const STORAGE_KEY = "codeblock"

export const codeblockService = {
  query,
  getById,
  save,
  remove,
  getEmptyCodeblock,
  getEmptyFilterBy,
}
window.rs = codeblockService

async function query(filterBy = { title: "" }) {
  var codeblocks = await storageService.query(STORAGE_KEY)
  if (!codeblocks || codeblocks.length === 0) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    codeblocks = data
  }

  if (filterBy.title) {
    const regex = new RegExp(filterBy.title, "i")
    codeblocks = codeblocks.filter((codeblock) => regex.test(codeblock.title))
  }

  codeblocks = codeblocks.sort((a, b) => {
    const titleA = a.title.toUpperCase()
    const titleB = b.title.toUpperCase()
    if (titleA < titleB) return -1
    if (titleA > titleB) return 1
    return 0
  })

  return codeblocks
}

function getById(codeblockId) {
  return storageService.get(STORAGE_KEY, codeblockId)
}

async function remove(codeblockId) {
  await storageService.remove(STORAGE_KEY, codeblockId)
}

async function save(codeblock) {
  var savedCodeblock
  if (codeblock._id) {
    savedCodeblock = await storageService.put(STORAGE_KEY, codeblock)
  } else {
    savedCodeblock = await storageService.post(STORAGE_KEY, codeblock)
  }
  return savedCodeblock
}

function getEmptyCodeblock() {
  return {
    title: "",
    question:"",
    code: "",
    solution: "",
  }
}

function getEmptyFilterBy() {
  return {
    title: "",
  }
}
