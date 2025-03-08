import React, { useState, useEffect } from "react"
import passwordGen from "./passwordGen"
import rememberPsw from "./rememberPsw"
import PasswordStrength from "./PasswordStrength"


function App() {
  const [config, setConfig] = useState({ alphabetLower: true, alphabetUpper: true, numbers: true, symbols: true, length: 12 })

  const [password, setPassword] = useState('')

  const [copied, setCopied] = useState(false)

  const [theme, setTheme] = useState(true)

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
    navigator.clipboard.writeText(password).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  };

  const newPsw = () => generate()

  const updateProgress = (value) => {
    const percent = ((value - 1) / (20 - 1)) * 100;
    document.documentElement.style.setProperty("--progress-width", `${percent}%`);
  };

  const handleRange = (e) => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      length: e.target.value,
    }));
    updateProgress(value)
  }

  const handleNumber = (e) => {
    let value = Number(e.target.value);
  
    if (value === '') value = 1;
    if (value > 20) value = 20;
  
    setConfig((prevConfig) => ({
      ...prevConfig,
      length: value,
    }));
  };

  const handleThemeChange = () => {
      setTheme(!theme)
      if (theme) {
        return document.body.classList.add("dark-theme")
      }
      return document.body.classList.remove("dark-theme")
  }
  
  return (
    <>
      <div className={theme ? "container" : "container dark-theme"}>
        <div className={theme ? "password-display" : "password-display dark-theme"}>
          <input type="text" className={theme ? '' : "dark-theme"} value={password} readOnly />
          <button className={theme ? '' : "dark-theme"} onClick={copyToClipboard}><span className="material-icons">content_copy</span></button>
          <button className={theme ? '' : "dark-theme"} onClick={newPsw}><span className="material-icons">replay</span></button>
        </div>
        <PasswordStrength psw={password} />
        <div className="config-container">
          <p className={theme ? "config-title" : "config-title dark-theme"}>Config</p>
        <div className="config-row">
        <div className="length-container">
        <label>
          <p className="length-title">Password Length</p>
          <input onChange={handleNumber} type="number" min="1" max="20" step="1" value={config.length} /><input onChange={handleRange} type="range" min="1" max="20" step="1" value={config.length} style={{ "--progress-width": `${((config.length - 1) / (20 - 1)) * 100}%` }} />
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
        <label>
          <input type="checkbox" name="symbols" checked={theme} onChange={handleThemeChange} />{theme ? ' Light ' : ' Dark ' }
        </label>
        </div>
        </div>
        <div className="remember-psw">
            <p className={theme ? "remember-title" : "remember-title dark-theme"}>Remember your password</p>
            <p className="remember-result">{!password ? "Remember your password with the first character of each word in this sentence." : rememberPsw(password)}</p>
        </div>

        </div>
        <div className={`copy-notification ${copied ? "" : "hidden"}`}>Copied to clipboard!</div>
      </div>
    </>
  )
}

export default App
