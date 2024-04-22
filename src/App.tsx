import Board from "./components/Board";
import DeleteBox from "./components/DeleteBox";

function App() {
  return (
    <div className="flex h-[100dvh] w-full bg-slate-950">
      <Board />
      <DeleteBox />
    </div>
  );
}

export default App;
