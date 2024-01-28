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
    const [
        tmcs,
        addTmc,
        deleteTmc,
        toUpdateTmc,
        systemMessages,
        deleteMessage,
    ] = useSkladStore((state) => [
        state.tmcs,
        state.addTmc,
        state.deleteTmc,
        state.toUpdateTmc,
        state.systemMessages,
        state.deleteMessage,
    ]);

    const [updateTmc, setUpdateTmc] = useState<Tmc | null>(null);

    let fileHandle;
    const handleOpenFile = async () => {
        [fileHandle] = await window.showOpenFilePicker();
        const file = await fileHandle.getFile();
        const contents = await file.text();
        const arr = txtToArrTmc(contents);
        arr.forEach((tmc: Tmc) => addTmc(tmc));
        console.log(arr);
    };
    /* */
    return (
        <>/*@ts-ignore*/
            <div popover='auto' id='tmc-popover'>
                <UpdateTmc
                    toUpdateTmc={toUpdateTmc}
                    inventoryNumber={updateTmc?.inventoryNumber}
                    name={updateTmc?.name}
                    unit={updateTmc?.unit}
                    quantity={updateTmc?.quantity}
                    price={updateTmc?.price}
                    location={updateTmc?.location}
                    comment={updateTmc?.comment}
                />
            </div>

            <button type='button' onClick={handleOpenFile}>
                open file
            </button>
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
            <TmcTable tmcs={tmcs} setUpdateTmc={setUpdateTmc} />
        </>
    );
}

export default App;
