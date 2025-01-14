import React, { useState } from "react";
import Input from "./Input";

function MovieForm({ onAddMovie, database }) {
  const [title, setTitle] = useState("");

  const handleChange = (e) => setTitle(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title) return;

    onAddMovie(title, database);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        aria-label="New Movie"
        onChange={handleChange}
        placeholder="Digite o nome do filme..."
        type="text"
        value={title}
      />
    </form>
  );
}

export default MovieForm;
