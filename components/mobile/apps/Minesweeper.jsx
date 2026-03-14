"use client";

import { useEffect, useRef, useState } from "react";

const BOARD_SIZE = 9;
const MINE_COUNT = 10;
const CELL = 34; // px — larger for touch targets
const LONG_PRESS_MS = 400;

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
    if (!next[r][c].isMine && !(r === safeR && c === safeC)) { next[r][c].isMine = true; placed++; }
  }
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      if (!next[r][c].isMine) {
        let count = 0;
        for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr; const nc = c + dc;
          if (nr >= 0 && nr < BOARD_SIZE && nc >= 0 && nc < BOARD_SIZE && next[nr][nc].isMine) count++;
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
      for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
        if (dr !== 0 || dc !== 0) stack.push([r + dr, c + dc]);
      }
    }
  }
  return next;
}

const seg = (n) => String(Math.min(999, Math.max(-99, n))).padStart(3, "0");

export default function MinesweeperMobile() {
  const [board, setBoard]         = useState(createEmptyBoard);
  const [gameState, setGameState] = useState("idle");
  const [minesLeft, setMinesLeft] = useState(MINE_COUNT);
  const [time, setTime]           = useState(0);
  const [faceDown, setFaceDown]   = useState(false);
  const timerRef                  = useRef(null);

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

  const revealCell = (r, c) => {
    if (gameState === "won" || gameState === "lost") return;
    const cell = board[r][c];
    if (cell.flagged || cell.revealed) return;
    let current = board;
    if (gameState === "idle") { current = placeMines(board, r, c); setGameState("playing"); }
    if (current[r][c].isMine) {
      const lost = current.map((row) => row.map((cl) => ({ ...cl, revealed: cl.isMine ? true : cl.revealed })));
      lost[r][c] = { ...lost[r][c], exploded: true };
      setBoard(lost); setGameState("lost"); return;
    }
    const next = floodReveal(current, r, c);
    setBoard(next);
    if (next.flat().filter((cl) => !cl.revealed && !cl.isMine).length === 0) {
      setGameState("won"); window.clearInterval(timerRef.current);
    }
  };

  const flagCell = (r, c) => {
    if (gameState === "won" || gameState === "lost") return;
    if (board[r][c].revealed) return;
    const next = board.map((row) => row.map((cl) => ({ ...cl })));
    next[r][c].flagged = !next[r][c].flagged;
    setBoard(next);
    setMinesLeft((prev) => next[r][c].flagged ? prev - 1 : prev + 1);
    if (gameState === "idle") setGameState("playing");
  };

  const face = gameState === "won" ? "B)" : gameState === "lost" ? ":(" : faceDown ? ":O" : ":)";
  const boardPx = BOARD_SIZE * CELL;

  return (
    <div style={{ padding: 8, display: "flex", flexDirection: "column", gap: 8, alignItems: "center", background: "#f4f4f0", minHeight: "100%" }}>
      <div style={{ fontSize: 10, color: "#555", fontFamily: '"MS Sans Serif", Tahoma, sans-serif', marginTop: 4 }}>
        Tap to reveal · Hold to flag
      </div>

      {/* Header */}
      <div style={{ borderTop: "2px solid #404040", borderLeft: "2px solid #404040", borderRight: "2px solid #fff", borderBottom: "2px solid #fff", padding: "4px 8px", display: "flex", alignItems: "center", justifyContent: "space-between", width: boardPx + 4, background: "#c0c0c0" }}>
        <div style={{ background: "#000", color: "#f00", fontFamily: "'Courier New', monospace", fontSize: 20, fontWeight: 700, padding: "2px 4px", minWidth: 44, textAlign: "right", letterSpacing: 2, lineHeight: 1 }}>
          {seg(minesLeft)}
        </div>
        <button
          onTouchStart={() => setFaceDown(true)}
          onTouchEnd={() => { setFaceDown(false); reset(); }}
          onClick={reset}
          style={{ borderTop: faceDown ? "2px solid #404040" : "2px solid #fff", borderLeft: faceDown ? "2px solid #404040" : "2px solid #fff", borderRight: faceDown ? "2px solid #fff" : "2px solid #404040", borderBottom: faceDown ? "2px solid #fff" : "2px solid #404040", background: "#c0c0c0", width: 36, height: 32, cursor: "pointer", fontSize: 12, fontWeight: 700, touchAction: "manipulation" }}
        >
          {face}
        </button>
        <div style={{ background: "#000", color: "#f00", fontFamily: "'Courier New', monospace", fontSize: 20, fontWeight: 700, padding: "2px 4px", minWidth: 44, textAlign: "right", letterSpacing: 2, lineHeight: 1 }}>
          {seg(time)}
        </div>
      </div>

      {/* Board */}
      <div style={{ borderTop: "2px solid #404040", borderLeft: "2px solid #404040", borderRight: "2px solid #fff", borderBottom: "2px solid #fff", display: "inline-block", lineHeight: 0, touchAction: "none" }}>
        {board.map((row, r) => (
          <div key={r} style={{ display: "flex" }}>
            {row.map((cell, c) => (
              <MobileCell
                key={c}
                cell={cell}
                gameState={gameState}
                onReveal={() => revealCell(r, c)}
                onFlag={() => flagCell(r, c)}
              />
            ))}
          </div>
        ))}
      </div>

      {(gameState === "won" || gameState === "lost") && (
        <button
          onClick={reset}
          style={{ padding: "8px 24px", fontFamily: '"MS Sans Serif", Tahoma, sans-serif', fontSize: 12, fontWeight: 700, background: "#c0c0c0", borderTop: "2px solid #fff", borderLeft: "2px solid #fff", borderRight: "2px solid #404040", borderBottom: "2px solid #404040", cursor: "pointer", touchAction: "manipulation" }}
        >
          {gameState === "won" ? "🎉 Play Again" : "💀 Try Again"}
        </button>
      )}
    </div>
  );
}

function MobileCell({ cell, gameState, onReveal, onFlag }) {
  const timerRef = useRef(null);
  const didLong = useRef(false);

  const onTouchStart = (e) => {
    e.preventDefault();
    didLong.current = false;
    timerRef.current = setTimeout(() => {
      didLong.current = true;
      if (navigator.vibrate) navigator.vibrate(30);
      onFlag();
    }, LONG_PRESS_MS);
  };

  const onTouchEnd = (e) => {
    e.preventDefault();
    clearTimeout(timerRef.current);
    if (!didLong.current) onReveal();
  };

  const onTouchMove = () => clearTimeout(timerRef.current);

  const revealed = cell.revealed;
  const isExploded = revealed && cell.isMine && cell.exploded;
  const isMineReveal = revealed && cell.isMine && !cell.exploded && gameState === "lost";

  const bg = revealed
    ? isExploded ? "#ff0000" : "#c0c0c0"
    : "#c0c0c0";

  const borderStyle = revealed
    ? { border: "1px solid #808080" }
    : { borderTop: "2px solid #ffffff", borderLeft: "2px solid #ffffff", borderRight: "2px solid #808080", borderBottom: "2px solid #808080" };

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
      onClick={() => { if (!navigator.maxTouchPoints) onReveal(); }}
      onContextMenu={(e) => { e.preventDefault(); onFlag(); }}
      style={{
        width: CELL,
        height: CELL,
        background: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 14,
        fontWeight: 700,
        userSelect: "none",
        touchAction: "none",
        cursor: "pointer",
        ...borderStyle,
      }}
    >
      {cell.flagged && !revealed && (
        <svg width="14" height="14" viewBox="0 0 12 12" shapeRendering="crispEdges">
          <rect x="4" y="1" width="1" height="10" fill="#555" />
          <rect x="5" y="10" width="4" height="2" fill="#555" />
          <rect x="5" y="1" width="5" height="5" fill="#ff0000" />
        </svg>
      )}
      {(isExploded || isMineReveal) && (
        <svg width="14" height="14" viewBox="0 0 12 12" shapeRendering="crispEdges">
          <circle cx="6" cy="6" r="3" fill="#000" />
          <rect x="5" y="1" width="2" height="10" fill="#000" />
          <rect x="1" y="5" width="10" height="2" fill="#000" />
          <rect x="2" y="2" width="2" height="2" fill="#fff" opacity="0.5" />
        </svg>
      )}
      {revealed && !cell.isMine && cell.adjacentMines > 0 && (
        <span style={{ color: NUM_COLORS[cell.adjacentMines] ?? "#000", fontSize: 14 }}>
          {cell.adjacentMines}
        </span>
      )}
    </div>
  );
}
