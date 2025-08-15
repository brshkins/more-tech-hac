import Image from "next/image";

export const AssistantEmptyMessage = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <section className="flex items-center flex-col space-y-4">
        <Image
          src={"/image/mts 1.png"}
          alt="empty-message"
          className="object-cover"
          width={390}
          height={385}
        />
      </section>
    </div>
  );
};
