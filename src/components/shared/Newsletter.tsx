import { useState } from 'react';
import { Button } from '../ui/button';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  return (
    <div className='padX py-10 bg-primary text-white rounded-xl flex max-md:flex-col gap-y-5 items-center max-md:items-start justify-between'>
      <div className='text-4xl max-lg:text-3xl w-[55%] max-md:w-full font-rubikMedium'>
        Be the First to Know About Our Latest Offers. Subscribe to our
        Newsletter
      </div>
      <div className='flex flex-col gap-2 w-[30%] max-lg:w-[40%] max-md:w-full '>
        <input
          className='bg-white text-black py-4 rounded-full px-4 outline-none'
          placeholder='Enter your Email Address'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          size='lg'
          className='rounded-full py-4 hover:border-none bg-orange hover:bg-darkOrange font-rubikSemibold'>
          Subscribe
        </Button>
      </div>
    </div>
  );
}