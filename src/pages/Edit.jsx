import { useParams } from "react-router-dom";

const Edit = () => {
  const params = useParams();
  return <div>{params.id} 수정</div>;
};

export default Edit;
