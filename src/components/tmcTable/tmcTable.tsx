import TmcInTable from "../tmcInTable/tmcInTable";
import { Tmc } from "../../store/store";
import "./style.css";
import { useState } from "react";

interface TmcTable {
    tmcs: Tmc[];
    setUpdateTmcForIN: React.Dispatch<React.SetStateAction<number>>;
}

type SortByColumn =
    | "index"
    | "inventoryNumber"
    | "name"
    | "unit"
    | "quantity"
    | "price"
    | "location"
    | "comment";

export default function TmcTable({ tmcs, setUpdateTmcForIN }: TmcTable) {
    const [sortByColumn, setSortByColumn] = useState<SortByColumn>("index");
    const [sortDown, setSortDown] = useState<boolean>(false);

    const sortByType = (
        tmcs: Tmc[],
        sortByColumn: SortByColumn,
        sortDown: boolean
    ) => {
        if (sortByColumn === "index") {
            if (sortDown) return [...tmcs].reverse();
            return tmcs;
        }
        return [...tmcs].sort((tmc1: Tmc, tmc2: Tmc) => {
            if (sortDown)
                return tmc1[sortByColumn] > tmc2[sortByColumn] ? 1 : -1;
            return tmc1[sortByColumn] < tmc2[sortByColumn] ? 1 : -1;
        });
    };

    return (
        <div className='tmcTable'>
            <details>
                <summary>TMCs on SKLAD:</summary>
                <div className='grid'>
                    <div>
                        <button
                            type='button'
                            onClick={() => {
                                setSortDown(!sortDown);
                                setSortByColumn("index");
                            }}
                        >
                            №
                        </button>
                    </div>
                    <div>
                        <button
                            type='button'
                            onClick={() => {
                                setSortDown(!sortDown);
                                setSortByColumn("inventoryNumber");
                            }}
                        >
                            IN
                        </button>
                    </div>
                    <div>
                        <button
                            type='button'
                            onClick={() => {
                                setSortDown(!sortDown);
                                setSortByColumn("name");
                            }}
                        >
                            Name
                        </button>
                    </div>
                    <div>
                        <button
                            type='button'
                            onClick={() => {
                                setSortDown(!sortDown);
                                setSortByColumn("unit");
                            }}
                        >
                            Unit
                        </button>
                    </div>
                    <div>
                        <button
                            type='button'
                            onClick={() => {
                                setSortDown(!sortDown);
                                setSortByColumn("quantity");
                            }}
                        >
                            Quantity
                        </button>
                    </div>
                    <div>
                        <button
                            type='button'
                            onClick={() => {
                                setSortDown(!sortDown);
                                setSortByColumn("price");
                            }}
                        >
                            Price
                        </button>
                    </div>
                    <div>Cost</div>
                    <div>
                        <button
                            type='button'
                            onClick={() => {
                                setSortDown(!sortDown);
                                setSortByColumn("location");
                            }}
                        >
                            Location
                        </button>
                    </div>
                    <div>
                        <button
                            type='button'
                            onClick={() => {
                                setSortDown(!sortDown);
                                setSortByColumn("comment");
                            }}
                        >
                            Comment
                        </button>
                    </div>
                    {sortByType(tmcs, sortByColumn, sortDown).map(
                        (tmc: Tmc, index: number) => (
                            <TmcInTable
                                key={tmc.inventoryNumber}
                                tmc={tmc}
                                index={index}
                                setUpdateTmcForIN={setUpdateTmcForIN}
                            />
                        )
                    )}
                </div>
            </details>
        </div>
    );
}
