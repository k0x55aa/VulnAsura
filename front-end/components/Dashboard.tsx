// Dashboard.tsx
import React, { useState, useEffect } from 'react';

const dummyData = [
    { id: 1, name: 'John Doe <script>alert("XSS")</script>', role: 'Admin' },
    { id: 2, name: 'Jane Smith', role: 'User' },
    { id: 3, name: 'Alice Johnson', role: 'Moderator' },
    { id: 4, name: 'Bob Brown', role: 'User' },
    { id: 5, name: 'Charlie Davis', role: 'Admin' },
  ];
  
  const Dashboard: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredData, setFilteredData] = useState(dummyData);
  
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const term = e.target.value.toLowerCase();
      setSearchTerm(term);
  
      const filtered = dummyData.filter(
        (item) =>
          item.name.toLowerCase().includes(term) ||
          item.role.toLowerCase().includes(term)
      );
      setFilteredData(filtered);
    };
  
    return (
      <div className="dashboard-container">
        <h1>Dashboard</h1>
        
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name or role..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
  
        <div className="results-container">
          {filteredData.length === 0 ? (
            <p>No results found</p>
          ) : (
            <ul>
              {filteredData.map((item) => (
                // Rendering user input directly without sanitization
                <li key={item.id} className="result-item">
                  <h3>{item.name}</h3> {/* This is vulnerable to XSS */}
                  <p>Role: {item.role}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  };

  export default Dashboard;