import s from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  onChangeButton: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onChangeButton }) => {
  return (
    <button className={s.button} type="button" onClick={onChangeButton}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;
