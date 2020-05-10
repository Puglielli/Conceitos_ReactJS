import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

const SIDES = ['Front-end', 'Back-end', 'Mobile'];

const COMPLEMENT = ['Weather', 'Calculator', 'API Rest', 'Rest', 'Locadora', 'Comanda'];

const TECHS = ['React', 'ReactJS', 'React Native', 'Java', 'Node.js'];

const REPOSITORIES = [
  'Rocketseat/bootcamp-gostack-desafios', 'Puglielli/bootcamp-gostack-desafios'];

function createNewRepository() {
  const title = `${SIDES[Math.round(Math.random() * (SIDES.length - 1))]} - `
              + `${COMPLEMENT[Math.round(Math.random() * (COMPLEMENT.length - 1))]} `;

  const url = `https://github.com/${REPOSITORIES[Math.round(Math.random() * (REPOSITORIES.length - 1))]}`;

  const techs = TECHS[Math.round(Math.random() * (TECHS.length - 1))];
  
  return {
    title,
    url,
    techs
  };
}

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setProjects(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', createNewRepository());
    
    const project = response.data;

    setProjects([...projects, project]);
  }

  async function handleRemoveRepository(id) {
   const response = await api.delete(`repositories/${id}`);
   
   if (response.status !== 204) return;
    
   const projectIndex = projects.findIndex(project => project.id === id);

   projects.splice(projectIndex, 1);

   setProjects([...projects]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {projects.map(project => <li key={project.id}>{project.title}
      
        <button onClick={() => handleRemoveRepository(project.id)}>
            Remover
          </button>
      </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
