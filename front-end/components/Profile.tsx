import React, { useEffect, useState } from 'react';

const Profile: React.FC = () => {
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Ensure the code runs only on the client side
    if (typeof window !== 'undefined') {
      const fetchProfile = async () => {
        const token = localStorage.getItem('authToken');  // Accessing localStorage

        if (!token) {
          setError('Authorization token is missing!');
          setLoading(false);
          return;
        }

        try {
          const response = await fetch('http://127.0.0.1:8080/profile', {
            method: 'GET',
            headers: {
              'Authorization': `${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch profile data');
          }

          const data = await response.json();
          setProfileData(data.data);  // Assuming profile data is in data.data
          setLoading(false);
        } catch (err: any) {
          setError(err.message || 'Something went wrong');
          setLoading(false);
        }
      };

      fetchProfile();
    }
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div>
        <p><strong>Profile Data:</strong></p>
        <pre>{JSON.stringify(profileData, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Profile;
