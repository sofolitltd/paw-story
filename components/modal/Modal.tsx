import { X } from "lucide-react";
import { ReactNode } from "react";

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
};

export default function Modal({ children, onClose }: ModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/30 flex justify-center items-center"
      onClick={onClose} 
    >
      <div
        className="bg-white p-6 rounded-md shadow-lg w-[90%] max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-6 right-6 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X />
        </button>

        {/* Modal Content */}
        {children}
      </div>
    </div>
  );
}
