import { useState } from "react";
import { useConvoStore } from "../utils/convoHelper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { startSpeechToText } from "../speech_recognition/speechToText";

export default function Convo() {
  const { convoActive, currentCharacterName, currentPart, currentQuestion, setCurrentQuestion, clearConvo, questions, answers } = useConvoStore();
  const [inputFieldValue, setInputFieldValue] = useState<string>("");

  if (!convoActive) return null;

  const handleNext = () => {
    answers[`part${currentPart}`][`a${currentQuestion}`] = inputFieldValue;
    if (currentQuestion < 3) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      clearConvo(true);
    }
    setInputFieldValue("");
    //log all the convo store values
    console.log("currentCharacterName: ", currentCharacterName, "currentPart: ", currentPart, "currentQuestion: ", currentQuestion, "questions: ", questions, "answers: ", answers);
  };

  const handleBackdropClick = (event: React.MouseEvent | React.KeyboardEvent) => {
    if (event.type === "keydown" && (event as React.KeyboardEvent).key !== "Escape") {
      return;
    }
    clearConvo(false);
  };

  const handleSTT = () => {
    setInputFieldValue("");
    startSpeechToText().then((transcript) => {
      setInputFieldValue(transcript);
    });
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

        {/* Input field and microphone button */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            id="convo-input"
            onChange={(e) => setInputFieldValue(e.target.value)}
            value={inputFieldValue}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your response..."
          />
          <button type="button" onClick={handleSTT} className="p-2 px-3 h-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
            <FontAwesomeIcon icon={faMicrophone} />
          </button>
        </div>

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
