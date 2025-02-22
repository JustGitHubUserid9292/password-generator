import React, { useState, useEffect } from "react"
import passwordGen from "./passwordGen"
import rememberPsw from "./rememberPsw"

function App() {
  const [config, setConfig] = useState({ alphabetLower: true, alphabetUpper: true, numbers: true, symbols: true, length: 12 })

  const [password, setPassword] = useState('')

  const [copied, setCopied] = useState(false)

  const generate = () => setPassword(passwordGen(config))

  useEffect(() => {
    generate()
  }, [config])

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    console.log(name, checked)
    setConfig((prevConfig) => ({
      ...prevConfig,
      [name]: checked,
    }));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  };

  const newPsw = () => generate()

  const handleRange = (e) => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      length: e.target.value,
    }));
  }

  const handleNumber = (e) => {
    let value = e.target.value;
  
    if (value === '') value = 1;
    if (value > 20) value = 20;
  
    setConfig((prevConfig) => ({
      ...prevConfig,
      length: value,
    }));
  };
  
  return (
    <>
      <div className="container">
        <div className="password-display">
          <input type="text" value={password} readOnly />
          <button onClick={copyToClipboard}><span className="material-icons">content_copy</span></button>
          <button onClick={newPsw}><span className="material-icons">replay</span></button>
        </div>
        <div className="config-container">
          <p className="config-title">Config</p>
        <div className="config-row">
        <div className="length-container">
        <label>
          <p className="length-title">Password Length</p>
          <input onChange={handleNumber} type="number" min="1" max="20" step="1" value={config.length} /><input onChange={handleRange} type="range" min="1" max="20" step="1" value={config.length} />
        </label>
        </div>
        <div className="checkbox-group">
        <label>
          <input type="checkbox" name="alphabetUpper" checked={config.alphabetUpper} onChange={handleCheckboxChange} />{" Uppercase "}
        </label>
        <label>
          <input type="checkbox" name="alphabetLower" checked={config.alphabetLower} onChange={handleCheckboxChange} />{" Lowercase "}
        </label>
        <label>
          <input type="checkbox" name="numbers" checked={config.numbers} onChange={handleCheckboxChange} />{" Numbers "}
        </label>
        <label>
          <input type="checkbox" name="symbols" checked={config.symbols} onChange={handleCheckboxChange} />{" Symbols "}
        </label>
        </div>
        </div>
        <div className="remember-psw">
            <p className="remember-title">Remember your password</p>
            <p className="remember-result">{!password ? "Remember your password with the first character of each word in this sentence." : rememberPsw(password)}</p>
        </div>

        </div>
        <div className={`copy-notification ${copied ? "" : "hidden"}`}>Copied to clipboard!</div>
      </div>
    </>
  )
}

export default App
