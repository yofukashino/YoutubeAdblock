/// <reference types="standalone-electron-types"/>

/*
 * Vencord, a Discord client mod
 * Copyright (c) 2023 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { BrowserWindow, app } from "electron";
import adguard from "./adguard.js?string";

const addFrameListener = (win: BrowserWindow): void => {
  win.webContents.on("frame-created", (_, { frame }) => {
    frame?.once("dom-ready", async () => {
      if (
        frame.url.includes("youtube.com/embed/") ||
        (frame.url.includes("discordsays") && frame.url.includes("youtube.com"))
      ) {
        await frame.executeJavaScript(adguard);
      }
    });
  });
};

BrowserWindow.getAllWindows().forEach(addFrameListener);

app.on("browser-window-created", (_, win) => addFrameListener(win));
