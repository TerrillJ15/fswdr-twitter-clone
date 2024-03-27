import { createContext } from 'react';

/**
 * Context object for managing the current username.
 *
 * @property {string} user The current username of the user that is signed in. Undefined if not loaded, null if not authorized.
 * @property {function} setUser Function to set the current username.
 * @property {boolean} rememberMe True if the user should stay logged in after the browser is closed.
 * @property {function} setRememberMe Function to set the rememberMe value.
 */
export const AppContext = createContext();
