// src/ExperienceComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
 
const ExperienceComponent = () => {
  const [experiences, setExperiences] = useState([]);
  const [experienceData, setExperienceData] = useState({
    position: '',
    companyName: '',
    startDate: '',
    endDate: '',
    isPresent: false,
    description: '',
  });
  const [editingExperienceId, setEditingExperienceId] = useState(null);

  // Fetch experiences
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/experience');
        setExperiences(response.data);
      } catch (error) {
        console.error('Error fetching experiences:', error);
      }
    };

    fetchExperiences();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setExperienceData({
      ...experienceData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Submit a new experience or update an existing one
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingExperienceId) {
      // Update an existing experience
      try {
        await axios.put(`http://localhost:5000/api/experience/${editingExperienceId}`, experienceData);
        setExperiences((prev) =>
          prev.map((exp) =>
            exp._id === editingExperienceId ? { ...exp, ...experienceData } : exp
          )
        );
        alert('Experience updated successfully');
        setEditingExperienceId(null); // Clear editing state
      } catch (error) {
        console.error('Error updating experience:', error);
      }
    } else {
      // Post a new experience
      try {
        const response = await axios.post('http://localhost:5000/api/experience', experienceData);
        setExperiences([...experiences, response.data]);
        alert('Experience added successfully');
      } catch (error) {
        console.error('Error adding experience:', error);
      }
    }

    // Reset the form
    setExperienceData({
      position: '',
      companyName: '',
      startDate: '',
      endDate: '',
      isPresent: false,
      description: '',
    });
  };

  // Edit an experience
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
  };

  return (
    <div className="experience-container">
      <h2>Manage Experience</h2>
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
          placeholder="Start Date"
          value={experienceData.startDate}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="endDate"
          placeholder="End Date"
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
        <button type="submit">{editingExperienceId ? 'Update Experience' : 'Add Experience'}</button>
      </form>

      <h3>Experience List</h3>
      <div className="experience-list">
        {experiences.map((experience) => (
          <li key={experience._id}>
            <div>
              <strong>{experience.position}</strong> at <em>{experience.companyName}</em>
              <p>{experience.startDate} - {experience.isPresent ? 'Present' : experience.endDate}</p>
              <p>{experience.description}</p>
              <button onClick={() => handleEdit(experience)}>Edit</button>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
};

export default ExperienceComponent;
