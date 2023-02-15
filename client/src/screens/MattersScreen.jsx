import React, { useContext } from "react";
import ToolsPanel from "../components/ToolsPanel";
import DetailsPanel from "../components/DetailsPanel";
import MainPanel from "../components/MainPanel";
import AddNewMatterButton from "../components/matters/AddNewMatterButton";
import MattersList from "../components/matters/MattersList";
import { MattersContext } from "../context/MattersContext";

function MattersScreen() {
  const { addEmptyMatter } = useContext(MattersContext);

  return (
    <section className="grid-arrangement">
      <ToolsPanel appearance="matters" />
      <MainPanel />

      <div className="matters-screen">
        <div className="addNewMatterButton-div">
          <AddNewMatterButton click={addEmptyMatter} />
        </div>
        {<MattersList />}
      </div>

      <DetailsPanel appearance="matters" />
    </section>
  );
}

export default MattersScreen;
