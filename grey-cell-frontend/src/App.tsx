import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Plus } from "lucide-react"; // Icons
import Layout from "./features/sidebar/Layout";
import Chat from "./features/chat/Chat";

export default function App() {
  // 1. State to handle the input and messages
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "ai",
      content: "Hello! I am your AI assistant. How can I help you today?",
    },
  ]);

  // 2. Function to handle sending a message
  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate AI response (You will replace this with real API later)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: "I am a hardcoded response for now! Connect me to an API.",
        },
      ]);
    }, 1000);
  };

  return <div></div>;

  return (
    // MAIN CONTAINER: Full height (h-screen), dark background
    <div className="flex h-screen bg-zinc-900 text-zinc-100 font-sans">
      {/* --- SIDEBAR (History) --- */}
      <div className="w-64 bg-zinc-950 p-4 border-r border-zinc-800 flex-col hidden md:flex">
        <Button
          variant="outline"
          className="w-full justify-start gap-2 bg-zinc-900 border-zinc-700 hover:bg-zinc-800 hover:text-white mb-4"
        >
          <Plus size={16} /> New Chat
        </Button>

        <div className="flex-1 overflow-y-auto space-y-2">
          {/* Mock History Items */}
          {["React Project Help", "What is Tailwind?", "Dinner Recipes"].map(
            (item, i) => (
              <button
                key={i}
                className="w-full text-left px-3 py-2 rounded-md text-sm text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 transition-colors"
              >
                {item}
              </button>
            )
          )}
        </div>
      </div>

      {/* --- MAIN CHAT AREA --- */}
      <div className="flex-1 flex flex-col relative">
        {/* HEADER */}
        <header className="h-14 border-b border-zinc-800 flex items-center px-6 bg-zinc-950/50 backdrop-blur">
          <h1 className="text-sm font-medium text-zinc-200">Gemini Clone</h1>
        </header>

        {/* MESSAGES LIST (Scrollable) */}
        <ScrollArea className="flex-1 p-4">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-4 ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {/* AI Avatar (Only show on left) */}
                {msg.role === "ai" && (
                  <Avatar className="h-8 w-8 border border-zinc-700">
                    <AvatarImage src="/ai-avatar.png" />
                    <AvatarFallback className="bg-zinc-800 text-blue-400">
                      <Bot size={18} />
                    </AvatarFallback>
                  </Avatar>
                )}

                {/* Message Bubble */}
                <div
                  className={`rounded-2xl px-4 py-2 max-w-[80%] text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-zinc-800 text-zinc-100 border border-zinc-700"
                  }`}
                >
                  {msg.content}
                </div>

                {/* User Avatar (Only show on right) */}
                {msg.role === "user" && (
                  <Avatar className="h-8 w-8 border border-zinc-700">
                    <AvatarFallback className="bg-zinc-800 text-zinc-400">
                      <User size={18} />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* INPUT AREA (Fixed at bottom) */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-950">
          <div className="max-w-3xl mx-auto relative flex items-end gap-2 bg-zinc-900 p-2 rounded-xl border border-zinc-700 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message Gemini..."
              className="min-h-[20px] max-h-[200px] border-none focus-visible:ring-0 bg-transparent text-zinc-100 resize-none py-3"
            />
            <Button
              onClick={handleSend}
              size="icon"
              className="mb-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg h-8 w-8"
            >
              <Send size={16} />
            </Button>
          </div>
          <p className="text-center text-xs text-zinc-500 mt-2">
            AI can make mistakes. Check important info.
          </p>
        </div>
      </div>
    </div>
  );
}
