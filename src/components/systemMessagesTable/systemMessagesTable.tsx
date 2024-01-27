import { useState } from "react";
import { SystemMessage } from "../../store/store";
import "./style.css";
import SystemMessageInTable from "../systemMessageInTable/systemMessageInTable";

interface SystemMessagesTable {
    systemMessages: SystemMessage[];
    deleteMessage: (datetime: number) => void;
}

type SortByColumn = "index" | "message" | "comment" | "datetime";

export default function SystemMessageTable({
    systemMessages,
    deleteMessage,
}: SystemMessagesTable) {
    const [sortByColumn, setSortByColumn] = useState<SortByColumn>("index");
    const [sortDown, setSortDown] = useState<boolean>(false);

    const sortByType = (
        systemMessages: SystemMessage[],
        sortByColumn: SortByColumn,
        sortDown: boolean
    ) => {
        if (sortByColumn === "index") {
            if (sortDown) return [...systemMessages].reverse();
            return systemMessages;
        }
        return [...systemMessages].sort(
            (sm1: SystemMessage, sm2: SystemMessage) => {
                if (sortDown)
                    return sm1[sortByColumn] > sm2[sortByColumn] ? 1 : -1;
                return sm1[sortByColumn] < sm2[sortByColumn] ? 1 : -1;
            }
        );
    };
    return (
        <div className='systemMessagesTable'>
            <details>
                <summary>SystemMessages:</summary>
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
                                setSortByColumn("message");
                            }}
                        >
                            Message
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
                    <div>
                        <button
                            type='button'
                            onClick={() => {
                                setSortDown(!sortDown);
                                setSortByColumn("datetime");
                            }}
                        >
                            DateTime
                        </button>
                    </div>
                    <div>action</div>
                    {sortByType(systemMessages, sortByColumn, sortDown)
                        .map((systemMessage: SystemMessage, index: number) => (
                            <SystemMessageInTable
                                key={systemMessage.datetime}
                                systemMessage={systemMessage}
                                index={index}
                                deleteMessage={deleteMessage}
                            />
                        ))
                        .reverse()}
                </div>
            </details>
        </div>
    );
}
