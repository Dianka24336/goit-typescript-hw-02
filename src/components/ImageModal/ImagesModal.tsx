import { useEffect } from "react";
import s from "./ImagesModal.module.css";

interface ImagesModalProps {
  largeImageURL: string | null;
  closeModal: () => void;
  onBackdropClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const ImagesModal: React.FC<ImagesModalProps> = ({
  largeImageURL,
  closeModal,
  onBackdropClick,
}) => {
  useEffect(() => {
    const onEscapeClick = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", onEscapeClick);

    return () => {
      document.removeEventListener("keydown", onEscapeClick);
    };
  }, [closeModal]);

  return (
    <div className={s.overlay} onClick={onBackdropClick}>
      <div className={s.modal}>
        <button className={s.closeBtn} onClick={closeModal}>
          X
        </button>
        <img src={largeImageURL ?? ""} alt="" />
      </div>
    </div>
  );
};

export default ImagesModal;
