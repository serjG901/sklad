import { useRef, useEffect } from "react";
import useSkladStore, { Item, SystemMessage } from "./store/store";
import "./App.css";
import JSON from "./sklad.json";

function App() {
    const [items, addItem, deleteItem, systemMessages] = useSkladStore(
        (state) => [
            state.items,
            state.addItem,
            state.deleteItem,
            state.systemMessages,
        ]
    );

    useEffect(() => {
        //@ts-ignore
        if (items.length === 0) JSON.forEach((item) => addItem(item));
    }, []);

    const deleteInventaryNumberRef = useRef<HTMLInputElement | null>(null);
    const deleteQuantityRef = useRef<HTMLInputElement | null>(null);
    const deleteCommentRef = useRef<HTMLInputElement | null>(null);
    const inventaryNumberRef = useRef<HTMLInputElement | null>(null);
    const nameRef = useRef<HTMLInputElement | null>(null);
    const unitRef = useRef<HTMLInputElement | null>(null);
    const quantityRef = useRef<HTMLInputElement | null>(null);
    const priceRef = useRef<HTMLInputElement | null>(null);
    const locationRef = useRef<HTMLInputElement | null>(null);
    const commentRef = useRef<HTMLInputElement | null>(null);

    function handleAddItem() {
        addItem({
            inventaryNumber: Number(inventaryNumberRef.current?.value),
            name: nameRef.current?.value || "",
            unit: unitRef.current?.value || "",
            quantity: Number(quantityRef.current?.value),
            price: Number(priceRef.current?.value),
            location: locationRef.current?.value || "",
            comment: commentRef.current?.value || "",
        });
    }

    function handleDeleteItem() {
        deleteItem(
            Number(deleteInventaryNumberRef.current?.value),
            Number(deleteQuantityRef.current?.value),
            deleteCommentRef.current?.value || ""
        );
    }
    let fileHandle;
    const handleOpenFile = async () => {
        [fileHandle] = await window.showOpenFilePicker();
        const file = await fileHandle.getFile();
        const contents = await file.text();
        const arr = contents
            .match(/(.+)(?=NNNN)/gi)
            .map((item: string) =>
                item
                    .replaceAll("\t", "")
                    .split("HHHH")
                    .filter((str: string) => str !== "")
            )
            .map((item: string[]) => ({
                inventaryNumber: Number(item[0]),
                name: item[1],
                unit: item[2],
                quantity: Number(item[4]),
                price: parseFloat(item[3].replace(" ", "").replace(",", ".")),
                location: item[6],
                comment: item[7],
            }));
        arr.forEach((item: Item) => addItem(item));
        console.log(arr);
    };

    return (
        <>
            <button onClick={handleOpenFile}>open file</button> <br />
            <br />
            <div>Delete Item</div>
            <div>
                <div>
                    <input
                        ref={deleteInventaryNumberRef}
                        type='text'
                        name='deleteInventoryNumber'
                        placeholder='InventoryNumber'
                    />
                </div>
                <div>
                    <input
                        ref={deleteQuantityRef}
                        type='text'
                        name='deleteQuantity'
                        placeholder='quantity'
                    />
                </div>
                <div>
                    <input
                        ref={deleteCommentRef}
                        type='text'
                        name='deleteComment'
                        placeholder='comment'
                    />
                </div>
            </div>
            <button onClick={handleDeleteItem}>delete item</button>
            <br />
            <br />
            <div>Add Item</div>
            <div>
                <input
                    ref={inventaryNumberRef}
                    type='text'
                    name='inventoryNumber'
                    placeholder='inventoryNumber'
                />
            </div>
            <div>
                <input
                    ref={nameRef}
                    type='text'
                    name='name'
                    placeholder='name'
                />
            </div>
            <div>
                <input
                    ref={unitRef}
                    type='text'
                    name='unit'
                    placeholder='unit'
                />
            </div>
            <div>
                <input
                    ref={quantityRef}
                    type='text'
                    name='quantity'
                    placeholder='quantity'
                />
            </div>
            <div>
                <input
                    ref={priceRef}
                    type='text'
                    name='price'
                    placeholder='price'
                />
            </div>
            <div>
                <input
                    ref={locationRef}
                    type='text'
                    name='location'
                    placeholder='location'
                />
            </div>
            <div>
                <input
                    ref={commentRef}
                    type='text'
                    name='comment'
                    placeholder='comment'
                />
            </div>
            <div>
                <button onClick={handleAddItem}>add item</button>
            </div>
            <br />
            <br />
            <details style={{ maxHeight: "100vh", overflow: "auto" }}>
                <summary>SystemMessages:</summary>
                <div style={{ display: "grid", grid: "auto / repeat(4, 1fr)" }}>
                    <div>№</div>
                    <div>Message</div>
                    <div>Comment</div>
                    <div>DateTime</div>
                </div>
                {systemMessages
                    .map((systemMessage: SystemMessage, index: number) => (
                        <div
                            key={systemMessage.datetime}
                            style={{
                                display: "grid",
                                grid: "auto / repeat(4, 1fr)",
                                color: `${systemMessage.color}`,
                            }}
                        >
                            <div>{index + 1}</div>
                            <div>{systemMessage.message}</div>
                            <div>{systemMessage.comment}</div>
                            <div>{systemMessage.datetime}</div>
                        </div>
                    ))
                    .reverse()}
            </details>
            <br />
            <br />
            <details style={{ maxHeight: "100vh", overflow: "auto" }}>
                <summary>Items on SKLAD:</summary>
                <div style={{ display: "grid", grid: "auto / repeat(9, 1fr)" }}>
                    <div>№</div>
                    <div>InventaryNumber</div>
                    <div>Name</div>
                    <div>Unit</div>
                    <div>Quantity</div>
                    <div>Price</div>
                    <div>Cost</div>
                    <div>Location</div>
                    <div>Comment</div>
                </div>
                {items.map((item: Item, index: number) => (
                    <div
                        key={item.inventaryNumber}
                        style={{
                            display: "grid",
                            grid: "auto / repeat(9, 1fr)",
                        }}
                    >
                        <div>{index + 1}</div>
                        <div>{item.inventaryNumber}</div>
                        <div>{item.name}</div>
                        <div>{item.unit}</div>
                        <div>{item.quantity}</div>
                        <div>{item.price}</div>
                        <div>{Math.round(item.price * item.quantity*100)/100}</div>
                        <div>{item.location}</div>
                        <div>{item.comment}</div>
                    </div>
                ))}
            </details>
        </>
    );
}

export default App;
