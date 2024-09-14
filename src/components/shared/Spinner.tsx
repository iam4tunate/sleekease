import ClipLoader from 'react-spinners/ClipLoader';

export default function Spinner({
  colored,
  size,
}: {
  colored?: string;
  size: number;
}) {
  return (
    <ClipLoader
      color={colored ? colored : '#ffffff'}
      size={size}
      aria-label='Loading Spinner'
    />
  );
}
