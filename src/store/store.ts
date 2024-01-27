import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface Tmc {
    inventoryNumber: number;
    name: string;
    unit: string;
    quantity: number;
    price: number;
    location: string;
    comment: string;
}

export interface SystemMessage {
    message: string;
    comment: string;
    datetime: number;
    color: "red" | "orange" | "green";
}

export interface SkladState {
    tmcs: Tmc[];
    addTmc: (newTmc: Tmc) => void;
    deleteTmc: (
        deleteInventoryNumber: number,
        deleteQuantity: number,
        deleteComment: string
    ) => void;
    toUpdateTmc: (inventoryNumber: number, updateTmc: Tmc) => void;
    systemMessages: SystemMessage[];
    addSystemMessage: (systemMessage: SystemMessage) => void;
    deleteMessage: (datetime: number) => void;
}

function findTmc(inventoryNumber: number, tmcs: Tmc[]) {
    const index = tmcs.findIndex(
        (tmc: Tmc) => inventoryNumber === tmc.inventoryNumber
    );
    return index === -1 ? null : tmcs[index];
}

const useSkladStore = create<SkladState>()(
    devtools(
        persist(
            (set, get) => ({
                tmcs: [],
                addTmc: (newTmc) =>
                    set((state) => {
                        const checkTmc: null | Tmc = findTmc(
                            newTmc.inventoryNumber,
                            state.tmcs
                        );
                        if (checkTmc) return { itmcs: state.tmcs };
                        return { tmcs: [...state.tmcs, newTmc] };
                    }),
                deleteTmc: (
                    deleteInventoryNumber,
                    deleteQuantity,
                    deleteComment
                ) =>
                    set((state) => {
                        const checkTmc: null | Tmc = findTmc(
                            deleteInventoryNumber,
                            state.tmcs
                        );

                        if (!checkTmc) {
                            get().addSystemMessage({
                                message: `This tmc [IN:${deleteInventoryNumber}] do not exist`,
                                comment: deleteComment,
                                datetime: Date.now(),
                                color: "red",
                            });
                            return { tmcs: state.tmcs };
                        } else {
                            if (checkTmc.quantity < deleteQuantity) {
                                get().addSystemMessage({
                                    message: `<<${checkTmc.name}>> has quantity (${checkTmc.quantity}) less than you trying to delete (${deleteQuantity})`,
                                    comment: deleteComment,
                                    datetime: Date.now(),
                                    color: "red",
                                });
                                return { tmcs: state.tmcs };
                            } else if (checkTmc.quantity === deleteQuantity) {
                                get().addSystemMessage({
                                    message: `Delete <<${checkTmc.name}>> (all - ${checkTmc.quantity})`,
                                    comment: deleteComment,
                                    datetime: Date.now(),
                                    color: "green",
                                });
                                return {
                                    tmcs: state.tmcs.filter(
                                        (tmc: Tmc) =>
                                            tmc.inventoryNumber !==
                                            deleteInventoryNumber
                                    ),
                                };
                            } else {
                                get().addSystemMessage({
                                    message: `Delete ${deleteQuantity} <<${
                                        checkTmc.name
                                    }>> (stay on sklad: ${
                                        checkTmc.quantity - deleteQuantity
                                    })`,
                                    comment: deleteComment,
                                    datetime: Date.now(),
                                    color: "green",
                                });
                                return {
                                    tmcs: [
                                        ...state.tmcs.filter(
                                            (tmc: Tmc) =>
                                                tmc.inventoryNumber !==
                                                deleteInventoryNumber
                                        ),
                                        {
                                            ...checkTmc,
                                            quantity:
                                                checkTmc.quantity -
                                                deleteQuantity,
                                        },
                                    ],
                                };
                            }
                        }
                    }),
                toUpdateTmc: (inventoryNumber, updateTmc) =>
                    set((state) => ({
                        tmcs: [
                            ...state.tmcs.filter(
                                (tmc: Tmc) =>
                                    tmc.inventoryNumber !== inventoryNumber
                            ),
                            {
                                ...updateTmc,
                            },
                        ],
                    })),
                systemMessages: [],
                addSystemMessage: (systemMessage: SystemMessage) =>
                    set((state) => ({
                        systemMessages: [
                            ...state.systemMessages,
                            systemMessage,
                        ],
                    })),
                deleteMessage: (datetime: number) =>
                    set((state) => ({
                        systemMessages: [
                            ...state.systemMessages.filter(
                                (systemMessage: SystemMessage) =>
                                    systemMessage.datetime !== datetime
                            ),
                        ],
                    })),
            }),
            { name: "sklad6" }
        )
    )
);

export default useSkladStore;
