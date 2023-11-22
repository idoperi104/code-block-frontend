import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavLink } from "react-router-dom"

export function CodeBlockPreview({ codeblock, onRemoveCodeblock }) {
  return (
    <li className="code-block-preview flex column">
      <NavLink className="info" to={`/codeblock/${codeblock._id}`}>
        <h3 className="title">{codeblock.title}</h3>
        <p className="question">{codeblock.question}</p>
      </NavLink>
      <div className="actions">
        <button
          className="btn"
          onClick={() => onRemoveCodeblock(codeblock._id)}
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
        <NavLink to={`/codeblock/edit/${codeblock._id}`}>
          <button className="btn">
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </NavLink>
      </div>
    </li>
  )
}
