import ReactConceptCard from "./ReactConceptCard";

export default function ReactConceptShowcase() {
  return (
    <section className="concept-showcase">
      <h1>Props e useState em acao</h1>
      <p>
        O componente pai envia informacoes para o filho por props. Dentro do
        filho, o `useState` decide quando mostrar uma explicacao maior.
      </p>

      <ReactConceptCard
        title="Props"
        summary="Props sao valores enviados do componente pai para o componente filho."
        details="Neste exemplo, o titulo, o resumo e esta explicacao foram passados pelo componente pai."
      />
    </section>
  );
}
