import styled from 'styled-components';
import Nav from './Nav/Nav';
import { useNavigate } from 'react-router-dom';

const StyledHome = styled.div`
  height: 100vh;
  background-color: #000;
  color: #eeeeee;
  overflow: hidden;
`;

const Button = styled.button`
  background-color: #0ed95a;
  padding: 10px 30px;
  color: #212121;
  border-radius: 18px;
  text-transform: uppercase;
  font-size: 18px;
  border: 1px solid transparent;

  &:hover,
  &:focus {
    outline: none;
    border: 1px solid #0ed95a;
    color: #eee;
    background-color: transparent;
  }
`;

function Home() {
  const navigate = useNavigate();

  return (
    <StyledHome>
      <div className="max-w-[1100px] px-5 m-auto">
        <Nav />

        <main className="mt-10 flex flex-col items-center justify-center lg:flex-row">
          <img
            src="Personal finance-bro.svg"
            alt="illustration"
            className="w-[300px] lg:w-[450px]"
          />
          <div className="leading-none sm:leading-normal text-center lg:text-right">
            <span className="uppercase text-2xl sm:text-4xl font-bold">
              Maximize your money
            </span>
            <br />
            <span className="uppercase text-xl sm:text-3xl font-light">
              Minimize your stress
            </span>
            <span className="block text-base sm:text-lg font-light">
              Simple way to manage personal finances
            </span>
            <Button className="mt-6" onClick={() => navigate('/overview')}>
              Try it now
            </Button>
          </div>
        </main>
      </div>
    </StyledHome>
  );
}

export default Home;
