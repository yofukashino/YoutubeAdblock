/// <reference types="standalone-electron-types"/>

/*
 * Vencord, a Discord client mod
 * Copyright (c) 2023 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { app } from "electron";
import adguard from "./adguard.js?string";

app.on("browser-window-created", (_, win) => {
  win.webContents.on("frame-created", (_, { frame }) => {
    frame?.once("dom-ready", () => {
      if (
        frame.url.includes("youtube.com/embed/") ||
        (frame.url.includes("discordsays") && frame.url.includes("youtube.com"))
      ) {
        void frame.executeJavaScript(adguard);
      }
    });
  });
});
