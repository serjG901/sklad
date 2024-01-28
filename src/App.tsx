// @ts-nocheck
import useSkladStore from "./store/store";
import "./App.css";
import TmcTable from "./components/tmcTable/tmcTable";
import SystemMessageTable from "./components/systemMessagesTable/systemMessagesTable";
import AddTmc from "./components/addTmc/addTmc";
import DeleteTmc from "./components/deleteTmc/deleteTmc";
import { useState } from "react";
import UpdateTmc from "./components/updateTmc/updateTmc";
import FileWork from "./components/fileWork/fileWork";

function App() {
    const [tmcs, addTmc, deleteTmc, systemMessages, deleteMessage] =
        useSkladStore((state) => [
            state.tmcs,
            state.addTmc,
            state.deleteTmc,
            state.systemMessages,
            state.deleteMessage,
        ]);

    const [updateTmcForIN, setUpdateTmcForIN] = useState<number | null>(null);

    return (
        <>
            <div popover='auto' id='tmc-popover'>
                <UpdateTmc
                    inventoryNumber={updateTmcForIN}
                    setUpdateTmcForIN={setUpdateTmcForIN}
                />
            </div>
            <FileWork />
            <br />
            <br />
            <DeleteTmc deleteTmc={deleteTmc} />
            <br />
            <AddTmc addTmc={addTmc} />
            <br />
            <br />
            <SystemMessageTable
                systemMessages={systemMessages}
                deleteMessage={deleteMessage}
            />
            <br />
            <br />
            <TmcTable tmcs={tmcs} setUpdateTmcForIN={setUpdateTmcForIN} />
        </>
    );
}

export default App;
