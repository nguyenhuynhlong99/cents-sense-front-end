import styled, { css } from 'styled-components';

const ModalButton = styled.button`
  width: 80px;
  padding: 0.5rem;
  border-radius: 0.375rem;
  ${(props) =>
    props.variations === 'primary' &&
    css`
      background-color: rgb(34, 197, 94);
      color: rgb(10, 10, 10);
      border: 1px solid transparent;

      &:hover,
      &:focus {
        background-color: transparent;
        border-color: rgb(34, 197, 94);
        color: inherit;
      }
    `}

  ${(props) =>
    props.variations === 'secondary' &&
    css`
      color: rgb(156, 163, 175);
      border: 1px solid rgb(115, 115, 115);

      &:hover,
      &:focus {
        border-color: #fafafa;
        color: inherit;
      }
    `}
`;

ModalButton.defaultProps = {
  variations: 'primary',
};

export default ModalButton;
