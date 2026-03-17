"use client";

import { cloneElement, useMemo, useState } from "react";

import ScreensaverCanvas from "../ScreensaverCanvas";
import {
  DESKTOP_COLORS,
  ICON_VIEW_MODES,
  SCREENSAVER_OPTIONS,
  SCREENSAVER_TIMEOUT_OPTIONS,
  WALLPAPER_PATTERNS,
} from "../constants";
import { useAudio } from "../hooks/useAudio";
import { useDialogs } from "../hooks/useDialogs";
import { useSettings } from "../hooks/useSettings";
import { useSystem } from "../hooks/useSystem";
import { Icons } from "@/components/shared/icons";
import {
  ETCHED_SEPARATOR_STYLE,
  INSET_BORDER,
  WIN95_COLORS,
  getWin95ButtonStyle,
  getWin95FieldStyle,
  getWin95TabStyle,
  getWin95TitleBarStyle,
  getWin95WindowStyle,
} from "../ui/retro";

const TAB_ITEMS = [
  ["display", "Display"],
  ["sound", "Sound"],
  ["screensaver", "Screensaver"],
  ["system", "System"],
];

function SectionGroup({ title, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: WIN95_COLORS.text, marginBottom: 6 }}>{title}</div>
      <div style={{ ...ETCHED_SEPARATOR_STYLE, marginBottom: 8 }} />
      {children}
    </div>
  );
}

function CheckboxRow({ checked, disabled = false, label, onChange, description = null }) {
  return (
    <label style={{ display: "flex", alignItems: "flex-start", gap: 8, cursor: disabled ? "default" : "pointer", opacity: disabled ? 0.6 : 1 }}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        style={{
          ...getWin95ButtonStyle({ padding: 0, disabled }),
          width: 15,
          height: 15,
          minWidth: 15,
          background: "#ffffff",
          display: "grid",
          placeItems: "center",
        }}
      >
        {checked ? <span style={{ fontSize: 12, lineHeight: 1, color: "#000080" }}>x</span> : null}
      </button>
      <span style={{ fontSize: 12, color: WIN95_COLORS.text }}>
        <span>{label}</span>
        {description ? <span style={{ display: "block", color: WIN95_COLORS.textMuted, fontSize: 11, marginTop: 2 }}>{description}</span> : null}
      </span>
    </label>
  );
}

function ChoiceStrip({ options, value, onChange }) {
  return (
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          style={getWin95ButtonStyle({ pressed: value === option.value, padding: "3px 10px" })}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function PreviewFrame({ height = 160, children }) {
  return (
    <div style={{ ...INSET_BORDER, background: "#000000", padding: 8 }}>
      <div style={{ minHeight: height, position: "relative", overflow: "hidden", background: "#000000" }}>
        {children}
      </div>
    </div>
  );
}

function DesktopPreviewIcon({ glyph, label, iconSizeMode }) {
  const view = ICON_VIEW_MODES[iconSizeMode] || ICON_VIEW_MODES.medium;
  const glyphSize = Math.max(18, Math.round(24 * view.glyphScale));
  const labelSize = Math.max(9, view.labelSize - 1);
  const labelWidth = Math.max(44, Math.min(68, view.tileW - 18));
  const scale = glyphSize / 32;

  return (
    <div style={{ width: labelWidth, textAlign: "center", color: "#ffffff", fontSize: labelSize, lineHeight: 1.2 }}>
      <div style={{ width: glyphSize, height: glyphSize, margin: "0 auto 4px", overflow: "hidden" }}>
        <div style={{ width: 32, height: 32, transform: `scale(${scale})`, transformOrigin: "top left" }}>
          {cloneElement(glyph)}
        </div>
      </div>
      {label}
    </div>
  );
}

function PreviewDialog({ title, onClose, children }) {
  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(0, 0, 0, 0.28)", zIndex: 31000, display: "grid", placeItems: "center", padding: 16 }}
      onClick={onClose}
    >
      <div onClick={(event) => event.stopPropagation()} style={{ ...getWin95WindowStyle(true), width: 320, maxWidth: "calc(100vw - 32px)" }}>
        <div style={getWin95TitleBarStyle(true)}>{title}</div>
        <div style={{ padding: 10 }}>{children}</div>
        <div style={{ ...ETCHED_SEPARATOR_STYLE, margin: "0 10px" }} />
        <div style={{ padding: "10px 12px 12px", display: "flex", justifyContent: "flex-end" }}>
          <button type="button" onClick={onClose} style={getWin95ButtonStyle({ minWidth: 76 })}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SettingsApp() {
  const [activeTab, setActiveTab] = useState("display");
  const [previewOpen, setPreviewOpen] = useState(false);
  const {
    iconSizeMode,
    setIconSizeMode,
    clockFormat,
    setClockFormat,
    desktopColor,
    setDesktopColor,
    wallpaperPattern,
    setWallpaperPattern,
    crtEffectEnabled,
    setCrtEffectEnabled,
    masterSoundEnabled,
    setMasterSoundEnabled,
    uiSoundsEnabled,
    setUiSoundsEnabled,
    startupSoundEnabled,
    setStartupSoundEnabled,
    screensaverType,
    setScreensaverType,
    screensaverTimeout,
    setScreensaverTimeout,
  } = useSettings();
  const { specs, formattedUptime } = useSystem();
  const { showSystemReport } = useDialogs();
  const { playUiSound, playStartupSound } = useAudio();

  const backgroundPreview = useMemo(() => {
    const selected = DESKTOP_COLORS.find((entry) => entry.value === desktopColor);
    return selected?.preview || "linear-gradient(180deg, #0b4aa6, #0a3f90)";
  }, [desktopColor]);
  const currentScreensaverLabel = useMemo(
    () => SCREENSAVER_OPTIONS.find((entry) => entry.id === screensaverType)?.label || "None",
    [screensaverType],
  );
  const currentTabLabel = useMemo(
    () => TAB_ITEMS.find(([id]) => id === activeTab)?.[1] || "Settings",
    [activeTab],
  );
  const canPlayUiPreview = masterSoundEnabled && uiSoundsEnabled;
  const canPlayStartupPreview = masterSoundEnabled && startupSoundEnabled;
  const canPreviewScreensaver = screensaverType !== "none";

  return (
    <>
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: WIN95_COLORS.surface,
          color: WIN95_COLORS.text,
          overflow: "hidden",
          boxSizing: "border-box",
        }}
      >
        <div style={{ padding: "8px 10px 0", background: WIN95_COLORS.surface }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 2 }}>
            {TAB_ITEMS.map(([id, label]) => (
              <button key={id} type="button" onClick={() => setActiveTab(id)} style={getWin95TabStyle(activeTab === id)}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, minHeight: 0, margin: "0 10px 10px", padding: 12, background: WIN95_COLORS.surface, borderTop: "2px solid #ffffff", borderLeft: "2px solid #ffffff", borderRight: "2px solid #808080", borderBottom: "2px solid #808080", overflow: "auto", display: "flex", flexDirection: "column", gap: 10 }}>
          {activeTab === "display" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
              <div>
                <SectionGroup title="Desktop Icon Size">
                  <ChoiceStrip
                    value={iconSizeMode}
                    onChange={setIconSizeMode}
                    options={[
                      { value: "small", label: "Small" },
                      { value: "medium", label: "Medium" },
                      { value: "large", label: "Large" },
                    ]}
                  />
                </SectionGroup>

                <SectionGroup title="Desktop Background">
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 8 }}>
                    {DESKTOP_COLORS.map(({ label, value, preview }) => {
                      const selected = desktopColor === value;
                      return (
                        <button key={label} type="button" onClick={() => setDesktopColor(value)} style={{ ...getWin95ButtonStyle({ pressed: selected, padding: "4px" }), display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                          <span style={{ width: "100%", height: 26, border: "1px solid #404040", background: preview }} />
                          <span style={{ fontSize: 10 }}>{label}</span>
                        </button>
                      );
                    })}
                  </div>
                </SectionGroup>

                <SectionGroup title="Wallpaper Pattern">
                  <ChoiceStrip
                    value={wallpaperPattern}
                    onChange={setWallpaperPattern}
                    options={WALLPAPER_PATTERNS.map((pattern) => ({ value: pattern.id, label: pattern.label }))}
                  />
                </SectionGroup>

                <SectionGroup title="CRT Display Effects">
                  <CheckboxRow
                    checked={crtEffectEnabled}
                    onChange={setCrtEffectEnabled}
                    label="Enable CRT overlay"
                    description="Applies scanlines and a light vignette to the desktop."
                  />
                </SectionGroup>
              </div>

              <div>
                <SectionGroup title="Preview">
                  <PreviewFrame>
                    <div style={{ position: "absolute", inset: 0, background: backgroundPreview }}>
                      {wallpaperPattern !== "solid" && (
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            backgroundImage: wallpaperPattern === "scanline"
                              ? "repeating-linear-gradient(180deg, rgba(255,255,255,0.14) 0px, rgba(255,255,255,0.14) 1px, transparent 1px, transparent 4px)"
                              : wallpaperPattern === "dot-grid"
                                ? "radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)"
                                : "repeating-linear-gradient(135deg, rgba(255,255,255,0.14) 0 6px, transparent 6px 14px)",
                            backgroundSize: wallpaperPattern === "dot-grid" ? "8px 8px" : "auto",
                            backgroundRepeat: "repeat",
                          }}
                        />
                      )}
                      {crtEffectEnabled && <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(180deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 4px)" }} />}
                      <div style={{ position: "absolute", left: 12, top: 14, display: "grid", gap: 10 }}>
                        <DesktopPreviewIcon glyph={Icons.computer} label="My Computer" iconSizeMode={iconSizeMode} />
                        <DesktopPreviewIcon glyph={Icons.settings} label="Settings" iconSizeMode={iconSizeMode} />
                      </div>
                    </div>
                  </PreviewFrame>
                </SectionGroup>
              </div>
            </div>
          )}

          {activeTab === "sound" && (
            <div style={{ display: "grid", gap: 14 }}>
              <SectionGroup title="Master Sound">
                <CheckboxRow
                  checked={masterSoundEnabled}
                  onChange={setMasterSoundEnabled}
                  label="Enable system sound"
                  description="Turns all JacobOS generated audio on or off."
                />
              </SectionGroup>

              <SectionGroup title="User Interface Sounds">
                <CheckboxRow
                  checked={uiSoundsEnabled}
                  disabled={!masterSoundEnabled}
                  onChange={setUiSoundsEnabled}
                  label="Play window and button sounds"
                  description="Uses Web Audio API beeps for open, close, minimize, and click feedback."
                />
                <div style={{ height: 8 }} />
                <CheckboxRow
                  checked={startupSoundEnabled}
                  disabled={!masterSoundEnabled}
                  onChange={setStartupSoundEnabled}
                  label="Play startup sound"
                  description="Boot sequence will play a short retro startup tone."
                />
              </SectionGroup>

              <SectionGroup title="Sound Preview">
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <button
                    type="button"
                    disabled={!canPlayUiPreview}
                    onClick={() => playUiSound("click")}
                    style={getWin95ButtonStyle({ minWidth: 90, disabled: !canPlayUiPreview })}
                  >
                    Test Click
                  </button>
                  <button
                    type="button"
                    disabled={!canPlayUiPreview}
                    onClick={() => playUiSound("open")}
                    style={getWin95ButtonStyle({ minWidth: 104, disabled: !canPlayUiPreview })}
                  >
                    Test Window
                  </button>
                  <button
                    type="button"
                    disabled={!canPlayStartupPreview}
                    onClick={playStartupSound}
                    style={getWin95ButtonStyle({ minWidth: 106, disabled: !canPlayStartupPreview })}
                  >
                    Test Startup
                  </button>
                </div>
              </SectionGroup>
            </div>
          )}

          {activeTab === "screensaver" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
              <div>
                <SectionGroup title="Screensaver">
                  <div style={{ display: "grid", gap: 10 }}>
                    <label style={{ display: "grid", gap: 4, fontSize: 11 }}>
                      <span>Current screensaver</span>
                      <select value={screensaverType} onChange={(event) => setScreensaverType(event.target.value)} style={{ ...getWin95FieldStyle({ padding: "3px 6px", minHeight: 24 }), outline: "none" }}>
                        {SCREENSAVER_OPTIONS.map((option) => (
                          <option key={option.id} value={option.id}>{option.label}</option>
                        ))}
                      </select>
                    </label>
                    <label style={{ display: "grid", gap: 4, fontSize: 11 }}>
                      <span>Wait</span>
                      <select value={String(screensaverTimeout)} onChange={(event) => setScreensaverTimeout(event.target.value === "null" ? null : Number(event.target.value))} style={{ ...getWin95FieldStyle({ padding: "3px 6px", minHeight: 24 }), outline: "none" }}>
                        {SCREENSAVER_TIMEOUT_OPTIONS.map((option) => (
                          <option key={String(option.value)} value={String(option.value)}>{option.label}</option>
                        ))}
                      </select>
                    </label>
                    <div>
                      <button type="button" disabled={!canPreviewScreensaver} onClick={() => setPreviewOpen(true)} style={getWin95ButtonStyle({ minWidth: 90, disabled: !canPreviewScreensaver })}>
                        Preview
                      </button>
                    </div>
                  </div>
                </SectionGroup>
              </div>

              <div>
                <SectionGroup title="Mini Preview">
                  <div style={{ ...INSET_BORDER, background: "#000000", height: 180, padding: 4 }}>
                    <ScreensaverCanvas type={screensaverType} />
                  </div>
                </SectionGroup>
              </div>
            </div>
          )}

          {activeTab === "system" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
              <div>
                <SectionGroup title="System Profile">
                  <div style={{ ...getWin95FieldStyle({ padding: "8px 10px" }), fontFamily: "\"Courier New\", monospace", display: "grid", gap: 6 }}>
                    {specs.map(([label, value]) => (
                      <div key={label} style={{ display: "grid", gridTemplateColumns: "88px 1fr", gap: 8 }}>
                        <span style={{ color: WIN95_COLORS.textMuted }}>{label}</span>
                        <span>{value}</span>
                      </div>
                    ))}
                    <div style={{ display: "grid", gridTemplateColumns: "88px 1fr", gap: 8 }}>
                      <span style={{ color: WIN95_COLORS.textMuted }}>Uptime</span>
                      <span>{formattedUptime}</span>
                    </div>
                  </div>
                </SectionGroup>

                <div>
                  <button type="button" onClick={showSystemReport} style={getWin95ButtonStyle({ minWidth: 118 })}>
                    System Report
                  </button>
                </div>
              </div>

              <div>
                <SectionGroup title="Clock">
                  <ChoiceStrip
                    value={clockFormat}
                    onChange={setClockFormat}
                    options={[
                      { value: "12h", label: "12-hour" },
                      { value: "24h", label: "24-hour" },
                    ]}
                  />
                </SectionGroup>

                <SectionGroup title="Session">
                  <div style={{ ...getWin95FieldStyle({ padding: "8px 10px" }), fontSize: 11, lineHeight: 1.6 }}>
                    <div>Current uptime: <strong>{formattedUptime}</strong></div>
                    <div>Sound engine: <strong>{masterSoundEnabled ? "Enabled" : "Muted"}</strong></div>
                    <div>CRT overlay: <strong>{crtEffectEnabled ? "Active" : "Disabled"}</strong></div>
                    <div>Screensaver: <strong>{currentScreensaverLabel}</strong></div>
                  </div>
                </SectionGroup>
              </div>
            </div>
          )}

          <div style={{ marginTop: "auto" }}>
            <div style={ETCHED_SEPARATOR_STYLE} />
            <div style={{ paddingTop: 8, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap", fontSize: 11, color: WIN95_COLORS.textMuted }}>
              <span>Changes apply immediately to the current JacobOS session.</span>
              <span>{currentTabLabel} settings</span>
            </div>
          </div>
        </div>
      </div>

      {previewOpen && (
        <PreviewDialog title="Screensaver Preview" onClose={() => setPreviewOpen(false)}>
          <div style={{ ...INSET_BORDER, background: "#000000", height: 220, padding: 4 }}>
            <ScreensaverCanvas type={screensaverType} />
          </div>
        </PreviewDialog>
      )}
    </>
  );
}
