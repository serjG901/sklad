import { Tmc } from "../../store/store";

interface TmcInTable {
    tmc: Tmc;
    index: number;
    setUpdateTmc: React.Dispatch<React.SetStateAction<Tmc>>;
}

export default function TmcInTable({ tmc, index, setUpdateTmc }: TmcInTable) {
    const handleUpdate = () => setUpdateTmc({...tmc});

    return (
        <>
            <div>{index + 1}</div>
            <div>
                <button type="button" popovertarget='tmc-popover' onClick={handleUpdate}>
                    {tmc.inventoryNumber}
                </button>
            </div>
            <div>{tmc.name}</div>
            <div>{tmc.unit}</div>
            <div>{tmc.quantity}</div>
            <div>{tmc.price}</div>
            <div>{Math.round(tmc.price * tmc.quantity * 100) / 100}</div>
            <div>{tmc.location}</div>
            <div>{tmc.comment}</div>
        </>
    );
}
