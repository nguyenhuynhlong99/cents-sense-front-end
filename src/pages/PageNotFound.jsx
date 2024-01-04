import { useGoBack } from '../hooks/useGoBack';
import Button from '../ui/Button';

function PageNotFound() {
  const goBack = useGoBack();

  return (
    <main className="bg-neutral-950 text-neutral-100 h-[100dvh]">
      <div className="text-center max-w-[90%] mx-auto pt-[180px] md:pt-[80px]">
        <img
          className="max-w-[640px] mx-auto"
          src="/Under construction-cuate.svg"
          alt="under construction"
        />
        <div>
          <h1 className="text-base uppercase font-bold text-green-500 mb-1 sm:text-xl md:text-2xl lg:text-3xl">
            page under construction
          </h1>
          <p className="text-sm md:text-base lg:text-lg">
            Hi, I'm currently working on this page.
          </p>
          <p className="text-sm md:text-base lg:text-lg">
            Please come back later!
          </p>
          <Button onClick={goBack} className="text-sm mt-3">
            &larr; Go back
          </Button>
        </div>
      </div>
    </main>
  );
}

export default PageNotFound;
