import styled from 'styled-components';

const StyledMasterCardIcon = styled.span`
  display: inline-block;
  height: 15px;
  isolation: isolate;
  position: relative;
  line-height: 1;
  vertical-align: middle;
  width: 25px;

  &:before,
  &:after {
    border-radius: 50px;
    content: '';
    display: inline-block;
    height: 15px;
    position: absolute;
    width: 15px;
  }

  &:before {
    background-color: #eb001b;
    left: 0;
    top: 0;
  }

  &:after {
    background-color: #f79e1b;
    mix-blend-mode: hard-light;
    right: 0;
    top: 0;
  }
`;

function MasterCardIcon() {
  return <StyledMasterCardIcon />;
}

export default MasterCardIcon;
