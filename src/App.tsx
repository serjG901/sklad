import useSkladStore, { Tmc } from "./store/store";
import "./App.css";
import TmcTable from "./components/tmcTable/tmcTable";
import txtToArrTmc from "./clearFunction/txtToArrTmc";
import SystemMessageTable from "./components/systemMessagesTable/systemMessagesTable";
import AddTmc from "./components/addTmc/addTmc";
import DeleteTmc from "./components/deleteTmc/deleteTmc";
import { useState } from "react";
import UpdateTmc from "./components/updateTmc/updateTmc";

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

    let fileHandle;
    const handleOpenFile = async () => {
        [fileHandle] = await window.showOpenFilePicker();
        const file = await fileHandle.getFile();
        const contents = await file.text();
        const arr = txtToArrTmc(contents);
        arr.forEach((tmc: Tmc) => addTmc(tmc));
        console.log(arr);
    };

    const handleDownloadFile = (e) => {
        const file = e.target.files[0];
        file.text().then((res) => {
            const arr = JSON.parse(res);
            arr.forEach((tmc: Tmc) => addTmc(tmc));
            console.log(arr);
        });
    };

    return (
        <>
            <div popover='auto' id='tmc-popover'>
                <UpdateTmc
                    inventoryNumber={updateTmcForIN}
                    setUpdateTmcForIN={setUpdateTmcForIN}
                />
            </div>

            <button type='button' onClick={handleOpenFile}>
                open file
            </button>
            <input type='file' title='file' onChange={handleDownloadFile} />
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
