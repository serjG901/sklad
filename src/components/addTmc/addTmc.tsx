import { useRef } from "react";
import { Tmc } from "../../store/store";
import "./style.css";

interface AddTmc {
    addTmc: (tmc: Tmc) => void;
}

export default function AddTmc({ addTmc }: AddTmc) {
    const inventoryNumberRef = useRef<HTMLInputElement | null>(null);
    const nameRef = useRef<HTMLInputElement | null>(null);
    const unitRef = useRef<HTMLInputElement | null>(null);
    const quantityRef = useRef<HTMLInputElement | null>(null);
    const priceRef = useRef<HTMLInputElement | null>(null);
    const locationRef = useRef<HTMLInputElement | null>(null);
    const commentRef = useRef<HTMLInputElement | null>(null);

    function handleAddTmc() {
        addTmc({
            inventoryNumber: Number(inventoryNumberRef.current?.value),
            name: nameRef.current?.value || "",
            unit: unitRef.current?.value || "",
            quantity: parseFloat(quantityRef.current?.value),
            price: parseFloat(priceRef.current?.value),
            location: locationRef.current?.value || "",
            comment: commentRef.current?.value || "",
        });
    }

    return (
        <div className='addTmc'>
            <details name="actionTmc">
                <summary>Add TMC</summary>
                <div className="flex">
                    <input
                        ref={inventoryNumberRef}
                        type='number'
                        name='inventoryNumber'
                        placeholder='InventoryNumber'
                    />
                    <input
                        ref={nameRef}
                        type='text'
                        name='name'
                        placeholder='Name'
                    />
                    <input
                        ref={unitRef}
                        type='text'
                        name='unit'
                        placeholder='Unit'
                    />
                    <input
                        ref={quantityRef}
                        type='number'
                        name='quantity'
                        placeholder='Quantity'
                    />
                    <input
                        ref={priceRef}
                        type='number'
                        name='price'
                        placeholder='Price'
                    />
                    <input
                        ref={locationRef}
                        type='text'
                        name='location'
                        placeholder='Location'
                    />
                    <input
                        ref={commentRef}
                        type='text'
                        name='comment'
                        placeholder='Comment'
                    />
                    <button type='button' onClick={handleAddTmc}>
                        Add TMC
                    </button>
                </div>
            </details>
        </div>
    );
}
