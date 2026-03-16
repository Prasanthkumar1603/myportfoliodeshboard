import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExperienceComponent = () => {

  const [experiences, setExperiences] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingExperienceId, setEditingExperienceId] = useState(null);

  const [experienceData, setExperienceData] = useState({
    position: '',
    companyName: '',
    startDate: '',
    endDate: '',
    isPresent: false,
    description: '',
  });


  // Fetch experiences
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await axios.get('https://portfolio-backend-drhl.onrender.com/api/experience');
        setExperiences(response.data);
      } catch (error) {
        console.error('Error fetching experiences:', error);
      }
    };

    fetchExperiences();
  }, []);



  const handleInputChange = (e) => {

    const { name, value, type, checked } = e.target;

    setExperienceData({
      ...experienceData,
      [name]: type === 'checkbox' ? checked : value,
    });

  };



  const handleSubmit = async (e) => {

    e.preventDefault();

    if (editingExperienceId) {

      try {

        await axios.put(
          `https://portfolio-backend-drhl.onrender.com/api/experience/${editingExperienceId}`,
          experienceData
        );

        setExperiences((prev) =>
          prev.map((exp) =>
            exp._id === editingExperienceId ? { ...exp, ...experienceData } : exp
          )
        );

        alert('Experience updated successfully');

      } catch (error) {
        console.error('Error updating experience:', error);
      }

    } else {

      try {

        const response = await axios.post(
          'https://portfolio-backend-drhl.onrender.com/api/experience',
          experienceData
        );

        setExperiences([...experiences, response.data]);

        alert('Experience added successfully');

      } catch (error) {
        console.error('Error adding experience:', error);
      }

    }

    setShowModal(false);
    setEditingExperienceId(null);

    setExperienceData({
      position: '',
      companyName: '',
      startDate: '',
      endDate: '',
      isPresent: false,
      description: '',
    });

  };



  const handleEdit = (experience) => {

    setEditingExperienceId(experience._id);

    setExperienceData({
      position: experience.position,
      companyName: experience.companyName,
      startDate: experience.startDate,
      endDate: experience.endDate,
      isPresent: experience.isPresent,
      description: experience.description,
    });

    setShowModal(true);

  };



  return (

    <div className="experience-container">

      {/* HEADER BOX */}

      <div className="project-header-box">

        <h2 className="project-title">
          Manage Experience
        </h2>

        <button
          className="add-project-btn"
          onClick={() => setShowModal(true)}
        >
          + Add Experience
        </button>

      </div>



      {/* EXPERIENCE LIST */}

      <h3>Experience List</h3>

      <div className="experience-list">

        {experiences.map((experience) => (

          <li key={experience._id}>

            <div>

              <strong>{experience.position}</strong> at <em>{experience.companyName}</em>

              <p>
                {experience.startDate} - {experience.isPresent ? 'Present' : experience.endDate}
              </p>

              <p>{experience.description}</p>

              <button onClick={() => handleEdit(experience)}>
                Edit
              </button>

              <hr />

            </div>

          </li>

        ))}

      </div>



      {/* MODAL FORM */}

      {showModal && (

        <div className="modal-overlay">

          <div className="modal">

            <h3>
              {editingExperienceId ? 'Update Experience' : 'Add Experience'}
            </h3>

            <form onSubmit={handleSubmit}>

              <input
                type="text"
                name="position"
                placeholder="Position"
                value={experienceData.position}
                onChange={handleInputChange}
              />

              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={experienceData.companyName}
                onChange={handleInputChange}
              />

              <input
                type="date"
                name="startDate"
                value={experienceData.startDate}
                onChange={handleInputChange}
              />

              <input
                type="date"
                name="endDate"
                value={experienceData.isPresent ? '' : experienceData.endDate}
                disabled={experienceData.isPresent}
                onChange={handleInputChange}
              />

              <label>

                <input
                  type="checkbox"
                  name="isPresent"
                  checked={experienceData.isPresent}
                  onChange={handleInputChange}
                />

                Present

              </label>

              <textarea
                name="description"
                placeholder="Description"
                value={experienceData.description}
                onChange={handleInputChange}
              />

              <div className="modal-actions">

                <button type="submit">
                  {editingExperienceId ? 'Update' : 'Add'}
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

export default ExperienceComponent;