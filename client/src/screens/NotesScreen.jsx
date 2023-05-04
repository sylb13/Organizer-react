import React from "react";
import ToolsPanel from "../components/ToolsPanel";
import MainPanel from "../components/MainPanel";
import DetailsPanel from "../components/DetailsPanel";
import NotesEditor from "../components/notes/NotesEditor";

function NotesScreen() {
  return (
    <div className="grid-arrangement">
      <ToolsPanel appearance="notes" />
      <MainPanel />
      <div className="notes-editor-section">
        <NotesEditor />
      </div>

      <DetailsPanel appearance="notes" />
    </div>
  );
}

export default NotesScreen;
