import { useState } from "react";
import { useConvoStore, type ConvoOption } from "../utils/convoHelper";

export default function Convo() {
  const { convoActive, currentCharacterName, currentPart, currentQuestion, setCurrentQuestion, clearConvo, questions } = useConvoStore();

  if (!convoActive) return null;

  const handleNext = () => {
    if (currentQuestion < 3) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      clearConvo(true);
    }
    //log all the convo store values
    console.log("currentCharacterName: ", currentCharacterName, "currentPart: ", currentPart, "currentQuestion: ", currentQuestion, "questions: ", questions);
  };

  const handleBackdropClick = (event: React.MouseEvent | React.KeyboardEvent) => {
    if (event.type === "keydown" && (event as React.KeyboardEvent).key !== "Escape") {
      return;
    }
    clearConvo(false);
  };

  return (
    <div className="fixed inset-0 z-[999999999] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={handleBackdropClick} onKeyDown={handleBackdropClick} role="button" tabIndex={0} aria-label="Close convo" />
      <div className="relative bg-white rounded-lg p-6 max-w-2xl w-full mx-4 space-y-4">
        {/* Character name */}
        <h2 className="text-xl font-bold text-gray-900">{currentCharacterName}</h2>

        {/* Convo text */}
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
        <p
          className="text-gray-700 whitespace-pre-line"
          dangerouslySetInnerHTML={{
            __html: questions[`part${currentPart}`][`q${currentQuestion}`],
          }}
        />

        {/* Options or Next button */}
        <div className="flex justify-end gap-3 pt-4">
          <div className="flex flex-col w-full gap-2">
            {currentQuestion <= 3 && (
              <button type="button" onClick={() => handleNext()} className="w-full mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                {currentQuestion < 3 ? "Next" : "Finish"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
