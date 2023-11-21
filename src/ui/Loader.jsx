import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
    to{transform: rotate(1turn)}
`;

const StyledLoader = styled.div`
  width: 50px;
  padding: 8px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #0ed95a;
  --_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
  mask: var(--_m);
  -webkit-mask-composite: source-out;
  mask-composite: subtract;
  animation: ${rotate} 1s infinite linear;
`;

const LoaderWrapper = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #212121;
  backdrop-filter: blur(12px);
`;

function Loader() {
  return (
    <LoaderWrapper>
      <StyledLoader />
    </LoaderWrapper>
  );
}

export default Loader;
