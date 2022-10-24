import { ProductItem } from "@project-webbshop/shared";
import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { editProduct } from "../api";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: -1;
`;
const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  padding: 15px;
  background-color: white;
  z-index: 105;
`;

const StyledForm = styled.form`
  max-width: 280px;
  margin: auto;
  input {
    width: 90%;
  }
`;

type Props = {
  data: ProductItem | Partial<ProductItem> | null;
  handleOnSubmit: (target: any, updateProduct: ProductItem | null) => void;
  setVisibility: Dispatch<SetStateAction<boolean>>;
};

const ProductModal = ({ data, handleOnSubmit, setVisibility }: Props) => {
  const [updateProduct, setUpdateProduct] = React.useState<ProductItem | Partial<ProductItem> | null>(
    data
  );

  const handleOnChange = (key: keyof ProductItem, value: string) => {
    setUpdateProduct({ ...updateProduct, [key]: value } as ProductItem);
  };

  const renderInputField = (id: string) => {
    return (
      <input
        type="text"
        id={id}
        name={id}
        placeholder={id + "..."}
        value={updateProduct?.[id as keyof ProductItem]}
        onChange={(e) =>
          handleOnChange(id as keyof ProductItem, e.target.value)
        }
      />
    );
  };

  return (
    <Container>
      <Modal>
        <StyledForm onSubmit={(e) => {e.preventDefault()
          handleOnSubmit(e.target, updateProduct as ProductItem || null)}} encType="multipart/form-data">
          {renderInputField("name")}
          {renderInputField("manufacturer")}
          {renderInputField("category")}
          {renderInputField("price")}
          {renderInputField("weight")}
          <input type="file" multiple />
          <textarea
            id="description"
            name="description"
            placeholder="description..."
            value={updateProduct?.description}
            onChange={(e) => handleOnChange("description", e.target.value)}
          />
          <input type="submit" />
          <button onClick={() => setVisibility(false)}>Cancel</button>
        </StyledForm>
      </Modal>
      <Backdrop />
    </Container>
  );
};

export default ProductModal;
