import "./App.css";
import ModeToggler from "./components/eventosDeUsuario/ModeToggler";
import ReactConceptShowcase from "./components/conceitos-basicos/ReactConceptShowcase";
import Bowl from "./components/parent-child/Bowl";
import Dog from "./components/parent-child/Dog";
import React from "react";
import Fruits from "./components/gerenciando-estados/Fruits";
import FruitsCounter from "./components/gerenciando-estados/FruitsCounter";
function handleClick() {
  let randomNum = Math.floor(Math.random() * 3) + 1;
  console.log(randomNum);
  let userInput = prompt("Digite um número ");
  alert(`Número da máquina: ${randomNum}, Sua tentativa: ${userInput}`);
  if (randomNum == userInput) alert("Parabéns você acertou!!!");
}

function App() {
  const [fruits] = React.useState([
    { id: 1, fruitName: "Banana" },
    { id: 2, fruitName: "Maçã" },
    { id: 3, fruitName: "Laranja" },
    { id: 4, fruitName: "Abacaxi" },
  ]);

  return (
    <>
      {/* <Btn /> */}
      <ReactConceptShowcase />
      <ModeToggler />
      <button onClick={handleClick}>Adivinhe um número entre 1 a 3</button>
      <Dog />
      <Bowl name="Max" bowlShape="square" bowlStatus="full" />
      <Fruits fruits={fruits} />
      <FruitsCounter fruits={fruits} />
    </>
  );
}

export default App;
