"use client";

import { useEffect, useRef } from "react";

const MATRIX_CHARS = "01JACOBOS<>[]{}/*+-".split("");

function drawCenteredLabel(ctx, width, height, label, scale = 1) {
  ctx.save();
  ctx.translate(width / 2, height / 2);
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
    let stars = [];
    let logoState = { x: 24, y: 24, vx: 1.6, vy: 1.35 };
    let matrixColumns = [];

    const initScene = () => {
      if (type === "starfield") {
        stars = Array.from({ length: 80 }, () => ({
          x: (Math.random() - 0.5) * width,
          y: (Math.random() - 0.5) * height,
          z: Math.random() * width,
        }));
      }

      if (type === "bouncing-logo") {
        logoState = {
          x: Math.max(20, width / 3),
          y: Math.max(18, height / 3),
          vx: 1.6,
          vy: 1.35,
        };
      }

      if (type === "matrix-rain") {
        const columnCount = Math.max(8, Math.floor(width / 14));
        matrixColumns = Array.from({ length: columnCount }, () => ({
          y: Math.random() * -height,
          speed: 4 + Math.random() * 4,
          charOffset: Math.floor(Math.random() * MATRIX_CHARS.length),
        }));
      }
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

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (type === "starfield") {
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, width, height);
        stars.forEach((star) => {
          star.z -= 6;
          if (star.z <= 0.5) {
            star.x = (Math.random() - 0.5) * width;
            star.y = (Math.random() - 0.5) * height;
            star.z = width;
          }
          const projectedX = (star.x / star.z) * width + width / 2;
          const projectedY = (star.y / star.z) * width + height / 2;
          const radius = Math.max(0.6, (1 - star.z / width) * 2.2);
          ctx.fillStyle = `rgba(255,255,255,${Math.min(1, radius / 1.8)})`;
          ctx.beginPath();
          ctx.arc(projectedX, projectedY, radius, 0, Math.PI * 2);
          ctx.fill();
        });
      } else if (type === "bouncing-logo") {
        ctx.fillStyle = "#008080";
        ctx.fillRect(0, 0, width, height);

        logoState.x += logoState.vx;
        logoState.y += logoState.vy;
        if (logoState.x <= 58 || logoState.x >= width - 58) {
          logoState.vx *= -1;
        }
        if (logoState.y <= 20 || logoState.y >= height - 20) {
          logoState.vy *= -1;
        }

        drawCenteredLabel(ctx, logoState.x * 2, logoState.y * 2, label, 1);
      } else if (type === "matrix-rain") {
        ctx.fillStyle = "rgba(0, 0, 0, 0.22)";
        ctx.fillRect(0, 0, width, height);
        ctx.font = "12px Courier New, monospace";
        ctx.textBaseline = "top";
        matrixColumns.forEach((column, index) => {
          const x = index * 14;
          for (let step = 0; step < 16; step += 1) {
            const y = column.y - step * 14;
            if (y < -14 || y > height + 14) continue;
            const alpha = step === 0 ? 1 : Math.max(0.1, 1 - step / 16);
            ctx.fillStyle = step === 0 ? "#d6ffd6" : `rgba(41,255,41,${alpha})`;
            const char = MATRIX_CHARS[(column.charOffset + step) % MATRIX_CHARS.length];
            ctx.fillText(char, x, y);
          }
          column.y += column.speed;
          if (column.y > height + 220) {
            column.y = Math.random() * -height;
            column.speed = 4 + Math.random() * 4;
            column.charOffset = Math.floor(Math.random() * MATRIX_CHARS.length);
          }
        });
      } else {
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = "#29ff29";
        ctx.font = "12px Courier New, monospace";
        ctx.textAlign = "center";
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
