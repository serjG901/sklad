import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface Item {
    inventaryNumber: number;
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
    items: Item[];
    addItem: (newItem: Item) => void;
    deleteItem: (
        deleteInventaryNumber: number,
        deleteQuantity: number,
        deleteComment: string
    ) => void;
    systemMessages: SystemMessage[];
    addSystemMessage: (systemMessage: SystemMessage) => void;
}

function findItem(inventaryNumber: number, items: Item[]) {
    const index = items.findIndex(
        (item: Item) => inventaryNumber === item.inventaryNumber
    );
    return index === -1 ? null : items[index];
}

const useSkladStore = create<SkladState>()(
    devtools(
        persist(
            (set, get) => ({
                items: [],
                addItem: (newItem) =>
                    set((state) => {
                        const checkItem: null | Item = findItem(
                            newItem.inventaryNumber,
                            state.items
                        );
                        if (checkItem) return { items: state.items };
                        return { items: [...state.items, newItem] };
                    }),
                deleteItem: (
                    deleteInventaryNumber,
                    deleteQuantity,
                    deleteComment
                ) =>
                    set((state) => {
                        const checkItem: null | Item = findItem(
                            deleteInventaryNumber,
                            state.items
                        );

                        if (!checkItem) {
                            get().addSystemMessage({
                                message: `This item do not exist`,
                                comment: deleteComment,
                                datetime: Date.now(),
                                color: "red",
                            });
                            return { items: state.items };
                        } else {
                            if (checkItem.quantity < deleteQuantity) {
                                get().addSystemMessage({
                                    message: `<<${checkItem.name}>> has quantity (${checkItem.quantity}) less than you trying to delete (${deleteQuantity})`,
                                    comment: deleteComment,
                                    datetime: Date.now(),
                                    color: "red",
                                });
                                return { items: state.items };
                            } else if (checkItem.quantity === deleteQuantity) {
                                get().addSystemMessage({
                                    message: `Delete <<${checkItem.name}>> (all - ${checkItem.quantity})`,
                                    comment: deleteComment,
                                    datetime: Date.now(),
                                    color: "green",
                                });
                                return {
                                    items: state.items.filter(
                                        (item: Item) =>
                                            item.inventaryNumber !==
                                            deleteInventaryNumber
                                    ),
                                };
                            } else {
                                get().addSystemMessage({
                                    message: `Delete ${deleteQuantity} <<${
                                        checkItem.name
                                    }>> (stay on sklad: ${
                                        checkItem.quantity - deleteQuantity
                                    })`,
                                    comment: deleteComment,
                                    datetime: Date.now(),
                                    color: "green",
                                });
                                return {
                                    items: [
                                        ...state.items.filter(
                                            (item: Item) =>
                                                item.inventaryNumber !==
                                                deleteInventaryNumber
                                        ),
                                        {
                                            ...checkItem,
                                            quantity:
                                                checkItem.quantity -
                                                deleteQuantity,
                                        },
                                    ],
                                };
                            }
                        }
                        return { items: state.items };
                    }),
                systemMessages: [],
                addSystemMessage: (systemMessage: SystemMessage) =>
                    set((state) => ({
                        systemMessages: [
                            ...state.systemMessages,
                            systemMessage,
                        ],
                    })),
            }),
            { name: "sklad2" }
        )
    )
);

export default useSkladStore;
