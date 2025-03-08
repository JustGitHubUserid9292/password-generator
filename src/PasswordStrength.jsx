import React from "react";

export default function PasswordStrength({ psw }) {
    const getStrength = (psw) => {
      let score = 0;
      if (psw.length >= 12) score += 1;
      if (psw.match(/[A-Z]/)) score += 1;
      if (psw.match(/[a-z]/)) score += 1;
      if (psw.match(/[0-9]/)) score += 1;
      if (psw.match(/[!@#$%^&*()_+=-]/)) score += 1;

      const percentage = (score / 5) * 100;
      let color = "red";
  
      if (percentage > 33) color = "orange";
      if (percentage > 66) color = "green";
  
      return { percentage, color };
    };
  
    const strength = getStrength(psw);
  
    return (
      <div className="strength-container">
        <div
          className="strength-bar"
          style={{ width: `${strength.percentage}%`, backgroundColor: strength.color }}
        ></div>
      </div>
    );
  };
  