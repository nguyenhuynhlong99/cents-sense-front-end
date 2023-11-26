import { createContext, useContext } from 'react';

const ModalContext = createContext();

function Modal({ children, isOpen, onClose }) {
  return (
    isOpen && (
      <div
        onClick={onClose}
        className="fixed top-0 left-0 w-full h-full overflow-x-hidden overflow-y-hidden bg-[rgba(0,0,0,0.8)] z-[1] px-5"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="max-w-[700px] my-[200px] mx-auto"
        >
          <div className="bg-neutral-800 rounded-lg p-3">
            <ModalContext.Provider value={{ onClose }}>
              {children}
            </ModalContext.Provider>
          </div>
        </div>
      </div>
    )
  );
}

const ModalHeader = ({ children }) => {
  const { onClose } = useContext(ModalContext);

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
  return <div>{children}</div>;
};

const ModalFooter = ({ children }) => {
  return <div>{children}</div>;
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
