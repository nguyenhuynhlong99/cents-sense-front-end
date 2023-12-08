import { createContext, useContext } from 'react';

const ModalComponentContext = createContext();

function Modal({ children, isShown, setIsShown }) {
  function onClose() {
    setIsShown(false);
  }

  return (
    isShown && (
      <div
        onClick={onClose}
        className="fixed top-0 left-0 w-full h-full overflow-x-hidden overflow-y-hidden backdrop-blur-sm bg-[rgba(0,0,0,0.3)] z-[5] px-5"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="max-w-[700px] mt-[100px] mx-auto"
        >
          <div className="bg-neutral-800 rounded-lg p-7 text-base">
            <ModalComponentContext.Provider value={{ onClose }}>
              {children}
            </ModalComponentContext.Provider>
          </div>
        </div>
      </div>
    )
  );
}

const ModalHeader = ({ children }) => {
  const { onClose } = useContext(ModalComponentContext);

  return (
    <div className="flex items-center justify-between text-xl sm:text-2xl">
      <div>{children}</div>
      <button onClick={onClose}>
        <span className="text-3xl">&times;</span>
      </button>
    </div>
  );
};

const ModalBody = ({ children }) => {
  return <>{children}</>;
};

// const ModalFooter = ({ children }) => {
//   return <>{children}</>;
// };

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
// Modal.Footer = ModalFooter;

export default Modal;
