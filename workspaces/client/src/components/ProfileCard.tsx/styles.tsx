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
`;

export const ProfileCardBodyText = styled.p`
  font-size: 1rem;
  font-weight: 400;
  margin: 0;
`;

export const TextItem = styled.p`
  font-size: 1rem;
  font-weight: 400;
  margin: 0;
  padding: 0.5rem 0;
`;

export const TextItemTitle = styled.p`
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
`;

export const TextItemValue = styled.p`
  font-size: 1rem;
  font-weight: 400;
  margin: 0;
`;
