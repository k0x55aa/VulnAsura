import React from 'react';

interface LoginComponentProps {
  formData: {
    username: string;
    password: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  error: string;
}

const LoginComponent: React.FC<LoginComponentProps> = ({
  formData,
  handleChange,
  handleSubmit,
  error
}) => {
  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Email:</label>
          <input
            type="usernmae"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {error && <p className="error">{error}</p>} {/* Display error message */}

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginComponent;
