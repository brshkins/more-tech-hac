export const VoiceAssistantBubble: React.FC<{
  text: string;
  time: string;
}> = ({ text, time }) => {
  return (
    <div className="mb-3 w-full">
      <div className="max-w-[90%] rounded-2xl bg-zinc-900 px-4 py-3 shadow-sm ring-1 ring-white/5">
        <p className="text-[13px] leading-[18px] text-zinc-100">{text}</p>
        <div className="mt-2 flex justify-end">
          <span className="text-[11px] text-zinc-500">{time}</span>
        </div>
      </div>
    </div>
  );
};
