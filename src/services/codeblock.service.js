import { httpService } from "./http.service.js"

const STORAGE_KEY = "codeblock"

export const codeblockService = {
  query,
  getById,
  save,
  remove,
  getEmptyCodeblock,
  getEmptyFilterBy,
}

async function query(filterBy = { title: "" }) {
  return httpService.get(STORAGE_KEY, filterBy)
}

function getById(codeblockId) {
  return httpService.get(`${STORAGE_KEY}/${codeblockId}`)
}

async function remove(codeblockId) {
  return httpService.delete(`${STORAGE_KEY}/${codeblockId}`)
}

async function save(codeblock) {
  var savedCodeblock
  if (codeblock._id) {
    savedCodeblock = await httpService.put(
      `${STORAGE_KEY}/${codeblock._id}`,
      codeblock
    )
  } else {
    savedCodeblock = await httpService.post(STORAGE_KEY, codeblock)
  }
  return savedCodeblock
}

function getEmptyCodeblock() {
  return {
    title: "",
    question: "",
    code: "",
    solution: "",
  }
}

function getEmptyFilterBy() {
  return {
    title: "",
  }
}
