import styled from 'styled-components';

const StyledLogo = styled.span`
  border: 1px solid #0ed95a;
  border-radius: 50px;
  background-color: transparent;
  display: inline-block;
  margin-right: 3px;
  padding: 0 5px;
`;

function Logo({ type }) {
  if (type === 'login') {
    return (
      <>
        <span className="uppercase text-2xl">
          <StyledLogo>Cent</StyledLogo>
          $ense
        </span>
      </>
    );
  }

  return (
    <>
      <span className="hidden sm:inline sm:uppercase sm:text-lg">
        <StyledLogo>Cent</StyledLogo>
        $ense
      </span>
      <span className="uppercase text-center text-xl sm:hidden">
        <StyledLogo>C</StyledLogo>$
      </span>
    </>
  );
}

export default Logo;
