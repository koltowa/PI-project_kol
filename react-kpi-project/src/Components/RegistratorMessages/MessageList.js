import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../redux/actions";
import MessageListItem from "./MessageItem";

const MessageList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.updateMessageList());
    }, []);

    const messages = useSelector((state) => state.message.messages);

    const getListItems = () => {
        if (!!messages?.length) {
            return messages.map((message) => {
                return <MessageListItem message={message} />;
            });
        } else {
            return <h4>Повідомлення відсутні</h4>;
        }
    };

    return (
        <div className="container-md mt-1">
            <div className="card bg-dark">
                <div className="card-body bg-light m-1">
                    <h2>Сторінка повідомлень</h2>
                    <hr class="dropdown-divider mb-3 mt-3" />
                    <div class="accordion" id="accordionExample">
                        {getListItems()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessageList;
