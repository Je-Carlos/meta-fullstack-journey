import { useState } from "react";

export default function ReactConceptCard({ title, summary, details }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <article className="concept-card">
      <span className="concept-card__tag">Props do pai</span>
      <h2>{title}</h2>
      <p>{summary}</p>
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "Ocultar detalhes" : "Ver detalhes"}
      </button>
      {showDetails && (
        <p className="concept-card__details">
          {details} Este texto aparece porque o `useState` controla o estado
          local do componente filho.
        </p>
      )}
    </article>
  );
}
