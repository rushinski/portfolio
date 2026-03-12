"use client";

import { useEffect, useRef } from "react";

const MYSTIFY_COLORS = ["#00ffff", "#ff00ff", "#ffff00"];
const PIPE_COLORS = ["#00c0ff", "#00ff80", "#ff8c00", "#ff00c8"];
const PIPE_DIRECTIONS = [
  { dx: 1, dy: 0 },
  { dx: 0, dy: 1 },
  { dx: -1, dy: 0 },
  { dx: 0, dy: -1 },
];

function drawLogoAt(ctx, x, y, label, scale = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.fillStyle = "#000080";
  ctx.fillRect(-58, -20, 116, 40);
  ctx.strokeStyle = "#ffffff";
  ctx.strokeRect(-58.5, -20.5, 117, 41);
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 16px MS Sans Serif, Tahoma, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, 0, 1);
  ctx.restore();
}

function createMystifyLine(width, height, color) {
  return {
    color,
    points: Array.from({ length: 4 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() * 1.2 + 0.4) * (Math.random() < 0.5 ? -1 : 1),
      vy: (Math.random() * 1.2 + 0.4) * (Math.random() < 0.5 ? -1 : 1),
    })),
  };
}

function createPipeState(width, height) {
  const cell = Math.max(18, Math.floor(Math.min(width, height) / 12));
  const cols = Math.max(4, Math.floor(width / cell));
  const rows = Math.max(4, Math.floor(height / cell));
  const x = Math.floor(Math.random() * cols);
  const y = Math.floor(Math.random() * rows);

  return {
    cell,
    cols,
    rows,
    cursor: {
      x,
      y,
      dir: Math.floor(Math.random() * PIPE_DIRECTIONS.length),
      color: PIPE_COLORS[Math.floor(Math.random() * PIPE_COLORS.length)],
    },
    segments: [],
  };
}

function pickPipeDirection(cursor, cols, rows) {
  const reverseDir = (cursor.dir + 2) % PIPE_DIRECTIONS.length;
  const options = PIPE_DIRECTIONS
    .map((direction, index) => ({ ...direction, index }))
    .filter(({ dx, dy, index }) => {
      if (index === reverseDir) {
        return false;
      }

      const nextX = cursor.x + dx;
      const nextY = cursor.y + dy;
      return nextX >= 0 && nextX < cols && nextY >= 0 && nextY < rows;
    });

  if (options.length === 0) {
    return cursor.dir;
  }

  const currentStillValid = options.some((option) => option.index === cursor.dir);
  if (currentStillValid && Math.random() > 0.28) {
    return cursor.dir;
  }

  return options[Math.floor(Math.random() * options.length)].index;
}

export default function ScreensaverCanvas({ type = "none", label = "JacobOS", style = {} }) {
  const hostRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) {
      return undefined;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return undefined;
    }

    let frameId = 0;
    let width = 1;
    let height = 1;
    let mystifyLines = [];
    let logoState = { x: 24, y: 24, vx: 1.6, vy: 1.35 };
    let pipeState = createPipeState(width, height);
    let lastPipeStep = 0;

    const initScene = () => {
      if (type === "mystify") {
        mystifyLines = MYSTIFY_COLORS.map((color) => createMystifyLine(width, height, color));
      }

      if (type === "bouncing-logo") {
        logoState = {
          x: Math.max(72, width / 3),
          y: Math.max(32, height / 3),
          vx: 1.55,
          vy: 1.3,
        };
      }

      if (type === "pipes") {
        pipeState = createPipeState(width, height);
        lastPipeStep = 0;
      }

      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);
    };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initScene();
    };

    const renderMystify = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.14)";
      ctx.fillRect(0, 0, width, height);

      mystifyLines.forEach((line) => {
        line.points.forEach((point) => {
          point.x += point.vx;
          point.y += point.vy;

          if (point.x <= 0 || point.x >= width) {
            point.vx *= -1;
            point.x = Math.max(0, Math.min(width, point.x));
          }

          if (point.y <= 0 || point.y >= height) {
            point.vy *= -1;
            point.y = Math.max(0, Math.min(height, point.y));
          }
        });

        ctx.beginPath();
        ctx.moveTo(line.points[0].x, line.points[0].y);
        line.points.slice(1).forEach((point) => ctx.lineTo(point.x, point.y));
        ctx.closePath();
        ctx.strokeStyle = line.color;
        ctx.lineWidth = 1.4;
        ctx.stroke();
      });
    };

    const renderBouncingLogo = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#008080";
      ctx.fillRect(0, 0, width, height);

      logoState.x += logoState.vx;
      logoState.y += logoState.vy;

      if (logoState.x <= 60 || logoState.x >= width - 60) {
        logoState.vx *= -1;
      }

      if (logoState.y <= 22 || logoState.y >= height - 22) {
        logoState.vy *= -1;
      }

      drawLogoAt(ctx, logoState.x, logoState.y, label, 1);
    };

    const renderPipes = (timestamp) => {
      if (timestamp - lastPipeStep > 90) {
        const nextDir = pickPipeDirection(pipeState.cursor, pipeState.cols, pipeState.rows);
        const direction = PIPE_DIRECTIONS[nextDir];
        const nextX = pipeState.cursor.x + direction.dx;
        const nextY = pipeState.cursor.y + direction.dy;
        const nextColor = Math.random() > 0.86
          ? PIPE_COLORS[Math.floor(Math.random() * PIPE_COLORS.length)]
          : pipeState.cursor.color;

        pipeState.segments.push({
          x1: pipeState.cursor.x,
          y1: pipeState.cursor.y,
          x2: nextX,
          y2: nextY,
          color: nextColor,
        });

        if (pipeState.segments.length > 70) {
          pipeState.segments.shift();
        }

        pipeState.cursor = {
          x: nextX,
          y: nextY,
          dir: nextDir,
          color: nextColor,
        };

        lastPipeStep = timestamp;
      }

      const { cell } = pipeState;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = "rgba(0, 160, 160, 0.15)";
      ctx.lineWidth = 1;
      for (let x = 0; x <= width; x += cell) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y <= height; y += cell) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      pipeState.segments.forEach((segment) => {
        const startX = segment.x1 * cell + cell / 2;
        const startY = segment.y1 * cell + cell / 2;
        const endX = segment.x2 * cell + cell / 2;
        const endY = segment.y2 * cell + cell / 2;

        ctx.strokeStyle = segment.color;
        ctx.lineWidth = Math.max(6, cell * 0.38);
        ctx.lineCap = "square";
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        ctx.fillStyle = segment.color;
        ctx.fillRect(endX - cell * 0.18, endY - cell * 0.18, cell * 0.36, cell * 0.36);
      });

      const headX = pipeState.cursor.x * cell + cell / 2;
      const headY = pipeState.cursor.y * cell + cell / 2;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(headX - cell * 0.14, headY - cell * 0.14, cell * 0.28, cell * 0.28);
    };

    const render = (timestamp) => {
      if (type === "mystify") {
        renderMystify();
      } else if (type === "bouncing-logo") {
        renderBouncingLogo();
      } else if (type === "pipes") {
        renderPipes(timestamp);
      } else {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = "#a0a0a0";
        ctx.font = "12px Courier New, monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("No screensaver selected", width / 2, height / 2);
      }

      frameId = window.requestAnimationFrame(render);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    frameId = window.requestAnimationFrame(render);

    return () => {
      resizeObserver.disconnect();
      window.cancelAnimationFrame(frameId);
    };
  }, [label, type]);

  return (
    <div ref={hostRef} style={{ position: "relative", width: "100%", height: "100%", background: "#000000", ...style }}>
      <canvas ref={canvasRef} />
    </div>
  );
}
