import BoardContextWrapper from "../components/BoardContextWrapper";
import BoardMainContainer from "./BoardMainContainer";

export default function BoardMainPage(): JSX.Element {
  return (
    <BoardContextWrapper>
      <BoardMainContainer />
    </BoardContextWrapper>
  );
}
