import "./CommentModal.css";

const CommentModal = ({ comment, onClose }) => {
  return (
    <div className="modal_overlay" onClick={onClose}>
      <div className="modal_box" onClick={(e) => e.stopPropagation()}>
        <p className="modal_comment">{comment}</p>
        <button className="modal_close_btn" onClick={onClose}>
          확인
        </button>
      </div>
    </div>
  );
};

export default CommentModal;
