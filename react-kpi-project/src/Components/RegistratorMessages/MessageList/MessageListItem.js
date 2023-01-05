import { tableLabelsMap } from "./MessageList.utils";
import { hiddenDisplayKeys } from "./MessageList.utils";

const MessageListItem = ({ message }) => {
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
        <button disabled={!(message.status==="Надіслано")}
            type="button"
                class="btn btn-dark w-50"
                onClick={()=>{
                    if(message.reason==="orgRegistration"){
                        window.location.href='/new-state-notary-department-page'
                    }
                    else if(message.reason === "newPosition" || message.reason === "notaryActivityRegistration"){
                        window.location.href='/new-private-notary-page'
                    }
                    localStorage.setItem("id", message.id);
                    const messages = localStorage.getItem("messages")
                    const obj_messages = JSON.parse(messages)
                    for(let i =0; i<obj_messages.length; i++){
                        if(obj_messages[i].id === message.id){
                            obj_messages[i].status = "Виконано"
                        }
                    }
                    localStorage.setItem("messages", JSON.stringify(obj_messages))}}
        >
            ВИКОНАТИ
        </button>
        <button disabled={!(message.status==="Надіслано")}
            type="button"
                class="btn btn-dark w-50"
        onClick={()=> {
            const messages = localStorage.getItem("messages")
            const obj_messages = JSON.parse(messages)
            for(let i =0; i<obj_messages.length; i++){
                if(obj_messages[i].id === message.id){
                    obj_messages[i].status = "Відхилено"
                }
            }
            localStorage.setItem("messages", JSON.stringify(obj_messages))
        }}>

            ВІДХИЛИТИ
        </button>
    </div>
  );
};

export default MessageListItem;
