import React, { useState } from "react"

export default function Player({
  initialName,
  symbol,
  isActive,
  onChangeName,
}) {
  console.log(isActive)
  const [isEditing, setIsEditing] = useState(false)
  const [userName, setUserName] = useState(initialName)
  const handleEditClick = () => {
    // setIsEditing(!isEditing) <- this is okay but not necessarily best practice
    setIsEditing((editing) => !editing)
    if (isEditing) {
      onChangeName(symbol, userName)
    }
  }

  const changeUserName = (event) => {
    setUserName(event.target.value)
  }
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {isEditing ? (
          <input
            type="text"
            required
            value={userName}
            onChange={changeUserName}
          ></input>
        ) : (
          <span className="player-name">{userName}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  )
}
