
const Tictac = () => {
  const divs = [];
  for(let i = 0; i<=8;i++) {
    divs.push(<div key={i} className="bg-blue-200 h-52">Hellow bitch</div>);
  }
  return <>
    {divs.map(div => div)};
  </>
}

function App() {
  return <div className="grid grid-cols-3 w-1/2 gap-5 mx-auto">
    <Tictac />
  </div>
}

export default App;
