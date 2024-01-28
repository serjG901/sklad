// @ts-nocheck
import txtToArrTmc from "../../clearFunction/txtToArrTmc";
import useSkladStore, { Tmc } from "../../store/store";
import "./style.css";

export default function FileWork() {
    const [tmcs, addTmc] = useSkladStore((state) => [state.tmcs, state.addTmc]);

    let fileHandle;
    const handleOpenFile = async () => {
        [fileHandle] = await window.showOpenFilePicker();
        const file = await fileHandle.getFile();
        const contents = await file.text();
        if (contents[0] !== "H") {
            const arr = JSON.parse(contents);
            arr.forEach((tmc: Tmc) => addTmc(tmc));
        } else {
            const arr = txtToArrTmc(contents); 
            arr.forEach((tmc: Tmc) => addTmc(tmc));
        };
        console.log(arr);
    };

    function saveAsLegacy() {
        const aDownloadFile = document.getElementById("aDownloadFile");
        const opts = { type: "application/json" };
        const file = new File([JSON.stringify(tmcs, null, 4)], "", opts);
        aDownloadFile.href = window.URL.createObjectURL(file);
        aDownloadFile.setAttribute("download", "skladSave.json");
        aDownloadFile.click();
    }

    const handleDownloadFile = async (e) => {
        const file = e.target.files[0];
        const contents = await file.text();
        if (contents[0] !== "H") {
            const arr = JSON.parse(contents);
            arr.forEach((tmc: Tmc) => addTmc(tmc));
        } else {
            const arr = txtToArrTmc(contents); 
            arr.forEach((tmc: Tmc) => addTmc(tmc));
        };
        console.log(arr);   
    };

    const newSaveFile = async () => {
        const options = {
            types: [
                {
                    description: "JSON",
                    accept: {
                        "application/json": [".json"],
                    },
                },
            ],
        };
        const handle = await window.showSaveFilePicker(options);
        const writable = await handle.createWritable();
        await writable.write(JSON.stringify(tmcs, null, 4));
        await writable.close();
        return handle;
    };

    return (
        <div className='fileWork'>
            <details>
                <summary>File work</summary>
                <div className='grid'>
                    <div>
                        <button type='button' onClick={newSaveFile}>
                            new save file (JSON)
                        </button>
                    </div>
                    <div>
                        <button type='button' onClick={saveAsLegacy}>
                            old save file (JSON)
                        </button>
                        <a id='aDownloadFile' download></a>
                    </div>
                    <div>
                        <button type='button' onClick={handleOpenFile}>
                            new open file (formated TXT)
                        </button>
                    </div>
                    <div>
                        <label htmlFor='oldOpenFile'>
                            Old open file (only JSON)
                            <input
                                name='oldOpenFile'
                                type='file'
                                title='file'
                                onChange={handleDownloadFile}
                            />
                        </label>
                    </div>
                </div>
            </details>
        </div>
    );
}
