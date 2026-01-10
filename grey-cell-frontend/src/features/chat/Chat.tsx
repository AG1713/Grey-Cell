import { Button } from "@/components/ui/button";
import TextareaAutosize from "react-textarea-autosize";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  fetchDiscussionHistory,
  sendMessageToBackend,
  type Message,
} from "./api/chatService";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useSelector } from "react-redux";
import type { RootState } from "@/state/store";

// This component IS the "children"
const Chat = () => {
  const [messages, setMessages] = useState<Message[]>();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const discussionId = useSelector(
    (state: RootState) => state.discussions.current
  );

  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Loading the history
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const history = await fetchDiscussionHistory(discussionId);
        setMessages(history);
      } catch (error) {
        console.error("Failed to fetch history:", error);
      }
    };
    loadHistory();
  }, [discussionId]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    try {
      const update = await sendMessageToBackend(discussionId, input, "gemini");

      setMessages((prev) => [...update, ...(prev || [])]);
    } catch (error) {
      console.error("Error sending message", error);
    } finally {
      setIsLoading(false);
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="bg-background text-foreground flex flex-col h-full w-full overflow-hidden">
      <div className="flex-none bg-background text-foreground flex justify-center border-border border-b p-4">
        <p>Discussion title</p>
      </div>

      <div
        className="flex-1 overflow-y-auto flex flex-col-reverse gap-2 px-4
          [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-secondary
          [&::-webkit-scrollbar-thumb]:rounded-full
          dark:[&::-webkit-scrollbar-thumb]:bg-muted"
      >
        {messages?.map((item, index) => (
          <div key={item.id} ref={index === 1 ? scrollRef : null}>
            {item.author === "user" && (
              <div className="flex justify-end">
                <span className="card bg-secondary rounded-md p-2 whitespace-pre-wrap">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {item.content}
                  </ReactMarkdown>
                </span>
              </div>
            )}
            {item.author === "gemini" && (
              <div
                className="
                  prose prose-zinc dark:prose-invert
                  max-w-none

                  prose-pre:bg-muted
                  prose-pre:rounded-md
                  prose-pre:p-3

                  prose-code:bg-muted
                  prose-code:rounded
                  prose-code:px-1
                  prose-code:before:content-none
                  prose-code:after:content-none

                  prose-h1:text-4xl
                  prose-h1:font-extrabold
                  prose-h1:mb-4

                  prose-h2:text-3xl
                  prose-h2:font-bold
                  prose-h2:mt-8

                  prose-h3:text-2xl
                  prose-h3:font-semibold
                "
              >
                {/* prose-pre attributes refer to code blocks. pre is a sub class of prose */}
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {item.content}
                </ReactMarkdown>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex-none flex flex-row justify-start items-end p-2">
        <TextareaAutosize
          id="textarea"
          value={input}
          autoCapitalize="sentences"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message here"
          className="w-full resize-none p-2 border-2 border-b-secondary rounded-md size-16 bg-secondary"
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
          onClick={sendMessage}
        >
          <Send size={16} />
        </Button>
      </div>
    </div>
  );
};

export default Chat;
