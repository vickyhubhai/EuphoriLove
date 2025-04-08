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
                reconnectionAttempts: 10,
                reconnectionDelay: 2000,
                timeout: 30000,
                autoConnect: true,
                withCredentials: true,
                forceNew: true,
                randomizationFactor: 0.5,
                reconnectionDelayMax: 5000,
                pingTimeout: 20000,
                pingInterval: 25000
            });

            socket.on("connect_error", (error) => {
                console.error("Socket connection error:", error);
                setTimeout(() => socket.connect(), 2000);
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
    const [userId, setUserId] = useState(null);
    const [roomUsers, setRoomUsers] = useState([]);
    const [videoId, setVideoId] = useState("");
    const [player, setPlayer] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [videoTitle, setVideoTitle] = useState("Unknown video");
    const [modal, setmodal] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [recordingTime, setRecordingTime] = useState(0);
    const [recordingWaveform, setRecordingWaveform] = useState([]);
    const [files, setFiles] = useState([]);
    const [previewFiles, setPreviewFiles] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const scroll = useRef();
    const notificationTone = useRef(null);
    const audioRef = useRef(null);
    const fileInputRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [typingUser, setTypingUser] = useState(null);
    const [currentAudio, setCurrentAudio] = useState(null);
    const [isMuted, setIsMuted] = useState(false);
    const [isDeafened, setIsDeafened] = useState(false);
    const [isVideoOn, setIsVideoOn] = useState(false);
    const [isScreenSharing, setIsScreenSharing] = useState(false);
    const [isHandRaised, setIsHandRaised] = useState(false);
    const [isReactionMenuOpen, setIsReactionMenuOpen] = useState(false);
    const [selectedMessageId, setSelectedMessageId] = useState(null);
    const [reactionMenuPosition, setReactionMenuPosition] = useState({ x: 0, y: 0 });
    const [reactions, setReactions] = useState({});
    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
    const [emojiPickerPosition, setEmojiPickerPosition] = useState({ x: 0, y: 0 });
    const [selectedEmojiMessageId, setSelectedEmojiMessageId] = useState(null);
    const [messageReactions, setMessageReactions] = useState({});
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [messageToDelete, setMessageToDelete] = useState(null);

    useEffect(() => {
        // Generate a unique user ID if not already set
        if (!userId) {
            setUserId(Date.now().toString());
        }
    }, [userId]);

    useEffect(() => {
        if (socket) {
            socket.on("receive-message", (data) => {
                setMessages((prev) => [...prev, data]);
            });

            socket.on("message-deleted", (data) => {
                setMessages((prev) => prev.filter(msg => msg.messageId !== data.messageId));
            });

            socket.on("user-joined", (data) => {
                setUsers((prev) => [...prev, data]);
            });

            socket.emit("join-room", roomId);

            return () => {
                socket.off("receive-message");
                socket.off("message-deleted");
                socket.off("user-joined");
            };
        }
    }, [socket, roomId]);

    useEffect(() => {
        if (!socket) return;

        socket.on("connect", () => {
            console.log("Connected to server");
        });
        socket.on("room-users", (users) => {
            setRoomUsers(users);
        });

        socket.on("play-video", (videoId, videoTitle) => {
            setVideoId(videoId);
            setVideoTitle(videoTitle);
            if (player) {
                player.loadVideoById(videoId);
                player.playVideo();
            }
            setIsPlaying(true);
        });

        socket.on("pause-video", () => {
            if (player) {
                player.pauseVideo();
            }
            setIsPlaying(false);
        });

        socket.on("video-state", (isPlaying) => {
            setIsPlaying(isPlaying);
            if (player) {
                isPlaying ? player.playVideo() : player.pauseVideo();
            }
        });

        return () => {
            socket.off("connect");
            socket.off("room-users");
            socket.off("play-video");
            socket.off("pause-video");
            socket.off("video-state");
        };
    }, [socket, player, roomId]);

    const searchYouTube = async (query) => {
        const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API;
        try {
            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${API_KEY}`
            );
            const data = await response.json();
            console.log(data);
            setSearchResults(data.items);
        } catch (error) {
            console.error("Error fetching YouTube data:", error);
        }
    };

    useEffect(() => {
        if (typeof window.YT === "undefined") {
            const script = document.createElement("script");
            script.src = "https://www.youtube.com/iframe_api";
            script.async = true;
            script.onload = () => {
                window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
            };
            document.body.appendChild(script);
        } else {
            window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
        }
    }, []);

    const onYouTubeIframeAPIReady = () => {
        if (videoId) {
            const newPlayer = new window.YT.Player("youtube-player", {
                height: "1",
                width: "1",
                videoId: videoId,
                playerVars: {
                    autoplay: 0,
                    controls: 0,
                    modestbranding: 1,
                    showinfo: 0,
                    fs: 0,
                    rel: 0,
                },
                events: {
                    onReady: (event) => {
                        setPlayer(event.target);
                        if (isPlaying) {
                            event.target.playVideo();
                        } else {
                            event.target.pauseVideo();
                        }
                    },
                    onStateChange: (event) => {
                        if (event.data === window.YT.PlayerState.PLAYING) {
                            setIsPlaying(true);
                        }
                        if (event.data === window.YT.PlayerState.PAUSED) {
                            setIsPlaying(false);
                        }
                    },
                },
            });
        }
    };

    useEffect(() => {
        if (videoId && typeof window.YT !== "undefined") {
            onYouTubeIframeAPIReady();
        }
    }, [videoId]);

    const handlePlayPause = () => {
        if (isPlaying) {
            socket.emit("pause-video", roomId);
            setIsPlaying(false);

            if (player) {
                player.pauseVideo();
            }
        } else {
            socket.emit("play-video", roomId, videoId, videoTitle);
            setVideoTitle(videoTitle);
            if (player) {
                player.playVideo();
            }
        }
        setIsPlaying(!isPlaying);
    };

    const handleVideoSelect = (videoId, videoTitle) => {
        setVideoId(videoId);
        setVideoTitle(videoTitle);
        socket.emit("play-video", roomId, videoId, videoTitle);
        if (player) {
            player.loadVideoById(videoId);
            player.playVideo();
        }
        setIsPlaying(true);
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);
            const audioChunks = [];
            
            recorder.ondataavailable = (e) => audioChunks.push(e.data);
            recorder.onstop = () => {
                const blob = new Blob(audioChunks, { type: 'audio/mp3' });
                setAudioBlob(blob);
                stream.getTracks().forEach(track => track.stop());
            };
            
            recorder.start();
            setMediaRecorder(recorder);
            setIsRecording(true);
            
            // Start recording timer
            const timer = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);
            
            return () => clearInterval(timer);
        } catch (error) {
            console.error("Error starting recording:", error);
        }
    };
    
    const stopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            setIsRecording(false);
            setRecordingTime(0);
        }
    };
    
    const sendMessage = (type = "text", content = "") => {
        if (!socket || !socket.connected) {
            console.error("Socket not connected - attempting to reconnect");
            socket?.connect();
            return;
        }

        // Stop recording if active when sending
        if (isRecording) {
            stopRecording();
        }

        if (type === "text" && message.trim()) {
            const data = { roomId, type, message: message.trim(), senderId: userId };
            socket.emit("send-message", data);
            console.log("Sending message:", data);
            setMessage("");
            
            if (notificationTone.current) {
                notificationTone.current.play().catch((err) => {
                    console.error("Error playing notification tone:", err);
                });
            }
        } else if (type === "media" && content) {
            const data = { roomId, type, content, senderId: userId };
            socket.emit("send-message", data);
        } else if (type === "audio" && audioBlob) {
            const reader = new FileReader();
            reader.onload = () => {
                const data = { roomId, type: "audio", content: reader.result, senderId: userId };
                socket.emit("send-message", data);
                setAudioBlob(null);
            };
            reader.readAsDataURL(audioBlob);
        } else if (type === "file" && content) {
            const data = { roomId, type: "file", content, senderId: userId, fileName: content.name };
            socket.emit("send-message", data);
            setFiles([]);
            setPreviewFiles([]);
        }
    };
    
    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length > 0) {
            setFiles(selectedFiles);
            const previews = selectedFiles.map(file => {
                return {
                    name: file.name,
                    preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
                    type: file.type
                };
            });
            setPreviewFiles(previews);
        }
    };
    
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };
    
    const handleDragLeave = () => {
        setIsDragging(false);
    };
    
    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFiles = Array.from(e.dataTransfer.files);
        if (droppedFiles.length > 0) {
            setFiles(droppedFiles);
            const previews = droppedFiles.map(file => {
                return {
                    name: file.name,
                    preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
                    type: file.type
                };
            });
            setPreviewFiles(previews);
        }
    };

    useEffect(() => {
        if (scroll.current) {
            scroll.current.scrollTop = scroll.current.scrollHeight;
        }
    }, [messages]);

    const handleDeleteMessage = (messageId) => {
        if (!socket || !roomId || !userId) return;
        
        socket.emit("delete-message", {
            roomId,
            messageId,
            senderId: userId
        });
    };

    const confirmDeleteMessage = (messageId) => {
        setMessageToDelete(messageId);
        setIsDeleteConfirmOpen(true);
    };

    const renderMessage = (msg, index) => {
        const isCurrentUser = msg.senderId === userId;
        const messageReactions = reactions[msg.messageId] || [];
        
        return (
            <div
                key={index}
                className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} mb-4`}
            >
                <div
                    className={`relative group max-w-[70%] ${
                        isCurrentUser ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                    } rounded-lg p-3`}
                >
                    {isCurrentUser && (
                        <div className="absolute -right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => confirmDeleteMessage(msg.messageId)}
                                className="p-1 text-gray-500 hover:text-red-500"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                </svg>
                            </button>
                        </div>
                    )}
                    {msg.type === "text" && msg.message}
                    {msg.type === "media" && (
                        <>
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
                    {msg.type === "audio" && (
                        <div className="flex items-center space-x-2">
                            <audio controls src={msg.content} className="max-w-full" />
                            <span className="text-sm text-white/80">Voice message</span>
                        </div>
                    )}
                    {msg.type === "file" && (
                        <div className="flex items-center space-x-2 p-2 bg-white/10 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 3.586L15.414 7A2 2 0 0116 8.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                            </svg>
                            <span className="text-white">{msg.fileName}</span>
                            <a href={msg.content} download className="ml-auto text-primary-400 hover:text-primary-500" target="_blank" rel="noopener noreferrer">
                                Download
                            </a>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="flex flex-col h-screen w-screen bg-background background-gradient text-white py-2 relative overflow-hidden" suppressHydrationWarning>
                <div className="fixed h-[800px] w-[800px] bg-primary-700/20 rounded-full blur-3xl -z-10 absolute bottom-0 -left-32" suppressHydrationWarning></div>
                <audio ref={notificationTone} src="/tone.mp3" preload="auto" />
                <div className="fixed h-[400px] w-[400px] bg-secondary-600/20 rounded-full blur-3xl -z-10 absolute top-0 -right-32" suppressHydrationWarning></div>
                <audio ref={audioRef} />
                
                <header className="glass-effect mx-auto rounded-xl py-3 px-5 max-w-screen-lg w-full flex justify-between items-center mb-4" suppressHydrationWarning>
                    <div className="flex items-center space-x-3" suppressHydrationWarning>
                        <Image src="/heart.png" alt="logo" width={35} height={35} className="floating-icon" />
                        <h1 className="text-xl font-semibold gradient-text">EuphoriLove</h1>
                    </div>
                    <div className="text-white font-medium text-center flex flex-col sm:flex-row sm:space-x-6 text-sm" suppressHydrationWarning>
                        <p className="flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary-400" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                            </svg>
                            <span suppressHydrationWarning>{roomUsers?.length || 0} users</span>
                        </p>
                        <p className="flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                            <span suppressHydrationWarning>Room: {roomId || "Unknown"}</span>
                        </p>
                    </div>
                </header>

                <div className="max-w-screen-lg w-full mx-auto rounded-xl relative z-10 px-4 lg:px-0 flex flex-col gap-5 h-[calc(100vh-150px)]" suppressHydrationWarning>
                    {/* Music Player */}
                    <div className="music-card flex w-full items-center justify-between py-3 px-5">
                        <div className="flex items-center space-x-3">
                            {videoId ? (
                                <div className="flex items-center space-x-3">
                                    <div className="h-10 w-10 bg-primary-600 rounded-full flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                                        </svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm text-white/80">Now Playing:</span>
                                        <span className="text-white font-medium truncate max-w-[180px] sm:max-w-[300px]">
                                            {videoTitle?.length > 30 ? videoTitle?.slice(0, 30) + "..." : videoTitle}
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <span className="text-white/70 italic">No music selected</span>
                            )}
                        </div>
                        <div className="flex items-center space-x-3">
                            {videoId && (
                                <button
                                    className={`p-3 rounded-full ${isPlaying ? "bg-primary-700 hover:bg-primary-800" : "bg-primary-600 hover:bg-primary-700"} transition-all`}
                                    onClick={handlePlayPause}
                                >
                                    {isPlaying ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </button>
                            )}
                            <button 
                                className="p-3 bg-secondary-600 hover:bg-secondary-700 rounded-full transition-all"
                                onClick={() => setmodal(true)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Hidden YouTube player */}
                    <div id="youtube-player" className="mb-4"></div>

                    {/* Chat */}
                    <div className="glass-effect flex-grow lg:h-[450px] h-[420px] overflow-y-scroll flex flex-col gap-4 py-5 px-4 lg:px-6 rounded-xl" ref={scroll}>
                        {!messages || messages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center">
                                <Image src="/heart.png" alt="Empty" width={60} height={60} className="opacity-50 mb-4" />
                                <p className="text-white/60">No messages yet. Start the conversation!</p>
                            </div>
                        ) : (
                            messages.map((msg, index) => renderMessage(msg, index))
                        )}
                    </div>

                    {/* Message input */}
                    <div className="flex flex-row items-center space-x-3 mb-4" onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            multiple
                        />
                        <button
                            onClick={() => isRecording ? stopRecording() : startRecording()}
                            className={`p-3 rounded-full ${isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-secondary-600 hover:bg-secondary-700'} transition-all flex items-center justify-center`}
                        >
                            {
                                isRecording ? (
                                    <div className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 animate-pulse" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-red-500 text-sm">{recordingTime}s</span>
                                        <div className="flex gap-1 items-center">
                                            {Array.from({length: 5}).map((_, i) => (
                                                <div 
                                                    key={i}
                                                    className="w-1 h-4 bg-red-500 rounded-full"
                                                    style={{
                                                        height: `${Math.random() * 12 + 4}px`,
                                                        transition: 'height 0.2s ease-in-out'
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                                    </svg>
                                )
                            }
                        </button>
                        <button
                            onClick={() => fileInputRef.current.click()}
                            className="p-3 bg-secondary-600 hover:bg-secondary-700 rounded-full transition-all"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage("text")}
                            placeholder="Type a message..."
                            className="input-primary w-full"
                        />
                        <button
                            onClick={() => {
                                if (audioBlob) {
                                    sendMessage("audio");
                                } else if (files.length > 0) {
                                    const reader = new FileReader();
                                    reader.onload = () => {
                                        sendMessage("file", { content: reader.result, name: files[0].name });
                                    };
                                    reader.readAsDataURL(files[0]);
                                } else {
                                    sendMessage("text");
                                }
                            }}
                            disabled={!message.trim() && !audioBlob && files.length === 0}
                            className="btn-primary h-full aspect-square !p-0 !px-0 flex items-center justify-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Search Modal */}
            {modal && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/80 backdrop-blur-sm z-50" suppressHydrationWarning>
                    <div className="glass-effect p-6 rounded-xl max-w-2xl w-full mx-4" suppressHydrationWarning>
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-semibold gradient-text">Add Music</h3>
                            <button className="text-white/70 hover:text-white transition-colors" onClick={() => setmodal(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        <div className="mb-6 flex items-center space-x-2">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && searchYouTube(searchQuery)}
                                placeholder="Search for music..."
                                className="input-primary w-full"
                            />
                            <button
                                onClick={() => searchYouTube(searchQuery)}
                                className="btn-primary h-full aspect-square !p-0 !px-0 flex items-center justify-center"
                                disabled={!searchQuery.trim()}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>

                        {/* Display search results */}
                        <div className="max-h-96 overflow-y-auto">
                            {!searchResults || searchResults.length === 0 ? (
                                <div className="text-center py-8 text-white/60">
                                    <p>Search for songs to play!</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {searchResults.map((video) => (
                                        <div key={video?.id?.videoId} className="music-card flex justify-between items-center">
                                            <div className="flex items-center space-x-3">
                                                {video?.snippet?.thumbnails?.default?.url && (
                                                    <img 
                                                        src={video.snippet.thumbnails.default.url} 
                                                        alt={video.snippet?.title || "Video thumbnail"}
                                                        className="w-12 h-12 object-cover rounded-md"
                                                    />
                                                )}
                                                <div className="text-white max-w-xs">
                                                    <p className="font-medium truncate">{video.snippet?.title || "Unknown title"}</p>
                                                    <p className="text-xs text-white/60 truncate">{video.snippet?.channelTitle || "Unknown channel"}</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    handleVideoSelect(video.id?.videoId, video.snippet?.title);
                                                    setmodal(false);
                                                }}
                                                className="btn-secondary !py-2 !px-4 text-sm flex items-center space-x-1"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                                </svg>
                                                <span>Play</span>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteConfirmOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                        <h3 className="text-lg font-semibold mb-4">Delete Message</h3>
                        <p className="text-gray-600 mb-6">Are you sure you want to delete this message? This action cannot be undone.</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setIsDeleteConfirmOpen(false)}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    handleDeleteMessage(messageToDelete);
                                    setIsDeleteConfirmOpen(false);
                                }}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

const ChatRoomWrapper = ({ roomId }) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return isClient ? <ChatRoom roomId={roomId} /> : null;
};

export default ChatRoomWrapper;