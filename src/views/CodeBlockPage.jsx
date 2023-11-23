import { useNavigate, useParams } from "react-router-dom"
import { codeblockService } from "../services/codeblock.service"
import { useCallback, useEffect, useState } from "react"
import CodeMirror, { EditorState, EditorView } from "@uiw/react-codemirror"
import { vscodeDark } from "@uiw/codemirror-theme-vscode"
import { javascript } from "@codemirror/lang-javascript"
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import noGif from "../assets/imgs/no.gif"
import yesGif from "../assets/imgs/yes.gif"
import { Loader } from "../cmps/Loader"
import {
  SOCKET_EMIT_SEND_CODE,
  SOCKET_EMIT_SET_TOPIC,
  SOCKET_EVENT_MENTOR_MODE,
  SOCKET_EVENT_UPDATE_CODE,
  socketService,
} from "../services/socket.service"

export function CodeBlockPage() {
  const [codeblock, setCodeblock] = useState(null)
  const [isDisplaySolution, setIsDisplaySolution] = useState(false)
  const [isDisplayYesGif, setIsDisplayYesGif] = useState(false)
  const [isDisplayNoGif, setIsDisplayNoGif] = useState(false)
  const [isMentor, setIsMentor] = useState(false)

  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    socketService.on(SOCKET_EVENT_UPDATE_CODE, onUpdateCode)
    socketService.on(SOCKET_EVENT_MENTOR_MODE, () => setIsMentor(true))
  }, [])

  useEffect(() => {
    loadCodeblock()
  }, [params.id])

  useEffect(() => {
    socketService.emit(SOCKET_EMIT_SET_TOPIC, codeblock?.title)

    return () => {
      socketService.emit(SOCKET_EMIT_SET_TOPIC, null)
    }
  }, [codeblock?.title])

  useEffect(() => {
    if (!codeblock) return
    checkSolutionAuto()
    socketService.emit(SOCKET_EMIT_SEND_CODE, {
      title: codeblock.title,
      code: codeblock.code,
    })
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

  async function onSaveCodeblock() {
    try {
      await codeblockService.save({ ...codeblock })
    } catch (error) {
      console.log("error:", error)
    }
  }

  function onUpdateCode(code) {
    setCodeblock((prevCodeblock) => ({ ...prevCodeblock, code }))
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

  function checkSolutionAuto() {
    if (codeblock.code.trim() === codeblock.solution.trim()) {
      showGif("yes")
    }
  }

  function onCheckSolution() {
    if (!codeblock) return
    if (codeblock.code.trim() === codeblock.solution.trim()) showGif("yes")
    else showGif("no")
  }

  function showGif(gifName) {
    switch (gifName) {
      case "yes":
        setIsDisplayYesGif(true)
        setTimeout(() => {
          setIsDisplayYesGif(false)
        }, 2000)
        break
      case "no":
        setIsDisplayNoGif(true)
        setTimeout(() => {
          setIsDisplayNoGif(false)
        }, 2000)
        break
      default:
        break
    }
  }

  if (!codeblock) return <Loader />
  return (
    <section className="code-block-page">
      <button className="btn-back" onClick={onBack}>
        <FontAwesomeIcon icon={faArrowLeftLong} />
      </button>

      <h2 className="title">{codeblock.title}</h2>
      
      {isMentor && <h3 className="title">(teacher Mode)</h3>}

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
        <div className="btn-container">
          <button className="btn-check" onClick={onCheckSolution}>
            check
          </button>
          <button className="btn-save" onClick={onSaveCodeblock}>
            save
          </button>
        </div>
      </div>

      {!isDisplaySolution ? (
        <CodeMirror
          className="code-mirror"
          height="100%"
          value={codeblock.code}
          extensions={[javascript({ jsx: true })]}
          readOnly={isMentor}
          editable={!isMentor}
          theme={vscodeDark}
          onChange={handleChange}
        />
      ) : (
        <CodeMirror
          className="code-mirror"
          height="100%"
          value={codeblock.solution}
          extensions={[javascript({ jsx: true })]}
          readOnly={true}
          editable={false}
          theme={vscodeDark}
        />
      )}

      {isDisplayYesGif && <img className="gif" src={yesGif} alt="" />}
      {isDisplayNoGif && <img className="gif" src={noGif} alt="" />}
    </section>
  )
}
