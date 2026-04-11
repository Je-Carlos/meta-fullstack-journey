import "./App.css";
import ModeToggler from "./components/eventosDeUsuario/ModeToggler";
import Bowl from "./components/parent-child/Bowl";
import Dog from "./components/parent-child/Dog";
  function handleClick() {
    let randomNum = Math.floor(Math.random() * 3) + 1;
    console.log(randomNum)
    let userInput = prompt("Digite um número ")
    alert(`Número da máquina: ${randomNum}, Sua tentativa: ${userInput}`)
    if (randomNum == userInput) alert("Parabéns você acertou!!!")
  }

function App() {
  return (
    <>
      {/* <Btn /> */}
      <ModeToggler />
      <button onClick={handleClick}>Adivinhe um número entre 1 a 3</button>
      <Dog/>
      <Bowl name="Max" bowlShape="square" bowlStatus="full"/>
    </>
  );
}

export default App;
