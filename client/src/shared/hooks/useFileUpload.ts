import { useState, useCallback } from "react";

export const useFileUpload = ({
  acceptedExtensions,
  maxSizeMB = 5,
  onFileChange,
}: {
  acceptedExtensions: string[];
  maxSizeMB?: number;
  onFileChange: (file: File | null) => void;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const validateFile = (file: File) => {
    const fileExtension = file.name.split(".").pop()?.toLowerCase() || "";
    if (!acceptedExtensions.includes(fileExtension)) {
      return `Разрешены только файлы с расширениями: ${acceptedExtensions.join(
        ", "
      )}.`;
    }

    if (file.size > maxSizeBytes) {
      return `Максимальный размер файла: ${maxSizeMB}MB.`;
    }

    return null;
  };

  const uploadFile = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement>,
      onUpload?: (file: File) => void
    ) => {
      const selectedFile = event.target.files?.[0];
      if (!selectedFile) return;

      setLoading(true);
      setError(null);

      const validationError = validateFile(selectedFile);
      if (validationError) {
        setError(validationError);
        setLoading(false);
        return;
      }

      setFile(selectedFile);
      onFileChange(selectedFile);
      setLoading(false);

      if (onUpload) {
        onUpload(selectedFile);
      }

      event.target.value = "";
    },
    [maxSizeBytes, acceptedExtensions]
  );

  const reset = useCallback(() => {
    setFile(null);
    setError(null);
    setLoading(false);
    const fileInput = document.getElementById(
      "file-upload"
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  }, []);

  return {
    file,
    loading,
    error,
    uploadFile,
    reset,
  };
};
