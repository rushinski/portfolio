"use client";

import { useEffect, useRef, useState } from "react";

import { APP_BODY_STYLE, APP_CONTENT_STYLE } from "../ui/retro";

const BOARD_SIZE = 9;
const MINE_COUNT = 10;
const CELL_SIZE = 24;

const NUM_COLORS = {
  1: "#0000ff", 2: "#008000", 3: "#ff0000", 4: "#000080",
  5: "#800000", 6: "#008080", 7: "#000000", 8: "#808080",
};

function createEmptyBoard() {
  return Array.from({ length: BOARD_SIZE }, () =>
    Array.from({ length: BOARD_SIZE }, () => ({
      isMine: false, revealed: false, flagged: false, adjacentMines: 0, exploded: false,
    })));
}

function placeMines(board, safeR, safeC) {
  const next = board.map((row) => row.map((cell) => ({ ...cell })));
  let placed = 0;
  while (placed < MINE_COUNT) {
    const r = Math.floor(Math.random() * BOARD_SIZE);
    const c = Math.floor(Math.random() * BOARD_SIZE);
    if (!next[r][c].isMine && !(r === safeR && c === safeC)) {
      next[r][c].isMine = true;
      placed++;
    }
  }
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      if (!next[r][c].isMine) {
        let count = 0;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = r + dr; const nc = c + dc;
            if (nr >= 0 && nr < BOARD_SIZE && nc >= 0 && nc < BOARD_SIZE && next[nr][nc].isMine) count++;
          }
        }
        next[r][c].adjacentMines = count;
      }
    }
  }
  return next;
}

function floodReveal(board, startR, startC) {
  const next = board.map((row) => row.map((cell) => ({ ...cell })));
  const stack = [[startR, startC]];
  while (stack.length > 0) {
    const [r, c] = stack.pop();
    if (r < 0 || r >= BOARD_SIZE || c < 0 || c >= BOARD_SIZE) continue;
    if (next[r][c].revealed || next[r][c].flagged || next[r][c].isMine) continue;
    next[r][c].revealed = true;
    if (next[r][c].adjacentMines === 0) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr !== 0 || dc !== 0) stack.push([r + dr, c + dc]);
        }
      }
    }
  }
  return next;
}

function sevenSeg(n) {
  return String(Math.min(999, Math.max(-99, n))).padStart(3, "0");
}

function MineIcon({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" shapeRendering="crispEdges">
      <circle cx="6" cy="6" r="3" fill="#000" />
      <rect x="5" y="1" width="2" height="10" fill="#000" />
      <rect x="1" y="5" width="10" height="2" fill="#000" />
      <rect x="2" y="2" width="2" height="2" fill="#fff" opacity="0.5" />
    </svg>
  );
}

function FlagIcon({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" shapeRendering="crispEdges">
      <rect x="4" y="1" width="1" height="10" fill="#555" />
      <rect x="5" y="10" width="4" height="2" fill="#555" />
      <rect x="5" y="1" width="5" height="5" fill="#ff0000" />
    </svg>
  );
}

export default function MinesweeperApp() {
  const [board, setBoard] = useState(createEmptyBoard);
  const [gameState, setGameState] = useState("idle");
  const [minesLeft, setMinesLeft] = useState(MINE_COUNT);
  const [time, setTime] = useState(0);
  const [faceDown, setFaceDown] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (gameState === "playing") {
      timerRef.current = window.setInterval(() => setTime((t) => Math.min(t + 1, 999)), 1000);
    } else {
      window.clearInterval(timerRef.current);
    }
    return () => window.clearInterval(timerRef.current);
  }, [gameState]);

  const reset = () => {
    setBoard(createEmptyBoard());
    setGameState("idle");
    setMinesLeft(MINE_COUNT);
    setTime(0);
    setFaceDown(false);
  };

  const handleClick = (r, c) => {
    if (gameState === "won" || gameState === "lost") return;
    const cell = board[r][c];
    if (cell.flagged || cell.revealed) return;

    let current = board;
    if (gameState === "idle") {
      current = placeMines(board, r, c);
      setGameState("playing");
    }

    if (current[r][c].isMine) {
      const lost = current.map((row) => row.map((cell) => ({ ...cell, revealed: cell.isMine ? true : cell.revealed })));
      lost[r][c] = { ...lost[r][c], exploded: true };
      setBoard(lost);
      setGameState("lost");
      return;
    }

    const next = floodReveal(current, r, c);
    setBoard(next);

    const hidden = next.flat().filter((cell) => !cell.revealed && !cell.isMine);
    if (hidden.length === 0) {
      setGameState("won");
      window.clearInterval(timerRef.current);
    }
  };

  const handleRightClick = (e, r, c) => {
    e.preventDefault();
    if (gameState === "won" || gameState === "lost") return;
    if (board[r][c].revealed) return;
    const next = board.map((row) => row.map((cell) => ({ ...cell })));
    next[r][c].flagged = !next[r][c].flagged;
    setBoard(next);
    setMinesLeft((prev) => next[r][c].flagged ? prev - 1 : prev + 1);
    if (gameState === "idle") setGameState("playing");
  };

  const face = gameState === "won" ? "B)" : gameState === "lost" ? ":(" : faceDown ? ":O" : ":)";

  return (
    <div style={APP_BODY_STYLE}>
      <div style={{ ...APP_CONTENT_STYLE, display: "flex", flexDirection: "column", gap: 6, alignItems: "center", justifyContent: "center" }}>
      {/* Header */}
      <div style={{ borderTop: "2px solid #404040", borderLeft: "2px solid #404040", borderRight: "2px solid #fff", borderBottom: "2px solid #fff", padding: "4px 8px", display: "flex", alignItems: "center", justifyContent: "space-between", width: BOARD_SIZE * CELL_SIZE + 4, background: "#c0c0c0" }}>
        <div style={{ background: "#000", color: "#f00", fontFamily: "'Courier New', monospace", fontSize: 22, fontWeight: 700, padding: "2px 4px", minWidth: 50, textAlign: "right", letterSpacing: 2, lineHeight: 1 }}>
          {sevenSeg(minesLeft)}
        </div>
        <button
          onMouseDown={() => setFaceDown(true)}
          onMouseUp={() => { setFaceDown(false); reset(); }}
          onMouseLeave={() => setFaceDown(false)}
          style={{ borderTop: faceDown ? "2px solid #404040" : "2px solid #fff", borderLeft: faceDown ? "2px solid #404040" : "2px solid #fff", borderRight: faceDown ? "2px solid #fff" : "2px solid #404040", borderBottom: faceDown ? "2px solid #fff" : "2px solid #404040", background: "#c0c0c0", width: 32, height: 28, cursor: "pointer", fontSize: 12, fontFamily: "inherit", fontWeight: 700, lineHeight: 1 }}
        >
          {face}
        </button>
        <div style={{ background: "#000", color: "#f00", fontFamily: "'Courier New', monospace", fontSize: 22, fontWeight: 700, padding: "2px 4px", minWidth: 50, textAlign: "right", letterSpacing: 2, lineHeight: 1 }}>
          {sevenSeg(time)}
        </div>
      </div>

      {/* Board */}
      <div style={{ borderTop: "2px solid #404040", borderLeft: "2px solid #404040", borderRight: "2px solid #fff", borderBottom: "2px solid #fff", display: "inline-block", lineHeight: 0 }}>
        {board.map((row, r) => (
          <div key={r} style={{ display: "flex" }}>
            {row.map((cell, c) => {
              const revealed = cell.revealed;
              const isExploded = revealed && cell.isMine && cell.exploded;
              const isMineReveal = revealed && cell.isMine && !cell.exploded && gameState === "lost";
              return (
                <div
                  key={c}
                  onClick={() => handleClick(r, c)}
                  onContextMenu={(e) => handleRightClick(e, r, c)}
                  style={{
                    width: CELL_SIZE,
                    height: CELL_SIZE,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    fontWeight: 700,
                    fontFamily: "inherit",
                    cursor: "default",
                    userSelect: "none",
                    boxSizing: "border-box",
                    background: isExploded ? "#ff0000" : revealed ? "#c0c0c0" : "#c0c0c0",
                    borderTop: revealed ? "1px solid #808080" : "2px solid #fff",
                    borderLeft: revealed ? "1px solid #808080" : "2px solid #fff",
                    borderRight: revealed ? "1px solid #808080" : "2px solid #404040",
                    borderBottom: revealed ? "1px solid #808080" : "2px solid #404040",
                    color: NUM_COLORS[cell.adjacentMines] || "transparent",
                  }}
                >
                  {(isExploded || isMineReveal) ? <MineIcon size={14} /> : revealed && cell.adjacentMines > 0 ? cell.adjacentMines : !revealed && cell.flagged ? <FlagIcon size={13} /> : null}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Status */}
      <div style={{ fontSize: 11, color: gameState === "won" ? "#000080" : gameState === "lost" ? "#800000" : "#555", fontWeight: gameState !== "idle" && gameState !== "playing" ? 700 : 400, minHeight: 16 }}>
        {gameState === "won" && "You cleared the board! Click the face to play again."}
        {gameState === "lost" && "Game over. Click the face to try again."}
        {gameState === "idle" && "Click a cell to start. Right-click to flag mines."}
        {gameState === "playing" && `${minesLeft} mines remaining`}
      </div>
      </div>
    </div>
  );
}
