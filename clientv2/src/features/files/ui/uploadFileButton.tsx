import { useFileUpload } from "@/shared/hooks/useFileUpload";
import { Button } from "@/shared/ui";
import { FilesIcon } from "lucide-react";
import { useRef } from "react";

interface UploadFileButtonProps {
  acceptedExtensions: Array<string>;
  onFileChange: (file: File | null) => void;
}

export const UploadFileButton = ({
  onFileChange,
  acceptedExtensions,
}: UploadFileButtonProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { loading, uploadFile } = useFileUpload({
    acceptedExtensions,
    maxSizeMB: 5,
    onFileChange,
  });

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Button
      type="button"
      className="bg-neutral-900 w-full"
      onClick={handleUploadClick}
      disabled={loading}
    >
      <span>
        <FilesIcon className="h-5 w-5" />
      </span>
      <p>Загрузить</p>
      <input
        ref={fileInputRef}
        id="file-upload"
        type="file"
        accept={acceptedExtensions.map((ext) => `.${ext}`).join(",")}
        onChange={(e) => uploadFile(e)}
        className="hidden"
        disabled={loading}
      />
    </Button>
  );
};
