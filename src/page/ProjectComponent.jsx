// src/ProjectComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectComponent = () => {
  const [projects, setProjects] = useState([]);
  const [projectData, setProjectData] = useState({
    projectName: '',
    description: '',
    imageURL: '',
    sourceCodeLink: '',
  });
  const [editingProjectId, setEditingProjectId] = useState(null);

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('https://portfolio-backend-drhl.onrender.com/api/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    setProjectData({
      ...projectData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit a new project or update an existing one
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingProjectId) {
      // Update an existing project
      try {
        await axios.put(`https://portfolio-backend-drhl.onrender.com/api/projects/${editingProjectId}`, projectData);
        setProjects((prev) =>
          prev.map((project) =>
            project._id === editingProjectId ? { ...project, ...projectData } : project
          )
        );
        alert('Project updated successfully');
        setEditingProjectId(null); // Clear editing state
      } catch (error) {
        console.error('Error updating project:', error);
      }
    } else {
      // Post a new project
      try {
        const response = await axios.post('https://portfolio-backend-drhl.onrender.com/api/projects', projectData);
        setProjects([...projects, response.data]);
        alert('Project added successfully');
      } catch (error) {
        console.error('Error adding project:', error);
      }
    }

    // Reset the form
    setProjectData({
      projectName: '',
      description: '',
      imageURL: '',
      sourceCodeLink: '',
    });
  };

  // Edit a project
  const handleEdit = (project) => {
    setEditingProjectId(project._id);
    setProjectData({
      projectName: project.projectName,
      description: project.description,
      imageURL: project.imageURL,
      sourceCodeLink: project.sourceCodeLink,
    });
  };

  return (
    <div className="project-container">
      <h2>Manage Projects</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="projectName"
          placeholder="Project Name"
          value={projectData.projectName}
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={projectData.description}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="imageURL"
          placeholder="Image URL"
          value={projectData.imageURL}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="sourceCodeLink"
          placeholder="Source Code Link"
          value={projectData.sourceCodeLink}
          onChange={handleInputChange}
        />
        <button type="submit">{editingProjectId ? 'Update Project' : 'Add Project'}</button>
      </form>

      <h3>Projects List</h3>
      <div className="projects-grid">
        {projects.map((project) => (
          <div className="project-card" key={project._id}>

            <div className="project-image">
              <img
                src={project.imageURL}
                alt={project.projectName}
              />
            </div>

            <div className="project-content">
              <h4 className="project-title">{project.projectName}</h4>
              <p className="project-desc">{project.description}</p>

              <div className="project-actions">
                <a
                  href={project.sourceCodeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="source-link"
                >
                  View Source Code
                </a>

                <button
                  className="edit-btn"
                  onClick={() => handleEdit(project)}
                >
                  Edit
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectComponent;
