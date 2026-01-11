import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import TextareaAutosize from "react-textarea-autosize";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput = ({ onSendMessage, isLoading }: ChatInputProps) => {
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;
    await onSendMessage(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex-none flex flex-row justify-center items-end p-2">
      <TextareaAutosize
        id="textarea"
        value={input}
        autoCapitalize="sentences"
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message here"
        className="w-full max-w-3xl resize-none p-2 border-2 border-b-secondary rounded-md bg-secondary"
        rows={1}
        minRows={1}
        maxRows={6}
        disabled={isLoading}
      />
      <div className="w-2"></div>
      <Button
        type="submit"
        className="rounded-full h-11"
        disabled={isLoading}
        onClick={handleSend}
      >
        <Send size={16} />
      </Button>
    </div>
  );
};

export default ChatInput;
