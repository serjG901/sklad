import { SystemMessage } from "../../store/store";

interface SystemMessageInTable {
    systemMessage: SystemMessage;
    index: number;
    deleteMessage: (datetime: number) => void;
}

export default function SystemMessageInTable({
    systemMessage,
    index,
    deleteMessage,
}: SystemMessageInTable) {
    const handleDeleteMessage = () => deleteMessage(systemMessage.datetime);
    return (
        <>
            <div>{index + 1}</div>
            <div className={systemMessage.color}>{systemMessage.message}</div>
            <div>{systemMessage.comment}</div>
            <div>{new Date(systemMessage.datetime).toLocaleString()}</div>
            <div>
                <button type='button' onClick={handleDeleteMessage}>
                    delete
                </button>
            </div>
        </>
    );
}
