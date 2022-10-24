import styled from "styled-components";

const ProductInfoWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  margin: 40px auto;
  max-width: 1000px;
  img {
    width: 100%;
    max-width: 350px;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;`

  const Thumbnails = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  img{
    width: 100%;
    max-width: 70px;
    margin-right: 10px;
  }
  `
  const StyledButton  = styled.button`
  
  background:black;
  color: white;
  font-size: 18px;
  border: none;
  padding: 15px;
  &:hover {
    background:grey;
    transition-duration: 0.4s;
    cursor:pointer;
  }


  `

  export {
    StyledButton,
    Thumbnails,
    InfoContainer,
    ProductInfoWrapper,
  }