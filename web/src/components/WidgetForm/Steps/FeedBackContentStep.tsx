import { ArrowLeft, Camera } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { api } from "../../../lib/api";
import { CloseButton } from "../../CloseButton";
import { Loading } from "../../Loading";
import { ScreenShotButton } from "../ScreenShotButton";

interface FeedBackContentStep {
  feedBackType: FeedbackType;
  onFeedBackRestartRequested: () => void;
  onFeedBackSent: () => void;
}

export function FeedbackContentStep({
  feedBackType,
  onFeedBackRestartRequested,
  onFeedBackSent,
}: FeedBackContentStep) {
  const feedBackTypeInfo = feedbackTypes[feedBackType];
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [isSendingFeedBack, setIsSendingFeedBack] = useState(false);

  async function handleSubmitFeedback(event: FormEvent) {
    /** this line prevents the default action of the event
     * in this case the default action is reloading the page and send the data.
     */
    event.preventDefault();

    setIsSendingFeedBack(true);

    await api.post("/feedbacks", {
      type: feedBackType,
      comment,
      screenshot,
    });

    setIsSendingFeedBack(false);
    onFeedBackSent();
  }

  const [comment, setComment] = useState("");
  return (
    <>
      <header>
        <button
          onClick={onFeedBackRestartRequested}
          type="button"
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>

        <span className="text-xl leading-6 flex items-center gap-2">
          <img
            src={feedBackTypeInfo.image.source}
            alt={feedBackTypeInfo.image.alt}
            className="w-6 h-6"
          />

          {feedBackTypeInfo.title}
        </span>

        <CloseButton />
      </header>
      <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
        <textarea
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none"
          placeholder="Tell more about what's happening"
          onChange={(event) => setComment(event.target.value)}
        />
        <footer className="flex gap-2 mt-2">
          <ScreenShotButton
            screenshot={screenshot}
            onScreenshotTook={setScreenshot}
          />
          <button
            type="submit"
            disabled={comment.length === 0 || isSendingFeedBack}
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
          >
            {isSendingFeedBack ? <Loading /> : "Send FeedBack"}
          </button>
        </footer>
      </form>
    </>
  );
}
