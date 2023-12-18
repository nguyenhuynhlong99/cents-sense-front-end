import styled from 'styled-components';

const Button = styled.button`
  background-color: #0ed95a;
  padding: 4px;
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

  @media (min-width: 640px) {
    padding: 8px;
  }
`;

export default Button;
