import React from 'react'
import styled from 'styled-components'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'
const Stars = ({ stars, reviews }) => {
  //we create a new array and gave him a length of 5, then we skip the first item and the index it's what interest us, then we set a var that add 0.5 to our index and set our return where we iterate over our array and check the value of our index and number(index + 0,5) comparing to the star value and displaying based on our ternary operator
  const tempStars = Array.from({ length: 5 }, (_, index) => {
    const number = index + 0.5
    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <BsStarFill />
        ) : stars >= number ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
    )
  })
  return (
    <Wrapper>
      <div className='stars'>
        {/* programatic way to display star where we  */}
        {tempStars}
        {/* manual way to display star where we check the value witha ternary operator and display the icon accordingly */}
        {/* star start */}
        {/* <span>
          {stars >= 1 ? (
            <BsStarFill />
          ) : stars >= 0.5 ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}
        </span> */}
        {/* end of stars */}
        {/* star start */}
        {/* <span>
          {stars >= 2 ? (
            <BsStarFill />
          ) : stars >= 1.5 ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}
        </span> */}
        {/* end of stars */}
        {/* star start */}
        {/* <span>
          {stars >= 3 ? (
            <BsStarFill />
          ) : stars >= 2.5 ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}
        </span> */}
        {/* end of stars */}
        {/* star start */}
        {/* <span>
          {stars >= 4 ? (
            <BsStarFill />
          ) : stars >= 3.5 ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}
        </span> */}
        {/* end of stars */}
        {/* star start */}
        {/* <span>
          {stars === 5 ? (
            <BsStarFill />
          ) : stars >= 4.5 ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}
        </span> */}
        {/* end of stars */}
      </div>
      <p className='reviews'>({reviews})</p>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`
export default Stars
