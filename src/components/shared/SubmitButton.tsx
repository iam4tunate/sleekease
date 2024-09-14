import { Button } from '../ui/button';
import Spinner from './Spinner';

export default function SubmitButton({
  isLoading,
  text,
  className,
}: {
  isLoading: boolean;
  text: string;
  className: string;
}) {
  return (
    <Button disabled={isLoading} type='submit' className={className}>
      {isLoading ? (
        <>
          <Spinner size={20} />
          <span className='pl-1'>Please wait...</span>
        </>
      ) : (
        text
      )}
    </Button>
  );
}
