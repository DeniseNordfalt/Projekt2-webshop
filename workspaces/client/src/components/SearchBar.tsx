import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  background-color: black;
  padding: 5px;
  border-radius: 25px;
  img {
    width: 25px;
    height: 25px;
    padding: 5px;
    background-color: white;
    border-radius: 50px;
  }
`;

const InputField = styled.input`
  margin: 5px;
  padding: 5px 5px 5px 10px;
  font-size: 16px;
  width: 80%;
  border: none;

  color: white;
  background-color: transparent;
  &:focus {
    border: none;
    outline: none;
  }
`;

type Props = {};

const SearchBar = (props: Props) => {
  const [searchTerm, setSearchTerm] = React.useState<string>("");

  const handleOnSearch = () => {
    console.log(searchTerm)
  };

  return (
    <Container>
      <InputField
        placeholder="Search for product"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div onClick={handleOnSearch}>
        <img src="/search-icon.svg" alt="search icon"/>
      </div>
    </Container>
  );
};

export default SearchBar;
