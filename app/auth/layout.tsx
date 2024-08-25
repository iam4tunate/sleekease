export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='bg-[url("/images/authBg1.jpg")] bg-cover bg-no-repeat bg-center w-full bg-black flex items-center justify-center min-h-[calc(100vh-100px)] padY padX relative'>
      <div className='bg-black bg-opacity-60 absolute top-0 right-0 left-0 bottom-0' />
      <div className='bg-white shadow rounded-md padX z-10 relative'>
        {children}
      </div>
    </div>
  );
}
