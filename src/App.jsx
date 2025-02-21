import React, { useState, useEffect } from "react"
import passwordGen from "./passwordGen"

function App() {
  const [config, setConfig] = useState({ alphabetLower: true, alphabetUpper: true, numbers: true, symbols: true, length: 6})

  const [password, setPassword] = useState('')

  const generate = () => setPassword(passwordGen(config))

  useEffect(() => {
    generate()
  }, [config])

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setConfig((prevConfig) => ({
      ...prevConfig,
      [name]: checked,
    }));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
  };

  const newPsw = () => generate()

  const handleRange = (e) => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      length: e.target.value,
    }));
  }

  return (
    <>
      <div className="container">
        <div className="password">
        <input type="text" value={password} readOnly />
        <button onClick={copyToClipboard}>Copy</button>
        <button onClick={newPsw}>New</button>
        </div>
        <div className="checkbox-group">
        <label>
          <input type="checkbox" name="alphabetLower" checked={config.alphabetLower} onChange={handleCheckboxChange} />Uppercase
        </label>
        <label>
          <input type="checkbox" name="alphabetUpper" checked={config.alphabetUpper} onChange={handleCheckboxChange} />Lowercase
        </label>
        <label>
          <input type="checkbox" name="numbers" checked={config.numbers} onChange={handleCheckboxChange} />Numbers
        </label>
        <label>
          <input type="checkbox" name="symbols" checked={config.symbols} onChange={handleCheckboxChange} />Symbols
        </label>
        </div>
        <div className="length-container">
        <label>
          {config.length}<input onChange={handleRange} type="range" min="6" max="20" step="1" value={config.length} />Length
        </label>
        </div>
      </div>
    </>
  )
}

export default App
