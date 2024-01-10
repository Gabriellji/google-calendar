import styled from 'styled-components';

export const PrimaryButton = styled.button`
  padding: 10px 20px;
  background-color: #4285F4;
  color: white;
  border: 1px solid #4285F4;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #357ae8;
  }
`;

export default PrimaryButton;
