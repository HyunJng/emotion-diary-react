import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Diary from "./pages/Diary";
import New from "./pages/New";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Button from "./components/Button";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Header 
        title={"타이틀"}
        leftChild={<Button text={"<"} type={"DEFAULT"} onClick={() => {}}/>}
        rightChild={<Button text={">"} type={"DEFAULT"} onClick={() => {}}/>}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<New />} />
        <Route path="/diary/:id" element={<Diary />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
