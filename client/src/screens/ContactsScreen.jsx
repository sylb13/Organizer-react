import React from "react";
import ToolsPanel from "../components/ToolsPanel";
import MainPanel from "../components/MainPanel";
import DetailsPanel from "../components/DetailsPanel";

function ContactsScreen(){
    return <div className="grid-arrangement">
            <ToolsPanel />
            <MainPanel />
            <DetailsPanel />
    </div>
}

export default ContactsScreen;