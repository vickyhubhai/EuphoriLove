"use client";
import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

const ChatRoom = ({ roomId }) => {
    const socket = useMemo(() => {
        try {
            const socket = io("https://lovetunes-2.onrender.com", {
                transports: ['websocket', 'polling'],
                reconnectionAttempts: 5,
                reconnectionDelay: 1000,
                reconnectionDelayMax: 5000,
                timeout: 45000,
                pingTimeout: 60000,
                pingInterval: 25000,
                autoConnect: true,
                forceNew: true
            });

            socket.on("connect_error", (error) => {
                console.error("Socket connection error:", error);
            });

            socket.on("reconnect_attempt", (attemptNumber) => {
                console.log(`Reconnection attempt ${attemptNumber}`);
            });

            socket.on("reconnect_failed", () => {
                console.error("Failed to reconnect to server");
            });

            return socket;
        } catch (error) {
            console.error("Socket initialization error:", error);
            return null;
        }
    }, []);
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [userId, setUserId] = useState("");
    const [roomUsers, setRoomUsers] = useState([]);
    const [videoId, setVideoId] = useState("");
    const [player, setPlayer] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [videoTitle, setVideoTitle] = useState("Unknown video");
    const [isRecording, setIsRecording] = useState(false);
    const [audioStream, setAudioStream] = useState(null);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const fileInputRef = useRef(null);
    const scroll = useRef()
    const [modal, setmodal] = useState(false);
    const [reactions, setReactions] = useState({});
    const [userAvatar, setUserAvatar] = useState("/heart.png");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [selectedMessageId, setSelectedMessageId] = useState(null);

    const addReaction = (messageId, emoji) => {
        setReactions(prev => ({
            ...prev,
            [messageId]: [...(prev[messageId] || []), { emoji, userId }]
        }));
        socket.emit("add-reaction", { messageId, emoji, userId, roomId });
        setShowEmojiPicker(false);
    };

    useEffect(() => {
        if (!socket) return;
        socket.on("reaction-added", ({ messageId, emoji, userId }) => {
            setReactions(prev => ({
                ...prev,
                [messageId]: [...(prev[messageId] || []), { emoji, userId }]
            }));
        });
        return () => socket.off("reaction-added");
    }, [socket]);

    const notificationTone = useRef(null);

    useEffect(() => {
        const id = uuidv4();
        setUserId(id);
    }, []);

    useEffect(() => {
        if (!socket) return;

        socket.on("connect", () => {
            console.log("Connected to server");
        });
        socket.on("receive-message", (data) => {
            console.log("Received message:", data);
            setChat((prev) => [...prev, data]);
            if (notificationTone.current) {
                notificationTone.current.play().catch((err) => {
                    console.error("Error playing notification tone:", err);
                });
            }
        });

        socket.emit("join-room", roomId);

        return () => {
            socket.off("connect");
            socket.off("receive-message");
        };
    }, [socket, roomId]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            setAudioStream(stream);
            const recorder = new MediaRecorder(stream);
            setMediaRecorder(recorder);
            setAudioChunks([]);

            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    setAudioChunks((chunks) => [...chunks, e.data]);
                }
            };

            recorder.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                const audioUrl = URL.createObjectURL(audioBlob);
                sendMessage("voice", audioUrl);
            };

            recorder.start();
            setIsRecording(true);
        } catch (error) {
            console.error("Error accessing microphone:", error);
        }
    };

    const stopRecording = () => {
        if (mediaRecorder && isRecording) {
            mediaRecorder.stop();
            audioStream.getTracks().forEach(track => track.stop());
            setIsRecording(false);
        }
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                sendMessage("file", {
                    name: file.name,
                    type: file.type,
                    data: e.target.result
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const sendMessage = (type = "text", content = "") => {
        if (!socket?.connected) {
            console.error("Socket not connected");
            return;
        }

        if (type === "text" && message.trim()) {
            const data = { roomId, type, message: message.trim(), senderId: userId };
            socket.emit("send-message", data);
            console.log("Sending message:", data);
            setMessage(""); // Reset the input
        } else if ((type === "media" || type === "voice" || type === "file") && content) {
            const data = { roomId, type, content, senderId: userId };
            socket.emit("send-message", data);
        }
    };

    useEffect(() => {
        if (scroll.current) {
            scroll.current.scrollTop = scroll.current.scrollHeight;
        }
    }, [chat]);

    return (
        <>
            <div className="flex flex-col h-screen w-screen bg-background background-gradient text-white py-2 relative overflow-hidden" suppressHydrationWarning>
                <audio loop autoPlay className="hidden" src="/background-music.mp3" />
                <div className="fixed h-[800px] w-[800px] bg-primary-700/30 rounded-full blur-3xl -z-10 absolute bottom-0 -left-32" suppressHydrationWarning></div>
                <div className="fixed h-[400px] w-[400px] bg-secondary-600/30 rounded-full blur-3xl -z-10 absolute top-0 -right-32" suppressHydrationWarning></div>
                <div className="fixed h-[800px] w-[800px] bg-primary-700/20 rounded-full blur-3xl -z-10 absolute bottom-0 -left-32" suppressHydrationWarning></div>
                <audio ref={notificationTone} src="/tone.mp3" preload="auto" />
                <div className="fixed h-[400px] w-[400px] bg-secondary-600/20 rounded-full blur-3xl -z-10 absolute top-0 -right-32" suppressHydrationWarning></div>
                
                <header className="glass-effect mx-auto rounded-xl py-3 px-5 max-w-screen-lg w-full flex justify-between items-center mb-4" suppressHydrationWarning>
                    <div className="flex items-center space-x-3">
                        <Image src="/heart.png" alt="logo" width={35} height={35} className="floating-icon" />
                        <h1 className="text-xl font-semibold gradient-text">EuphoriLove</h1>
                    </div>
                    <div className="text-white font-medium text-center flex flex-col sm:flex-row sm:space-x-6 text-sm text-shadow-dark">
                        <p className="flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary-400" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                            </svg>
                            <span>{roomUsers?.length || 0} users</span>
                        </p>
                        <p className="flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                            <span>Room: {roomId || "Unknown"}</span>
                        </p>
                    </div>
                </header>

                <div className="max-w-screen-lg w-full mx-auto rounded-xl relative z-10 px-4 lg:px-0 flex flex-col gap-5 h-[calc(100vh-150px)]" suppressHydrationWarning>
                    {/* Main Content */}
                    <div className="flex-grow flex flex-col gap-5">

                    {/* Chat */}
                    <div className="glass-effect flex-grow lg:h-[450px] h-[420px] overflow-y-scroll flex flex-col gap-4 py-5 px-4 lg:px-6 rounded-xl" ref={scroll}>
                        {!chat || chat.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center">
                                <Image src="/heart.png" alt="Empty" width={60} height={60} className="opacity-50 mb-4" />
                                <p className="text-white/80 text-shadow">No messages yet. Start the conversation!</p>
                            </div>
                        ) : (
                            chat.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center relative group ${msg.senderId === userId ? "justify-end" : "justify-start"}`}
                                    onMouseEnter={() => setSelectedMessageId(index)}
                                    onMouseLeave={() => setSelectedMessageId(null)}
                                >
                                    {msg.senderId !== userId && (
                                        <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center mr-2">
                                            <Image
                                                src={userAvatar}
                                                alt="User"
                                                width={20}
                                                height={20}
                                                className="rounded-full"
                                            />
                                        </div>
                                    )}
                                    <div
                                        className={`py-3 px-4 max-w-xs rounded-2xl backdrop-blur-md border border-white/20 shadow-lg transition-all duration-300 hover:scale-[1.02] ${
                                            msg.senderId === userId 
                                                ? "bg-gradient-to-r from-purple-600/20 to-pink-600/20" 
                                                : "bg-gradient-to-r from-indigo-600/20 to-purple-600/20"
                                        }`}
                                    >
                                        {msg.type === "text" && msg.message}
                                        {(msg.type === "media" || msg.type === "voice" || msg.type === "file") && (
                                            <>
                                                {msg.type === "voice" && (
                                                    <audio controls className="max-w-full">
                                                        <source src={msg.content} type="audio/webm" />
                                                        Your browser does not support the audio element.
                                                    </audio>
                                                )}

                                                {msg.type === "file" && (
                                                    <div className="flex items-center space-x-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
                                                        </svg>
                                                        <a href={msg.content.data} download={msg.content.name} className="text-blue-400 hover:text-blue-300 underline">
                                                            {msg.content.name}
                                                        </a>
                                                    </div>
                                                )}

                                                {msg.content?.startsWith("data:image") && (
                                                    <img src={msg.content} alt="Shared media" className="max-w-full rounded-lg" />
                                                )}

                                                {msg.content?.startsWith("data:video") && (
                                                    <video controls className="max-w-full rounded-lg">
                                                        <source src={msg.content} type="video/mp4" />
                                                        Your browser does not support the video tag.
                                                    </video>
                                                )}

                                                {msg.content?.startsWith("blob:") && (
                                                    <>
                                                        {msg.content?.includes("image") ? (
                                                            <img src={msg.content} alt="Shared media" className="max-w-full rounded-lg" />
                                                        ) : msg.content?.includes("video") ? (
                                                            <video controls className="max-w-full rounded-lg">
                                                                <source src={msg.content} type="video/mp4" />
                                                                Your browser does not support the video tag.
                                                            </video>
                                                        ) : null}
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </div>
                                    {selectedMessageId === index && (
                                        <div className="absolute -top-8 left-0 backdrop-blur-md bg-white/10 border border-white/20 rounded-lg p-1.5 shadow-lg z-20 flex space-x-2 transition-all duration-300">
                                            <button onClick={() => addReaction(index, "❤️")} className="hover:bg-white/20 p-1.5 rounded-lg transition-all duration-300">❤️</button>
                                            <button onClick={() => addReaction(index, "👍")} className="hover:bg-white/20 p-1.5 rounded-lg transition-all duration-300">👍</button>
                                            <button onClick={() => addReaction(index, "🎵")} className="hover:bg-white/20 p-1.5 rounded-lg transition-all duration-300">🎵</button>
                                            <button onClick={() => addReaction(index, "🔥")} className="hover:bg-white/20 p-1.5 rounded-lg transition-all duration-300">🔥</button>
                                        </div>
                                    )}
                                    {reactions[index] && reactions[index].length > 0 && (
                                        <div className="absolute -bottom-6 left-0 backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-2.5 py-1.5 text-sm flex space-x-1.5 shadow-lg transition-all duration-300">
                                            {reactions[index].map((reaction, i) => (
                                                <span key={i}>{reaction.emoji}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>

                    {/* Message input */}
                    <div className="flex flex-row items-center space-x-3 mb-4">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage("text")}
                            placeholder="Type a message..."
                            className="input-primary w-full"
                        />
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            className="hidden"
                        />
                        <button
                            onClick={() => fileInputRef.current.click()}
                            className="h-12 aspect-square rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <button
                            onClick={isRecording ? stopRecording : startRecording}
                            className={`btn-primary h-full aspect-square !p-0 !px-0 flex items-center justify-center ${isRecording ? 'bg-red-500' : ''}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <button
                            onClick={() => sendMessage("text")}
                            disabled={!message.trim()}
                            className="h-12 aspect-square rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                            </svg>
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatRoom;
