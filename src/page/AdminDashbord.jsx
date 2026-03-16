
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {

  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);

  const [totalMessages, setTotalMessages] = useState(0);
  const [totalProjects, setTotalProjects] = useState(0);

  const [displayMessages, setDisplayMessages] = useState(0);
  const [displayProjects, setDisplayProjects] = useState(0);

  const [experience, setExperience] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const totalCertificates = 9;

  const [displayCertificates, setDisplayCertificates] = useState(0);



  // COUNTER ANIMATION FUNCTION
  const animateCounter = (target, setter) => {

    let start = 0;

    const duration = 1000;
    const increment = target / (duration / 16);

    const counter = setInterval(() => {

      start += increment;

      if (start >= target) {
        setter(target);
        clearInterval(counter);
      } else {
        setter(Math.floor(start));
      }

    }, 16);

  };



  // EXPERIENCE CALCULATION
  const calculateExperience = (experienceData) => {

    let totalMonths = 0;

    experienceData.forEach((exp) => {

      const start = new Date(exp.startDate);
      const end = exp.endDate ? new Date(exp.endDate) : new Date();

      const months =
        (end.getFullYear() - start.getFullYear()) * 12 +
        (end.getMonth() - start.getMonth());

      totalMonths += months;

    });

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    return `${years} Year ${months} Month`;

  };



  useEffect(() => {

    const fetchDashboardData = async () => {

      try {

        const [messagesRes, projectsRes, experienceRes] = await Promise.all([
          axios.get("https://portfolio-backend-drhl.onrender.com/api/messages"),
          axios.get("https://portfolio-backend-drhl.onrender.com/api/projects"),
          axios.get("https://portfolio-backend-drhl.onrender.com/api/experience")
        ]);


        // Messages
        const msgCount = messagesRes.data.length;

        setMessages(messagesRes.data);
        setFilteredMessages(messagesRes.data);

        setTotalMessages(msgCount);
        animateCounter(msgCount, setDisplayMessages);



        // Projects
        const projectCount = projectsRes.data.length;

        setTotalProjects(projectCount);
        animateCounter(projectCount, setDisplayProjects);

        animateCounter(totalCertificates, setDisplayCertificates);

        // Experience
        const totalExp = calculateExperience(experienceRes.data);
        setExperience(totalExp);



        setLoading(false);

      } catch (error) {

        console.error("Error loading dashboard:", error);
        setLoading(false);

      }

    };

    fetchDashboardData();

  }, []);



  const handleSearch = (e) => {

    const value = e.target.value.toLowerCase();
    setSearchQuery(value);

    const filtered = messages.filter((msg) =>
      msg.name.toLowerCase().includes(value) ||
      msg.email?.toLowerCase().includes(value) ||
      msg.message.toLowerCase().includes(value)
    );

    setFilteredMessages(filtered);

  };



  const deleteMessage = async (id) => {

    try {

      await axios.delete(
        `https://portfolio-backend-drhl.onrender.com/api/messages/${id}`
      );

      const updatedMessages = messages.filter((msg) => msg._id !== id);

      setMessages(updatedMessages);
      setFilteredMessages(updatedMessages);

      const newCount = updatedMessages.length;
      setTotalMessages(newCount);
      animateCounter(newCount, setDisplayMessages);

      alert("Message Deleted Successfully");

    } catch (error) {

      console.error("Error deleting message:", error);

    }

  };



  const deleteAllMessages = async () => {

    try {

      await axios.delete(
        "https://portfolio-backend-drhl.onrender.com/api/messages"
      );

      setMessages([]);
      setFilteredMessages([]);

      setTotalMessages(0);
      animateCounter(0, setDisplayMessages);

    } catch (error) {

      console.error("Error deleting all messages:", error);

    }

  };



  if (loading) {
    return <div className="dashboard-content">Loading Dashboard...</div>;
  }



  return (

    <div className="dashboard-content">

      {/* DASHBOARD STATS */}

      <div className="stats-grid">

        <div className="stat-card">
          <h3>{displayProjects}</h3>
          <p>Total Projects</p>
        </div>

        <div className="stat-card">
          <h3>{displayCertificates}</h3>
          <p>Certificates</p>
        </div>

        <div className="stat-card">
          <h3>{experience}</h3>
          <p>Experience</p>
        </div>

        <div className="stat-card">
          <h3>{displayMessages}</h3>
          <p>Total Enquiries</p>
        </div>

      </div>



      <h2 className="page-title">Messages</h2>



      <div className="top-bar">

        <input
          type="text"
          placeholder="Search messages..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />

        <button className="delete-all-btn" onClick={deleteAllMessages}>
          Delete All
        </button>

      </div>



      <div className="table-wrapper">

        {filteredMessages.length > 0 ? (

          <table className="message-table">

            <thead>
              <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredMessages.map((msg) => (

                <tr key={msg._id}>

                  <td>{msg.name}</td>

                  <td>{msg.email || msg.whatsapp}</td>

                  <td>{msg.message}</td>

                  <td>{new Date(msg.createdAt).toLocaleString()}</td>

                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteMessage(msg._id)}
                    >
                      Delete
                    </button>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        ) : (

          <p>No messages available</p>

        )}

      </div>



      {/* MOBILE VIEW */}

      <div className="mobile-cards">

        {filteredMessages.map((msg) => (

          <div className="message-card" key={msg._id}>

            <p><strong>Name:</strong> {msg.name}</p>

            <p><strong>Contact:</strong> {msg.email || msg.whatsapp}</p>

            <p><strong>Message:</strong> {msg.message}</p>

            <p className="date">
              {new Date(msg.createdAt).toLocaleString()}
            </p>

            <button
              className="delete-btn"
              onClick={() => deleteMessage(msg._id)}
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>

  );

};

export default AdminDashboard;

