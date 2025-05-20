"use client";
import { useEffect, useRef, useState } from "react";
import socket from "@/utils/socket";

export default function Room({ params }: { params: { roomId: string } }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.emit("join_room", params.roomId);

    socket.on("play", () => {
      videoRef.current?.play();
    });

    socket.on("pause", () => {
      videoRef.current?.pause();
    });

    socket.on("chat", (msg: string) => {
      setChatMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("play");
      socket.off("pause");
      socket.off("chat");
    };
  }, [params.roomId]);

  const handlePlay = () => {
    socket.emit("play", params.roomId);
  };

  const handlePause = () => {
    socket.emit("pause", params.roomId);
  };

  const sendMessage = () => {
    socket.emit("chat", { roomId: params.roomId, msg: input });
    setInput("");
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Room: {params.roomId}</h1>

      <video
        ref={videoRef}
        width={600}
        controls
        onPlay={handlePlay}
        onPause={handlePause}
        src="/sample.mp4"
      />

      <div className="mt-4">
        <h2 className="text-lg font-semibold">Chat</h2>
        <div className="bg-gray-100 h-40 overflow-y-auto p-2 mb-2">
          {chatMessages.map((msg, idx) => (
            <div key={idx}>{msg}</div>
          ))}
        </div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type message..."
          className="border px-2 py-1"
        />
        <button
          onClick={sendMessage}
          className="ml-2 px-3 py-1 bg-blue-600 text-white rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
