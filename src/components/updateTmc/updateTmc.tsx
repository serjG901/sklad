import { useEffect, useState } from "react";
import useSkladStore, { Tmc } from "../../store/store";
import "./style.css";

interface UpdateTmc {
    inventoryNumber: number;
    setUpdateTmcForIN: React.Dispatch<React.SetStateAction<number>>;
}

export default function UpdateTmc({
    inventoryNumber,
    setUpdateTmcForIN,
}: UpdateTmc) {
    const [tmcs, toUpdateTmc] = useSkladStore((state) => [
        state.tmcs,
        state.toUpdateTmc,
    ]);

    const [inventoryNumberS, setInventoryNumber] = useState<number>(0);
    const [nameS, setName] = useState<string>("");
    const [unitS, setUnit] = useState<string>("");
    const [quantityS, setQuantity] = useState<number>(0);
    const [priceS, setPrice] = useState<number>(0);
    const [locationS, setLocation] = useState<string>("");
    const [commentS, setComment] = useState<string>("");

    useEffect(() => {
        if (inventoryNumber) {
            const updateTmc = tmcs.find(
                (tmc: Tmc) => tmc.inventoryNumber === inventoryNumber
            );
            setInventoryNumber(inventoryNumber);
            setName(updateTmc.name);
            setUnit(updateTmc.unit);
            setQuantity(updateTmc.quantity);
            setPrice(updateTmc.price);
            setLocation(updateTmc.location);
            setComment(updateTmc.comment);
        }
    }, [inventoryNumber, setUpdateTmcForIN, tmcs]);

    function handleUpdateTmc() {
        toUpdateTmc(inventoryNumber, {
            inventoryNumber: inventoryNumberS,
            name: nameS,
            unit: unitS,
            quantity: quantityS,
            price: priceS,
            location: locationS,
            comment: commentS,
        });
        setUpdateTmcForIN(inventoryNumberS);
    }
    return (
        <div className='updateTmc'>
            <div>Update TMC [IN: {inventoryNumber}]</div>
            <div className='flex'>
                <input
                    onChange={(e) => setInventoryNumber(Number(e.target.value))}
                    type='number'
                    name='inventoryNumber'
                    placeholder='InventoryNumber'
                    value={inventoryNumberS}
                />
                <input
                    onChange={(e) => setName(e.target.value)}
                    type='text'
                    name='name'
                    placeholder='Name'
                    value={nameS}
                />
                <input
                    onChange={(e) => setUnit(e.target.value)}
                    type='text'
                    name='unit'
                    placeholder='Unit'
                    value={unitS}
                />
                <input
                    onChange={(e) => setQuantity(parseFloat(e.target.value))}
                    type='number'
                    name='quantity'
                    placeholder='Quantity'
                    value={quantityS}
                />
                <input
                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                    type='number'
                    name='price'
                    placeholder='Price'
                    value={priceS}
                />
                <input
                    onChange={(e) => setLocation(e.target.value)}
                    type='text'
                    name='location'
                    placeholder='Location'
                    value={locationS}
                />
                <input
                    onChange={(e) => setComment(e.target.value)}
                    type='text'
                    name='comment'
                    placeholder='Comment'
                    value={commentS}
                />
                <button type='button' onClick={handleUpdateTmc}>
                    Update TMC
                </button>
            </div>
        </div>
    );
}
