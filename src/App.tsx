import Board from "./components/Board";
import DeleteBox from "./components/DeleteBox";

function App() {
  return (
    <div className="flex h-[100dvh] w-full bg-slate-950 p-2 md:p-4 gap-4">
      <Board />
      <DeleteBox />
    </div>
  );
}

export default App;
