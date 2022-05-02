import React, { useState } from 'react'
import styled from 'styled-components'
//we deconstruct the images array passed from single products page and assign it a default value of an array with an object and a default value for url of an empty string
const ProductImages = ({ images = [{ url: '' }] }) => {
  //hook used to display the main image and we start with the first element of the array images
  const [main, setMain] = useState(images[0])
  return (
    <Wrapper>
      <img src={main.url} alt='main image' />
      <div className='gallery'>
        {/* we map over our images array and display our img,set one onclick that set the image we display as main to be the one with the index we clicked on */}
        {images.map((image, index) => {
          return (
            <img
              onClick={() => setMain(images[index])}
              src={image.url}
              alt={image.filename}
              key={index}
              className={`${image.url === main.url ? 'active' : null}`}
            />
          )
        })}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .main {
    height: 600px;
  }
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  .gallery {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
    img {
      height: 100px;
      cursor: pointer;
    }
  }
  .active {
    box-shadow: 0px 0px 0px 2px var(--clr-primary-5);
  }
  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
    .gallery {
      img {
        height: 50px;
      }
    }
  }
  @media (min-width: 992px) {
    .main {
      height: 500px;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`

export default ProductImages
