"use client";

import { useCallback, useState } from "react";

const BUTTONS = [
  [{ label: "Back", type: "fn" }, { label: "CE", type: "fn" }, { label: "C", type: "fn" }, { label: "±", type: "fn" }],
  [{ label: "7", type: "num" }, { label: "8", type: "num" }, { label: "9", type: "num" }, { label: "÷", type: "op" }],
  [{ label: "4", type: "num" }, { label: "5", type: "num" }, { label: "6", type: "num" }, { label: "×", type: "op" }],
  [{ label: "1", type: "num" }, { label: "2", type: "num" }, { label: "3", type: "num" }, { label: "-", type: "op" }],
  [{ label: "0", type: "num" }, { label: ".", type: "num" }, { label: "=", type: "eq" }, { label: "+", type: "op" }],
];

function calculate(a, b, op) {
  switch (op) {
    case "+": return a + b;
    case "-": return a - b;
    case "×": return a * b;
    case "÷": return b !== 0 ? a / b : 0;
    default: return b;
  }
}

function formatResult(n) {
  if (!isFinite(n)) return "Error";
  const s = parseFloat(n.toPrecision(12));
  return String(s);
}

function getButtonStyle(type, pressed) {
  const base = {
    width: "100%",
    height: 34,
    fontSize: 13,
    fontFamily: "inherit",
    cursor: "pointer",
    borderTop: pressed ? "2px solid #404040" : "2px solid #fff",
    borderLeft: pressed ? "2px solid #404040" : "2px solid #fff",
    borderRight: pressed ? "2px solid #fff" : "2px solid #404040",
    borderBottom: pressed ? "2px solid #fff" : "2px solid #404040",
    userSelect: "none",
  };
  if (type === "op") return { ...base, background: "#d4d0c8", color: "#800000", fontWeight: 700 };
  if (type === "eq") return { ...base, background: "#d4d0c8", color: "#000080", fontWeight: 700 };
  if (type === "fn") return { ...base, background: "#c8c8c4", color: "#333", fontSize: 11 };
  return { ...base, background: "#d4d0c8", color: "#000" };
}

export default function CalculatorApp() {
  const [display, setDisplay] = useState("0");
  const [operand1, setOperand1] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waiting, setWaiting] = useState(false);
  const [memory, setMemory] = useState(0);
  const [pressedKey, setPressedKey] = useState(null);

  const pressKey = (label) => {
    setPressedKey(label);
    setTimeout(() => setPressedKey(null), 100);
  };

  const handleNumber = useCallback((digit) => {
    if (waiting) {
      setDisplay(digit === "." ? "0." : digit);
      setWaiting(false);
    } else if (digit === ".") {
      if (!display.includes(".")) setDisplay((prev) => prev + ".");
    } else {
      setDisplay((prev) => (prev === "0" ? digit : prev.length >= 16 ? prev : prev + digit));
    }
  }, [display, waiting]);

  const handleOperator = useCallback((op) => {
    const current = parseFloat(display);
    if (operand1 !== null && !waiting) {
      const result = calculate(operand1, current, operator);
      const resultStr = formatResult(result);
      setDisplay(resultStr);
      setOperand1(parseFloat(resultStr));
    } else {
      setOperand1(current);
    }
    setOperator(op);
    setWaiting(true);
  }, [display, operand1, operator, waiting]);

  const handleEquals = useCallback(() => {
    if (operand1 === null || operator === null) return;
    const result = calculate(operand1, parseFloat(display), operator);
    setDisplay(formatResult(result));
    setOperand1(null);
    setOperator(null);
    setWaiting(true);
  }, [display, operand1, operator]);

  const handleButton = (label, type) => {
    pressKey(label);
    if (type === "num") { handleNumber(label); return; }
    if (type === "op") { handleOperator(label); return; }
    if (type === "eq") { handleEquals(); return; }
    if (label === "C") { setDisplay("0"); setOperand1(null); setOperator(null); setWaiting(false); return; }
    if (label === "CE") { setDisplay("0"); return; }
    if (label === "Back") { setDisplay((prev) => (prev.length > 1 && prev !== "-0" ? prev.slice(0, -1) : "0")); return; }
    if (label === "±") { setDisplay((prev) => (prev === "0" ? "0" : prev.startsWith("-") ? prev.slice(1) : "-" + prev)); return; }
  };

  const memoryDisplay = memory !== 0 ? "M" : "";

  return (
    <div style={{ padding: 10, display: "flex", flexDirection: "column", gap: 6, background: "#c0c0c0", height: "100%", boxSizing: "border-box" }}>
      {/* Memory indicator + display */}
      <div style={{ display: "flex", alignItems: "stretch", gap: 4 }}>
        <div style={{ width: 14, fontSize: 10, color: "#555", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {memoryDisplay}
        </div>
        <div style={{ flex: 1, borderTop: "2px solid #404040", borderLeft: "2px solid #404040", borderRight: "2px solid #fff", borderBottom: "2px solid #fff", background: "#f0f0e8", padding: "4px 8px", textAlign: "right", fontFamily: "'Courier New', monospace", fontSize: 22, minHeight: 40, display: "flex", alignItems: "center", justifyContent: "flex-end", overflow: "hidden" }}>
          <span style={{ maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{display}</span>
        </div>
      </div>

      {/* Memory row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4 }}>
        {[["MC", "MR", "MS", "M+"]].flat().map((label) => (
          <button
            key={label}
            onClick={() => {
              pressKey(label);
              if (label === "MC") { setMemory(0); }
              else if (label === "MR") { setDisplay(String(memory)); setWaiting(false); }
              else if (label === "MS") { setMemory(parseFloat(display)); }
              else if (label === "M+") { setMemory((prev) => prev + parseFloat(display)); }
            }}
            style={getButtonStyle("fn", pressedKey === label)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Main button grid */}
      {BUTTONS.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4 }}>
          {row.map(({ label, type }) => (
            <button
              key={label}
              onClick={() => handleButton(label, type)}
              style={getButtonStyle(type, pressedKey === label)}
            >
              {label}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
