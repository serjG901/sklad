import { useRef } from "react";
import "./style.css";

interface DeleteTmc {
    deleteTmc: (
        deleteInventoryNumber: number,
        deleteQuantity: number,
        deleteComment: string
    ) => void;
}

export default function DeleteTmc({ deleteTmc }: DeleteTmc) {
    const deleteInventoryNumberRef = useRef<HTMLInputElement | null>(null);
    const deleteQuantityRef = useRef<HTMLInputElement | null>(null);
    const deleteCommentRef = useRef<HTMLInputElement | null>(null);

    function handleDeleteTmc() {
        deleteTmc(
            Number(deleteInventoryNumberRef.current?.value),
            parseFloat(deleteQuantityRef.current?.value),
            deleteCommentRef.current?.value || ""
        );
    }

    return (
        <div className='deleteTmc'>
            <details name="actionTmc">
                <summary>Delete TMC</summary>
                <div className='flex'>
                    <input
                        ref={deleteInventoryNumberRef}
                        type='text'
                        name='deleteInventoryNumber'
                        placeholder='InventoryNumber'
                    />
                    <input
                        ref={deleteQuantityRef}
                        type='text'
                        name='deleteQuantity'
                        placeholder='Quantity'
                    />
                    <input
                        ref={deleteCommentRef}
                        type='text'
                        name='deleteComment'
                        placeholder='Comment'
                    />
                    <button type='button' onClick={handleDeleteTmc}>
                        Delete TMC
                    </button>
                </div>
            </details>
        </div>
    );
}
