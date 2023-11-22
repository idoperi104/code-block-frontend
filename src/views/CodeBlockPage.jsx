import { useNavigate, useParams } from "react-router-dom"
import { codeblockService } from "../services/codeblock.service.local"
import { useCallback, useEffect, useState } from "react"
import CodeMirror from "@uiw/react-codemirror"
import { vscodeDark } from "@uiw/codemirror-theme-vscode"
import { javascript } from "@codemirror/lang-javascript"
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export function CodeBlockPage() {
  const [codeblock, setCodeblock] = useState(null)
  const [isDisplaySolution, setIsDisplaySolution] = useState(false)

  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadCodeblock()
  }, [params.id])

  useEffect(() => {
    checkSolution()
  }, [codeblock?.code])

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

  async function onSaveProduct() {
    try {
      await codeblockService.save({ ...codeblock })
    } catch (error) {
      console.log("error:", error)
    }
  }

  function onBack() {
    navigate(-1)
  }

  const handleChange = useCallback((val) => {
    setCodeblock((prevCodeblock) => ({ ...prevCodeblock, code: val }))
  })

  function getBtnActiveClass(isSolution) {
    return isSolution === isDisplaySolution ? "active" : ""
  }

  function checkSolution() {
    if (!codeblock) return
    if (codeblock.code.trim() === codeblock.solution.trim()) {
      console.log("well Done!");
    }
  }

  if (!codeblock) return <div>Loading...</div>
  return (
    <section className="code-block-page main-layout">
      <button className="btn-back" onClick={onBack}>
        <FontAwesomeIcon icon={faArrowLeftLong} />
      </button>

      <h2 className="title">{codeblock.title}</h2>

      <p className="question">
        <span>Question:</span> {codeblock.question}
      </p>

      <div className="actions-container flex space-between">
        <div className="display-container">
          <button
            className={`btn-display ${getBtnActiveClass(false)}`}
            onClick={() => setIsDisplaySolution(false)}
          >
            code
          </button>
          <button
            className={`btn-display ${getBtnActiveClass(true)}`}
            onClick={() => setIsDisplaySolution(true)}
          >
            solution
          </button>
        </div>
        <button className="btn-save" onClick={onSaveProduct}>
          save
        </button>
      </div>

      {!isDisplaySolution ? (
        <CodeMirror
          className="code-mirror"
          height="100%"
          value={codeblock.code}
          extensions={[javascript({ jsx: true })]}
          theme={vscodeDark}
          onChange={handleChange}
        />
      ) : (
        <CodeMirror
          className="code-mirror"
          height="100%"
          value={codeblock.solution}
          extensions={[javascript({ jsx: true })]}
          theme={vscodeDark}
          readOnly={true}
        />
      )}
    </section>
  )
}
