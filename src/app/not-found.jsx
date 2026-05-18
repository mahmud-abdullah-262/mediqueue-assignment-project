
import { Button } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className='bg-white max-vw max-vh flex flex-col items-center'>
      <h1>notfound 404</h1>
      {/* <Image
      src={nf}
      width={600}
      height={600}
      alt='page not found'
      className='w-7/12 mx-auto '
      
      > 
      </Image>
       */}
     
      <Link className='mb-16' href={'/'}>
          <Button  className={'bg-[#c3923c] text-white font-bold'}>Go Home</Button>
        </Link>
    </div>
  );
};

export default NotFoundPage;