import toast from "react-hot-toast";
import { ProgressBar } from "@/components";
import { useState, useRef, useEffect, ChangeEvent } from "react";
import { BiSolidTrash, BiCloudUpload } from "react-icons/bi";

type MediaFilesUploaderProps = {
  label?: string;
  className?: string;
  uploadHandler: (
    formData: any,
    setProgress: (progress: number) => void
  ) => Promise<any>;
  removeHandler: () => void;
  existingImage?: string | null;
  setContextData: (url: string) => void;
  acceptedFormats?: string;
  description?: string;
  containerStyles?: string;
};

const FilesUploader: React.FC<MediaFilesUploaderProps> = ({
  label = "Upload Image",
  className,
  uploadHandler,
  removeHandler,
  existingImage = null,
  setContextData,
  acceptedFormats = "image/*",
  description = "Upload an image for your post. The image should be .png, .jpg, .gif, or other formats and not compressed.",
  containerStyles = `${className} min-h-[350px] h-[350px] rounded-md border-[2px] border-dotted border-primary dark:border-dark2 mt-3`,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [fileName, setFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(
    existingImage
  );

  useEffect(() => {
    if (existingImage) {
      setSelectedImage(existingImage);
      setFileName("Uploaded Image");
    } else {
      setSelectedImage(null);
      setFileName(null);
    }
  }, [existingImage]);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    setLoading(true);
    setProgress(0);
    const file = e.target.files[0];

    if (file) {
      setFileName(file.name);
      const formData = new FormData();
      formData.append("image", file);
      formData.append("width", "600");
      formData.append("height", "600");

      const response = await uploadHandler(formData, setProgress);

      if (response.success) {
        const cleanUrl = response.data.image_path;
        setSelectedImage(cleanUrl);
        setContextData(cleanUrl);
        toast.success(response.message);
      } else {
        setErrorMessage(response.message);
      }
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const handleRemoveImage = () => {
    setLoading(false);
    setSelectedImage(null);
    setFileName(null);
    removeHandler();
    setProgress(0);
    setErrorMessage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    setProgress(0);
    setErrorMessage(null);
    fileInputRef.current?.click();
  };

  return (
    <div className="mb-5">
      <div className="flex justify-between items-end mb-1">
        <h1 className="text-lg font-bold flex items-center">
          <span>{label}</span>
        </h1>
      </div>

      <p className="text-xs text-dark3">{description}</p>

      <div
        className={`${containerStyles} flex justify-center items-center cursor-pointer`}
        onClick={handleClick}
      >
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="Selected"
            className="object-contain w-full h-full rounded-md"
          />
        ) : (
          <div className="flex flex-col justify-center items-center">
            <BiCloudUpload size={55} className="text-primary" />
            <span className="text-primary text-xs">Select Image to upload</span>
            {loading && (
              <div className="flex flex-col justify-center items-center gap-2 mt-3 w-full">
                <div className="w-[200px]">
                  <ProgressBar
                    completed={progress}
                    bgColor="#2aa3ff"
                    height="13px"
                    borderRadius="8px"
                    isLabelVisible={false}
                  />
                </div>

                <p className="text-xs text-gray font-semibold w-full text-center">
                  {progress}% Completed
                </p>
              </div>
            )}
            {errorMessage && (
              <p className="text-xs text-red-500 mt-3">{errorMessage}</p>
            )}
          </div>
        )}
      </div>

      <input
        type="file"
        accept={acceptedFormats}
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {selectedImage && (
        <div className="flex justify-between items-center mt-3 w-full">
          <p className="text-xs text-gray">{fileName}</p>
          <div className="flex items-center gap-3">
            <button
              onClick={handleRemoveImage}
              className="text-xs py-1 px-3 bg-red-200 rounded text-red-600 hover:bg-red-600 hover:text-white"
            >
              <BiSolidTrash className="inline mr-2" />
              Remove
            </button>
            <button
              onClick={handleClick}
              className="text-xs py-1 px-3 bg-primary text-white rounded hover:bg-secondary hover:text-primary"
            >
              Change
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilesUploader;
