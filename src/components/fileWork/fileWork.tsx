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
        const arr = txtToArrTmc(contents);
        arr.forEach((tmc: Tmc) => addTmc(tmc));
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

    const handleDownloadFile = (e) => {
        const file = e.target.files[0];
        file.text().then((res) => {
            const arr = JSON.parse(res);
            arr.forEach((tmc: Tmc) => addTmc(tmc));
            console.log(arr);
        });
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
                            new save file
                        </button>
                    </div>
                    <div>
                        <button type='button' onClick={saveAsLegacy}>
                            old save file
                        </button>
                        <a id='aDownloadFile' download></a>
                    </div>
                    <div>
                        <button type='button' onClick={handleOpenFile}>
                            new open file
                        </button>
                    </div>
                    <div>
                        <label htmlFor='oldOpenFile'>
                            Old open file
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
