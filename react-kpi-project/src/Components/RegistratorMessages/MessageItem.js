import { tableLabelsMap } from "./MessageList/MessageList.utils";
import { hiddenDisplayKeys } from "./MessageList/MessageList.utils";

const MessageItem = ({ message }) => {
    console.log('message:', message)
    const tableKeysMap = tableLabelsMap[message.type] || {};
    const displayTable = Object.entries(message).reduce(
        (res, [messageKey, value]) => ({
            ...res,
            [messageKey]: {
                translated: tableKeysMap[messageKey],
                value,
            },
        }),
        {}
    );

    return (
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
                <button
                    class="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#${message.id}`}
                    aria-expanded="true"
                    aria-controls={message.id}
                >
                    #{displayTable?.id?.value} <br />
                    <br />
                    {displayTable.type?.translated}
                </button>
            </h2>
            <div
                id={message.id}
                class="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
            >
                <div class="accordion-body">
                    {Object.entries(displayTable).map(
                        ([key, { translated, value }]) =>
                            translated &&
                            value &&
                            !hiddenDisplayKeys.includes(key) && (
                                <p>
                                    {translated}: {value}
                                </p>
                            )
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessageItem;
