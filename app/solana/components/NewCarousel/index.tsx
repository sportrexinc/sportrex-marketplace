import React from 'react'
import Carousel, { CarouselItem } from './Carousel'
import NormalLayout from '../../layouts/NormalLayout'

const index = () => {
    
    return (
      <NormalLayout>
        <Carousel>
          <CarouselItem>
            <img
              src="https://res.cloudinary.com/www-daniekeys-com/image/upload/v1652866900/volodymyr-hryshchenko-e8YFkjN2CzY-unsplash_mpt47l.jpg"
              alt=""
            />
          </CarouselItem>
          <CarouselItem>
            <img
              src="https://res.cloudinary.com/www-daniekeys-com/image/upload/v1649953419/jonny-gios-re2ZvuWI1jw-unsplash_b0m5dt.jpg"
              alt=""
            />
          </CarouselItem>
          <CarouselItem>
            <img
              src="https://res.cloudinary.com/www-daniekeys-com/image/upload/v1649948146/desk8_k0fcbe.png"
              alt=""
            />
          </CarouselItem>
        </Carousel>
      </NormalLayout>
    );
}

export default index
