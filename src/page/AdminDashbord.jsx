// src/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(''); // State for search input
    const [filteredMessages, setFilteredMessages] = useState([]); // Filtered messages

    // Fetch messages from the backend
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get('https://portfolio-backend-drhl.onrender.com/api/messages');
                setMessages(response.data);
                setFilteredMessages(response.data); // Initialize filtered messages
                setLoading(false);
            } catch (error) {
                console.error('Error fetching messages:', error);
                setLoading(false);
            }
        };

        fetchMessages();
    }, []);

    // Handle search input change
    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchQuery(value);

        // Filter messages based on search query
        const filtered = messages.filter((msg) =>
            msg.name.toLowerCase().includes(value) ||
            msg.email.toLowerCase().includes(value) ||
            msg.message.toLowerCase().includes(value)
        );
        setFilteredMessages(filtered);
    };

    // Delete a single message by ID
    const deleteMessage = async (id) => {
        try {
            await axios.delete(`https://portfolio-backend-drhl.onrender.com/api/messages/${id}`);
            setMessages(messages.filter((msg) => msg._id !== id));
            setFilteredMessages(filteredMessages.filter((msg) => msg._id !== id)); // Update filtered messages
            alert('Message Deleted Successfully');
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    // Delete all messages
    const deleteAllMessages = async () => {
        try {
            await axios.delete('https://portfolio-backend-drhl.onrender.com/api/messages');
            setMessages([]); // Clear the state
            setFilteredMessages([]); // Clear filtered messages
        } catch (error) {
            console.error('Error deleting all messages:', error);
        }
    };

    if (loading) {
        return <div>Loading messages...</div>;
    }

return (
  <div className="admin-dashboard">
    <h2 className="page-title">Messages</h2>

    {/* Top controls */}
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

    {/* Desktop Table */}
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

    {/* Mobile Cards */}
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
