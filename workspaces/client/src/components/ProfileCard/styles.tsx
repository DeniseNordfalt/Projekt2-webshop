import styled from "styled-components";

export const ProfileCardContainer = styled.div`
  display: flex;
  flex-direction: column;

  background-color: aliceblue;
  max-width: 50%;
  margin: 2rem auto;
  padding: 10px;
  height: auto;
  border: 1px solid black;
`;

export const ProfileCardHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const HeaderTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
`;

export const ProfileCardBody = styled.div`
  display: flex;
  flex-direction: column;

  margin: 1rem 0;
`;

export const BodyTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
  margin-top: 1rem;
`;

export const TextItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0.5rem 0;
`;

export const TextItemTitle = styled.p`
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  padding-right: 10px;
`;

export const TextItemValue = styled.p`
  font-size: 1rem;
  font-weight: 400;
  margin: 0;
`;

export const Separator = styled.hr`
  border: 1px solid black;
  margin: 0.5rem 0;
`;

export const Button = styled.button`
  background-color: white;
  border: 1px solid black;
  color: black;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  font-weight: bold;
  margin-top: 1rem;
  cursor: pointer;

  &:hover {
    box-shadow: 2px 2px 2px lightgray;
  }
`;
