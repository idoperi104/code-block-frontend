import { useNavigate, useParams } from "react-router-dom"
import { useFormRegister } from "../customHooks/useFormRegister"
import { codeblockService } from "../services/codeblock.service.local"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import CodeMirror from "@uiw/react-codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { vscodeDark } from "@uiw/codemirror-theme-vscode"

export function CodeBlockEdit() {
  const [register, codeblock, handleChange, setCodeblock] = useFormRegister({
    ...codeblockService.getEmptyCodeblock(),
  })

  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    loadCodeblock()
  }, [])

  async function loadCodeblock() {
    const codeblockId = params.id
    if (codeblockId) {
      try {
        const codeblock = await codeblockService.getById(codeblockId)
        setCodeblock(codeblock)
      } catch (error) {
        console.log("error at CodeBlockPage:", error)
      }
    }
  }

  async function onSaveCodeblock(ev) {
    ev.preventDefault()
    try {
      await codeblockService.save({ ...codeblock })
      navigate("/codeblock")
    } catch (error) {
      console.log("error:", error)
    }
  }

  function handleCodeMirrorChange(field, val) {
    setCodeblock((prevCodeblock) => ({ ...prevCodeblock, [field]: val }))
  }

  return (
    <section className="code-block-edit">
      <form className="basic-form" onSubmit={onSaveCodeblock}>
        <label htmlFor="title">Title:</label>
        <input {...register("title", "text")} />
        <label htmlFor="question">Question:</label>
        <textarea {...register("question", "text")} ></textarea>
      </form>

      <p className="label">Code:</p>
      <CodeMirror
        className="code-mirror"
        height="100%"
        value={codeblock.code}
        extensions={[javascript({ jsx: true })]}
        theme={vscodeDark}
        onChange={(val) => handleCodeMirrorChange("code", val)}
      />

      <p className="label">Solution:</p>
      <CodeMirror
        className="code-mirror"
        height="100%"
        value={codeblock.solution}
        extensions={[javascript({ jsx: true })]}
        theme={vscodeDark}
        onChange={(val) => handleCodeMirrorChange("solution", val)}
      />

      <button className="btn-submit" onClick={onSaveCodeblock}>Save</button>

    </section>
  )
}
