import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    margin: auto;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    gap: 3px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid transparent;
  }

  &:hover,
  &:active {
    border: 1px solid rgb(34 197 94);
    color: rgb(34 197 94);
  }

  /* This works because react-router places the active class on the active NavLink */
  &.active:link,
  &.active:visited {
    color: rgb(220 252 231); //green-100
    background-color: rgb(34 197 94); //green-500
  }

  @media (min-width: 1024px) {
    &:link,
    &:visited {
      justify-content: unset;
      padding: 10px 10px 10px 19px;
    }
  }
`;

function SidebarNavLink({ to, children }) {
  return <StyledNavLink to={to}>{children}</StyledNavLink>;
}

export default SidebarNavLink;
