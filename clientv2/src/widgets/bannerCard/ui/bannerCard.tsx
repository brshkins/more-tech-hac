import { Button, Image } from "@/shared/ui";

export const BannerCard = ({
  imageSrc,
  title,
  highlight,
  buttonText,
  onClick,
}: {
  imageSrc: string;
  title: string;
  highlight: string;
  buttonText: string;
  onClick?: () => void;
}) => {
  return (
    <div className="bg-blue-600 justify-center items-center rounded-3xl w-full p-4 flex flex-col gap-4">
      <Image width={172} height={172} alt="banner" src={imageSrc} />
      <p className="text-xs text-center">
        {title} <br />
        <span className="font-semibold">{highlight}</span>
      </p>
      <Button variant="outline" className="text-black w-full" onClick={onClick}>
        {buttonText}
      </Button>
    </div>
  );
};
