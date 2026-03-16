
import React, { useState, useEffect } from "react";
import axios from "axios";

const ProjectComponent = () => {

  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);

  const [projectData, setProjectData] = useState({
    projectName: "",
    description: "",
    imageURL: "",
    sourceCodeLink: ""
  });


  // Fetch Projects
  useEffect(() => {

    const fetchProjects = async () => {
      try {
        const res = await axios.get(
          "https://portfolio-backend-drhl.onrender.com/api/projects"
        );
        setProjects(res.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();

  }, []);



  // Input change
  const handleInputChange = (e) => {
    setProjectData({
      ...projectData,
      [e.target.name]: e.target.value
    });
  };



  // Submit
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (editingProjectId) {

        await axios.put(
          `https://portfolio-backend-drhl.onrender.com/api/projects/${editingProjectId}`,
          projectData
        );

        setProjects((prev) =>
          prev.map((p) =>
            p._id === editingProjectId ? { ...p, ...projectData } : p
          )
        );

        alert("Project updated successfully");

      } else {

        const res = await axios.post(
          "https://portfolio-backend-drhl.onrender.com/api/projects",
          projectData
        );

        setProjects([...projects, res.data]);

        alert("Project added successfully");

      }

      setShowModal(false);
      setEditingProjectId(null);

      setProjectData({
        projectName: "",
        description: "",
        imageURL: "",
        sourceCodeLink: ""
      });

    } catch (error) {

      console.error("Error saving project:", error);

    }

  };



  // Edit project
  const handleEdit = (project) => {

    setEditingProjectId(project._id);

    setProjectData({
      projectName: project.projectName,
      description: project.description,
      imageURL: project.imageURL,
      sourceCodeLink: project.sourceCodeLink
    });

    setShowModal(true);

  };



  return (

    <div className="project-container">

      <div className="project-header-box">

        <h2 className="project-title">
          Manage Projects
        </h2>

        <button
          className="add-project-btn"
          onClick={() => setShowModal(true)}
        >
          + Add Project
        </button>

      </div>



      {/* PROJECT LIST */}

      <div className="projects-grid">

        {projects.map((project) => (

          <div className="project-card" key={project._id}>

            <div className="project-image">
              <img src={project.imageURL} alt={project.projectName} />
            </div>

            <div className="project-content">

              <h4>{project.projectName}</h4>

              <p>{project.description}</p>

              <div className="project-actions">

                <a
                  href={project.sourceCodeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Source
                </a>

                <button
                  onClick={() => handleEdit(project)}
                >
                  Edit
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>



      {/* MODAL */}

      {showModal && (

        <div className="modal-overlay">

          <div className="modal">

            <h3>
              {editingProjectId ? "Edit Project" : "Add Project"}
            </h3>

            <form onSubmit={handleSubmit}>

              <input
                type="text"
                name="projectName"
                placeholder="Project Name"
                value={projectData.projectName}
                onChange={handleInputChange}
                required
              />

              <textarea
                name="description"
                placeholder="Description"
                value={projectData.description}
                onChange={handleInputChange}
                required
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

              <div className="modal-actions">
                <button type="submit">
                  {editingProjectId ? "Update" : "Add"}
                </button>

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>

            </form>

          </div>

        </div>

      )}

    </div>

  );

};

export default ProjectComponent;