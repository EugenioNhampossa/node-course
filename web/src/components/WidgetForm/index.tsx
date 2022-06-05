import { CloseButton } from "../CloseButton";
import { useState } from "react";
import bugImageUrl from "../../assets/bug.png";
import ideaImageUrl from "../../assets/idea.png";
import thoughtImageUrl from "../../assets/thought.png";
import { FeedbackTypeStep } from "./Steps/FeedBackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedBackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedBackSuccessStep";

/** Array with all types of feedback, this will simplify the 
the implementation of feedback buttons.
*/
export const feedbackTypes = {
  BUG: {
    title: "Problem",
    image: {
      source: bugImageUrl,
      alt: "Bug image",
    },
  },
  IDEA: {
    title: "Idea",
    image: {
      source: ideaImageUrl,
      alt: "Lamp image",
    },
  },
  OTHER: {
    title: "Other",
    image: {
      source: thoughtImageUrl,
      alt: "thought balloon",
    },
  },
};

/**
 * Object.entries(feedbackTypes) returns:
 * [
 *    ['Key',{..values..}]
 *
 *    In this case:
 *    ['BUG', {....}]
 *    ['IDEA', {....}]
 *    ['THOUGHT', {....}]
 * ]
 */

//Creating types for feedback, forcing the method use state
//to use this types.
export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
  const [feedbackType, setFeedBackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedBackSent] = useState(false);

  function handleRestartFeedBack() {
    setFeedBackSent(false);
    setFeedBackType(null);
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      {feedbackSent ? ( //Checking if feedback has been sent
        <FeedbackSuccessStep
          onFeedBackRestartRequested={handleRestartFeedBack}
        />
      ) : (
        <>
          {!feedbackType ? ( //Checking if feedback type has been selected
            <FeedbackTypeStep onFeedBackTypeChanged={setFeedBackType} />
          ) : (
            <FeedbackContentStep
              feedBackType={feedbackType}
              onFeedBackRestartRequested={handleRestartFeedBack}
              onFeedBackSent={() => setFeedBackSent(true)}
            />
          )}
        </>
      )}

      <footer className="text-xs text-neutral-400">
        Made with ♥️ by{" "}
        <a
          className="underline underline-offset-2"
          href="https://rocketseat.com.br"
        >
          Rocketseat
        </a>
      </footer>
    </div>
  );
}
