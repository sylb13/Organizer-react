import React from "react";
import ToolsPanel from "../components/ToolsPanel";
import MainPanel from "../components/MainPanel";
import DetailsPanel from "../components/DetailsPanel";

function NotesScreen() {
  return (
    <div className="grid-arrangement">
      <ToolsPanel appearance="notes" />
      <MainPanel />
      <DetailsPanel appearance="notes" />
    </div>
  );
}

export default NotesScreen;
