import React from "react";
import ToolsPanel from "../components/ToolsPanel";
import MainPanel from "../components/MainPanel";
import DetailsPanel from "../components/DetailsPanel";

function CategoriesScreen() {
  return (
    <div className="grid-arrangement">
      <ToolsPanel appearance="categories" />
      <MainPanel />
      <DetailsPanel appearance="categories" />
    </div>
  );
}

export default CategoriesScreen;
