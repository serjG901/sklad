import { useState } from "react";
import { Tmc } from "../../store/store";
import "./style.css";

interface UpdateTmc {
    toUpdateTmc: (inventoryNumber: number, tmc: Tmc) => void;
    inventoryNumber: number;
    name: string;
    unit: string;
    quantity: number;
    price: number;
    location: string;
    comment: string;
}

export default function UpdateTmc({
    toUpdateTmc,
    inventoryNumber,
    name,
    unit,
    quantity,
    price,
    location,
    comment,
}: UpdateTmc) {
    const [inventoryNumberS, setInventoryNumber] = useState<number>(
        () => inventoryNumber
    );
    const [nameS, setName] = useState<string>(() => name);
    const [unitS, setUnit] = useState<string>(() => unit);
    const [quantityS, setQuantity] = useState<number>(() => quantity);
    const [priceS, setPrice] = useState<number>(() => price);
    const [locationS, setLocation] = useState<string>(() => location);
    const [commentS, setComment] = useState<string>(() => comment);

    if (!inventoryNumber) return null;
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
    }
    console.log(inventoryNumberS);
    console.log(nameS);
    return (
        <div className='updateTmc'>
            <div>Update TMC [IN: {inventoryNumber}]</div>
            <div className='flex'>
                <input
                    onChange={(e) => setInventoryNumber(Number(e.target.value))}
                    type='text'
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
                    type='text'
                    name='quantity'
                    placeholder='Quantity'
                    value={quantityS}
                />
                <input
                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                    type='text'
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
