import styled from "styled-components";

type ThemeProps = {
    src?: string;
  };

const Container = styled.div`
  width: 100%;
  min-height: 200px;
  overflow-y: none;
  margin: 10px;
  padding: 10px;
  border: 1px solid black;
  form {
    display: inline-block;
  }
`;

const ProductList = styled.ul`
box-sizing: border-box;
display: flex;
justify-content: space-between;
align-items: center;
list-style: none;
width: 100%;
min-height: 100px;
margin: 0;
padding: 0;
background-color: aliceblue;
padding: 10px;
`

  
const Thumbnail = styled.div`
  width: 50px;
  height: 50px;
  background-image: ${(props: ThemeProps) => `url(${props.src})`};
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  margin: 0;
  padding: 0;
`;

const ProductItem = styled.li`
margin-bottom: 20px;
`

const PricingContainer = styled.div`
max-width: 150px;
span {
    display: inline-block;
    width: 100%;
}
`

const ProductInfo = styled.div`
display: grid;
grid-template-columns: 50px auto;
gap: 10px;

`

export { Container, ProductList, ProductItem, Thumbnail, ProductInfo, PricingContainer }