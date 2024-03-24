import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUser } from '../services/sessionsService';

/**
 * Custom hook to fetch and authenticate the user.
 * @returns {string|null} The username of the authenticated user, undefined if not resolved, or null if not authenticated.
 */
export const useAuthenticatedUser = () => {
  const [username, setUsername] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const username = await fetchUser();
      if (username) {
        setUsername(username);
      } else {
        setUsername(null);
        navigate('/'); // redirect to home page if user is not authenticated
      }
    };
    load();
  }, []); // Empty array means this effect runs once on mount and not on updates

  return username;
};
