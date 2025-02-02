import { useState } from "react";
import { useConvoStore, type ConvoOption } from "../utils/convoHelper";

export default function Convo() {
  const { currentConvo, selectOption, clearConvo } = useConvoStore();

  if (!currentConvo) return null;

  const handleNext = () => {
    if (currentConvo.next) {
      selectOption({
        text: "Continue",
        next: currentConvo.next,
      });
    } else {
      if (currentConvo.onEnd) currentConvo.onEnd(portfolioStore);
      clearConvo();
    }
  };

  const handleBackdropClick = (event: React.MouseEvent | React.KeyboardEvent) => {
    if (event.type === "keydown" && (event as React.KeyboardEvent).key !== "Escape") {
      return;
    }
    clearConvo();
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={handleBackdropClick} onKeyDown={handleBackdropClick} role="button" tabIndex={0} aria-label="Close convo" />
      <div className="relative bg-white rounded-lg p-6 max-w-2xl w-full mx-4 space-y-4">
        {/* Character name */}
        <h2 className="text-xl font-bold text-gray-900">{currentConvo.character}</h2>

        {/* Convo text */}
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
        <p
          className="text-gray-700 whitespace-pre-line"
          dangerouslySetInnerHTML={{
            __html: currentConvo.text,
          }}
        />

        {/* Options or Next button */}
        <div className="flex justify-end gap-3 pt-4">
          <button type="button" onClick={handleNext} className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
            {currentConvo.next ? "Next" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}
