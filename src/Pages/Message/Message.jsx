import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FiSend } from "react-icons/fi";
import profileImg from "../../assets/messages/profile.png";
import BASEURL from "../../../Constants";
import { MdOutlineDeleteOutline } from "react-icons/md";

const Message = () => {
  const [chatUser, setChatUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatInput, setChatInput] = useState("");

  const messageEndRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${BASEURL}/message/user/all`);
        setChatUsers(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load messages.");
        setLoading(false);
      }
    };

    fetchMessages();
  }, [selectedUser]);

  const handleReplyClick = (user) => {
    setSelectedUser(user);
    scrollToBottom();
  };

  const handleSendMessage = async () => {
    if (chatInput.trim()) {
      const tempMessage = {
        userEmail: selectedUser.email,
        sender: "admin",
        message: chatInput,
        createdAt: new Date().toISOString(),
      };

      setSelectedUser((prev) => ({
        ...prev,
        messages: [...prev.messages, tempMessage],
      }));

      setChatInput("");

      try {
        const response = await axios.post(
          `${BASEURL}/message/admin/send-message`,
          {
            chatUserEmail: selectedUser.email,
            message: chatInput,
          }
        );

        if (response.data.status !== "success") {
          console.error("Message not sent.");
        }
      } catch (err) {
        console.error("Error sending message:", err);
        setSelectedUser((prev) => ({
          ...prev,
          messages: prev.messages.filter((msg) => msg._id !== tempMessage._id),
        }));
      }
    }
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (selectedUser?.messages) {
      scrollToBottom();
    }
  }, [selectedUser?.messages]);

  const handleClearChatHistory = async () => {
    try {
      await axios.delete(`${BASEURL}/message/delete/all/${selectedUser.email}`);
      setSelectedUser(null);
    } catch (err) {
      console.error("Error clearing chat history:", err);
    }
  };

  return (
    <div className="p-5 bg-white rounded-md shadow-md pb-20">
      <h5 className="text-[#344767] border-b pb-3 font-semibold text-lg my-1 capitalize">
        All Messages
      </h5>
      <h5 className="text-[#344767] font-semibold text-lg my-1 capitalize">
        Conversations
      </h5>

      {loading && <p>Loading messages...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="flex flex-col gap-3">
        {!loading &&
          !error &&
          chatUser.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-14">
                <img src={item.img || profileImg} alt={item.fullName} />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-56">
                  <p className="text-[#344767] capitalize font-semibold">
                    {item.fullName || "Anonymous User"}
                  </p>
                  <p className="text-gray-400 font-semibold text-sm">
                    {item.email}
                  </p>
                </div>
                <span
                  className="text-[#E91F63] font-semibold cursor-pointer text-sm"
                  onClick={() => handleReplyClick(item)}
                >
                  REPLY
                </span>
              </div>
            </div>
          ))}
      </div>

      {/* Chat Box */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-5">
            <div className="flex justify-between items-center border-b pb-2">
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-[#344767]">
                  {selectedUser.fullName || "Anonymous User"}
                </h3>
                <h3 className="text-xs font-semibold text-[#344767]">
                  {selectedUser.email}
                </h3>
              </div>
              <div className="flex gap-6">
                <button
                  className="text-gray-500 text-lg font-semibold"
                  onClick={handleClearChatHistory}
                >
                  <span title="Clear chat history">
                    <MdOutlineDeleteOutline />
                  </span>
                </button>
                <button
                  className="text-gray-500 text-lg font-semibold text-red-500"
                  onClick={() => setSelectedUser(null)}
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-3 max-h-80 overflow-y-auto">
              {selectedUser.messages && selectedUser.messages.length > 0 ? (
                selectedUser.messages.map((msg, index) => (
                  <div
                    key={msg._id || index}
                    className="flex flex-col gap-1 relative group"
                  >
                    <div
                      className={`p-3 rounded-md ${
                        msg.sender === "admin"
                          ? "bg-blue-100 self-end text-right"
                          : "bg-gray-100 self-start"
                      }`}
                    >
                      <p className="text-sm text-gray-700">{msg.message}</p>
                    </div>

                    {/* Timestamp */}
                    <div
                      className={`text-xs text-gray-500 ${
                        msg.sender === "admin" ? "text-right" : "text-left"
                      }`}
                    >
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No previous messages.</p>
              )}
              <div ref={messageEndRef} />
            </div>

            <div className="mt-4 flex items-center gap-2">
              <input
                className="flex-1 rounded-md p-2 outline-none border focus:ring focus:ring-[#E91F63]"
                type="text"
                placeholder="Type your message..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
              <button
                className="bg-[#E91F63] text-white p-3 rounded-md hover:bg-[#c81d56]"
                onClick={handleSendMessage}
              >
                <FiSend className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
