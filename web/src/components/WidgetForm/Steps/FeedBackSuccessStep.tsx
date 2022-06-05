import { CloseButton } from "../../CloseButton";

interface FeedBackSuccessStepProps {
  onFeedBackRestartRequested: () => void;
}

export function FeedbackSuccessStep({
  onFeedBackRestartRequested,
}: FeedBackSuccessStepProps) {
  return (
    <>
      <header>
        <CloseButton />
      </header>
      <div className="flex flex-col items-center py-10 w-[310px]">
        <img
          src="https://img.icons8.com/emoji/48/000000/check-box-with-check-emoji.png"
          alt="check-icon"
        />
        <span className="text-xl mt-2">Thanks for your feedback</span>
        <button
          className="py-2 px-6 mt-6 bg-zinc-800 rounded-md border-transparent text-sm leading-6 hover:bg-zinc-700 transition-colors focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none"
          onClick={onFeedBackRestartRequested}
        >
          Send another
        </button>
      </div>
    </>
  );
}
