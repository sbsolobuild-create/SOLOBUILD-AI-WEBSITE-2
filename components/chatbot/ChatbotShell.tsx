"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatSidebar from "./ChatSidebar";
import ChatWindow from "./ChatWindow";
import ContextPanel from "./ContextPanel";
import { createConversation, getChatbotContext, getSolution, getSolutionIdForContext, RECENT_CHATS } from "./data";
import { ChatMessage, SolutionId } from "./types";

export default function ChatbotShell({
  compact = false,
  light = false,
  fullHeight = false,
  mode = "full",
}: {
  compact?: boolean;
  light?: boolean;
  fullHeight?: boolean;
  mode?: "preview" | "full";
}) {
  const isPreview = mode === "preview";
  const router = useRouter();
  const searchParams = useSearchParams();
  const contextParam = searchParams.get("context");
  const requestedContext = getChatbotContext(contextParam);
  const initialContext = requestedContext && (requestedContext.id === "talent-acquisition" || ["sales", "support", "it"].includes(requestedContext.groupId))
    ? requestedContext
    : null;
  const initialContextId = initialContext?.id ?? null;
  const initialSolutionId = getSolutionIdForContext(initialContextId);
  const [selectedSolution, setSelectedSolution] = useState<SolutionId>(initialSolutionId);
  const [selectedContextId, setSelectedContextId] = useState<string | null>(initialContextId);

  useEffect(() => {
    if (isPreview) return;

    const target = selectedContextId ? `/assistant?context=${selectedContextId}` : "/assistant";
    const current = `${window.location.pathname}${window.location.search}`;

    if (current !== target) {
      router.replace(target, { scroll: false });
    }
  }, [selectedContextId, isPreview, router]);
  const [selectedChat, setSelectedChat] = useState<string | null>(initialContextId ? null : "hr-tasks");
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    createConversation(getSolution(initialSolutionId))
  );
  const [loading, setLoading] = useState(false);
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const solution = getSolution(selectedSolution);

  function selectSolution(solutionId: SolutionId, contextId: string | null = null) {
    if (isPreview) {
      const resolvedContext =
        contextId ??
        (solutionId === "support" ? "customer-support" : solutionId === "sales" ? "sales" : solutionId === "it" ? "it" : null);

      if (resolvedContext) {
        router.push(`/assistant?context=${resolvedContext}`);
      } else {
        router.push("/assistant");
      }
      return;
    }

    setSelectedSolution(solutionId);
    setSelectedContextId(contextId);
    setSelectedChat(null);
    setMessages(createConversation(getSolution(solutionId)));
    setSidebarOpen(false);
  }

  function resetContext() {
    setSelectedContextId(null);
    setSelectedSolution("hr");
    setSelectedChat(null);
    setMessages(createConversation(getSolution("hr")));
    setSidebarOpen(false);
  }

  function selectChat(chatId: string) {
    const chat = RECENT_CHATS.find((item) => item.id === chatId);
    if (!chat) return;
    setSelectedSolution(chat.solutionId);
    setSelectedContextId(null);
    setSelectedChat(chat.id);
    setMessages(createConversation(getSolution(chat.solutionId)));
    setSidebarOpen(false);
  }

  function newChat() {
    setSelectedChat(null);
    if (selectedContextId) {
      const activeContext = selectedContextId;
      const activeSolution = getSolutionIdForContext(activeContext);
      setSelectedSolution(activeSolution);
      setMessages(createConversation(getSolution(activeSolution)));
    } else {
      setMessages([]);
    }
    setSidebarOpen(false);
  }

  // The chatbot is a frontend-only interactive demonstration.
  // It uses pre-built demo responses to illustrate the assistant UX.
  // No API endpoint is called here; responses are generated from demo data.
  function submitMessage(content: string) {
    const activeSolution = getSolution(selectedSolution);
    setMessages((current) => [
      ...current,
      { id: `${Date.now()}-user`, role: "user", content },
    ]);
    setIsUserTyping(false);
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setMessages((current) => [
        ...current,
        {
          id: `${Date.now()}-assistant`,
          role: "assistant",
          content: `I can help with that in ${activeSolution.name}. I reviewed the available demo context and prepared the next steps for you.`,
          summary: activeSolution.summary.slice(0, 3),
          showActivity: true,
        },
      ]);
    }, 700);
  }

  function runAction(action: string) {
    submitMessage(action);
  }

  // Shell bg: light = white, dark = original #080808
  const shellBg     = light ? "bg-white"          : "bg-[#080808]";
  const shellBorder = light ? "border-slate-200"   : "border-white/12";
  const backdropBg  = light ? "bg-slate-900/30"    : "bg-black/60";

  return (
    <div
      className={`relative flex overflow-hidden border ${shellBorder} ${shellBg} text-white ${
        compact
          ? "h-[600px] rounded-2xl shadow-[0_4px_32px_rgba(0,0,0,0.22),0_0_0_1px_rgba(0,0,0,0.04)]"
          : fullHeight
          ? "h-[calc(100vh-58px)] w-screen min-w-0 rounded-none border-0 shadow-none"
          : "min-h-[calc(100vh-58px)]"
      }`}
    >
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <button
          aria-label="Close chat navigation"
          onClick={() => setSidebarOpen(false)}
          className={`fixed inset-0 z-30 lg:hidden ${backdropBg}`}
        />
      )}

      {/* Sidebar (always dark — logo must read on dark bg) */}
      <div
        className={`${
          sidebarOpen ? "fixed inset-y-0 left-0 z-40 flex" : "hidden"
        } h-full min-h-0 w-[220px] overflow-hidden lg:static lg:flex`}
      >
        <ChatSidebar
          selectedSolution={selectedSolution}
          selectedContextId={selectedContextId}
          selectedChat={selectedChat}
          onSelectSolution={selectSolution}
          onSelectContext={selectSolution}
          onResetContext={resetContext}
          onSelectChat={selectChat}
          onNewChat={newChat}
          onClose={() => setSidebarOpen(false)}
          light={light}
        />
      </div>

      {/* Main area */}
      <div className="flex min-w-0 flex-1 flex-col">
        <ChatHeader
          solution={solution}
          onToggleSidebar={() => setSidebarOpen(true)}
          onSelectContext={selectSolution}
          status={isUserTyping ? "typing" : loading ? "loading" : "idle"}
          light={light}
        />
        <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
          <ChatWindow
            messages={messages}
            loading={loading}
            onSubmit={submitMessage}
            onUserTyping={setIsUserTyping}
            light={light}
          />
          <ContextPanel
            solution={solution}
            onAction={runAction}
            light={light}
          />
        </div>
      </div>
    </div>
  );
}
