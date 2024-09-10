import ClipLoader from 'react-spinners/ClipLoader';

export default function Spinner({
  colored,
  size,
}: {
  colored?: boolean;
  size: number;
}) {
  return (
    <ClipLoader
      color={colored ? '#04563B' : '#ffffff'}
      size={size}
      aria-label='Loading Spinner'
    />
  );
}