"use client";

import { useCallback, useState } from "react";
import BottomSheet from "./BottomSheet";
import ContextMenu from "./ContextMenu";
import Dock from "./Dock";
import HomeScreen from "./HomeScreen";
import StatusBar from "./StatusBar";

export default function MobileOS() {
  const [openApp, setOpenApp] = useState(null);
  const [contextMenu, setContextMenu] = useState(null); // { appId, x, y }

  const handleOpen = useCallback((appId) => {
    setContextMenu(null);
    setOpenApp(appId);
  }, []);

  const handleClose = useCallback(() => {
    setOpenApp(null);
  }, []);

  const handleLongPress = useCallback((appId, x, y) => {
    setContextMenu({ appId, x, y });
  }, []);

  const handleContextMenuClose = useCallback(() => {
    setContextMenu(null);
  }, []);

  return (
    <div
      style={{
        height: "100dvh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
        fontFamily: '"MS Sans Serif", Tahoma, Geneva, sans-serif',
        background: "linear-gradient(180deg, #0b4aa6 0%, #0a3f90 100%)",
      }}
    >
      <StatusBar />

      <HomeScreen
        onOpen={handleOpen}
        onLongPress={handleLongPress}
      />

      <Dock onOpen={handleOpen} />

      {/* Bottom sheet app view */}
      {openApp && (
        <BottomSheet appId={openApp} onClose={handleClose} />
      )}

      {/* Long-press context menu */}
      {contextMenu && (
        <ContextMenu
          appId={contextMenu.appId}
          x={contextMenu.x}
          y={contextMenu.y}
          onOpen={handleOpen}
          onClose={handleContextMenuClose}
        />
      )}
    </div>
  );
}
