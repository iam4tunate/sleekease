import { useCallback, useState } from 'react';
import { FileRejection, FileWithPath, useDropzone } from 'react-dropzone';
import { Button } from '../ui/button';
import { toast } from 'sonner';

type FileUploaderProps = {
  fieldChange: (files: File[]) => void;
  mediaUrl: string[];
};

type DropzoneError = {
  code: string;
  message?: string;
};

export default function FileUploader({
  fieldChange,
  mediaUrl,
}: FileUploaderProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setFiles] = useState<File[]>([]);
  const [fileUrls, setFileUrls] = useState<string[]>(mediaUrl ? mediaUrl : []);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setErrorMessage(null); // Clear any previous error
      setFiles(acceptedFiles);
      fieldChange(acceptedFiles);

      const newFileUrls = acceptedFiles.map((file) =>
        URL.createObjectURL(file)
      );
      setFileUrls(newFileUrls);
    },
    [fieldChange]
  );

  const onDropRejected = (fileRejections: FileRejection[]) => {
    // Extract errors from file rejections
    const errors = fileRejections.map((rejection) => rejection.errors);

    // Check if any error is 'file-too-large'
    const largeFileError = errors
      .flat()
      .some((error: DropzoneError) => error.code === 'file-too-large');

    if (largeFileError) {
      const errorMsg =
        'One or more files exceed the 900KB limit. Please upload files smaller than 900KB.';
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDropRejected,
    accept: {
      'image/*': ['.png', '.jpeg', '.jpg'],
    },
    maxSize: 900 * 1024, // 500KB size limit
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className='flex flex-center flex-col rounded-xl cursor-pointer'>
      <input {...getInputProps()} className='cursor-pointer' />
      {errorMessage && <p className='text-red-500 text-sm'>{errorMessage}</p>}
      {fileUrls.length > 0 ? (
        <>
          <div className='flex flex-wrap gap-3 flex-1 justify-center w-full p-5 overflow-y-auto bg-accent rounded-xl'>
            {fileUrls.map((url) => (
              <img key={url} src={url} alt='image' className='w-24' />
            ))}
          </div>
          <p className='pt-2 text-center text-sm'>
            Click or drag & drop photo to replace
          </p>
        </>
      ) : (
        <div className='flex items-center justify-center flex-col p-7 h-[250px] lg:h-[300px] bg-accent rounded-lg'>
          <img
            src='/images/file-upload.svg'
            width={96}
            height={77}
            alt='file-upload'
          />
          <h4 className='text-xl max-sm:text-lg font-geist600 mb-2 mt-6 max-sm:mt-4'>
            Drag & drop photo here
          </h4>
          <p className='mb-6 text-sm'>JPEG, PNG, JPG</p>
          <Button className='bg-primary'>Select from device</Button>
          <p className="pt-2">File must be smaller than 900KB.</p>
        </div>
      )}
    </div>
  );
}
