function ErrorBox({ message }) {
  return (
    <div className="p-5 border-l-8 border-red-500 bg-neutral-950 rounded-md">
      <p className="text-red-400 text-base sm:text-lg md:text-3xl">{message}</p>
    </div>
  );
}

export default ErrorBox;
