import { VoiceAssistantBar } from "@/features/voice/ui/voiceAssistantBar";
import { VoiceAssistantBubble } from "@/features/voice/ui/voiceAssistantBubble";

export const VoiceAssistantPage: React.FC = () => {
  const messages = [
    {
      text: "Привет! Сегодня я буду проводить тебе собеседование на вакансию «UX/UI Дизайнер». Желаю тебе успешного прохождения собеседования! Для того, чтобы начать, потяни вправо кнопку внизу экрана.",
      time: "12:00",
    },
    {
      text: "Давай начнём! Расскажи немного о себе. Для того, чтобы начать, потяни вправо кнопку внизу экрана.",
      time: "12:00",
    },
  ];

  return (
    <div className="relative h-full bg-black">
      <div className="no-scrollbar flex-1 overflow-y-auto pb-28">
        {messages.map((m, i) => (
          <VoiceAssistantBubble key={i} text={m.text} time={m.time} />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0">
        <div className="pointer-events-auto">
          <VoiceAssistantBar />
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistantPage;
