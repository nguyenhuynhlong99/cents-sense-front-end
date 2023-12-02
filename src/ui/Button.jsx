import styled from 'styled-components';

const Button = styled.button`
  background-color: #0ed95a;
  padding: 10px 10px;
  color: #212121;
  border-radius: 18px;
  text-transform: uppercase;
  font-size: 13px;
  border: 1px solid transparent;

  &:hover,
  &:focus {
    outline: none;
    border: 1px solid #0ed95a;
    color: #eee;
    background-color: transparent;
  }
`;

export default Button;
