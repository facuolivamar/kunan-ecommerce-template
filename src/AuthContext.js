import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [authenticated, setAuthenticated] = useState(null);

  // Función para realizar la autenticación y almacenar el token de acceso
  async function authenticateUser(grant_type, client_id, client_secret) {
    try {
      // Realiza la autenticación y obtén el token de acceso
      const response = await fetch('https://devphp7.democrm.com.ar/crmgrunhaut/Api/access_token', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijc4MTU5OTIxZjkxYmQxNThjOGIyMTU4YmMzNjhmMTM5ZTJiYjExN2IyYzQ4ZTJkNzA0NzkyMjJiNmY0YjI4ZTQ5NTQxMWM1ODJjNzc4MTQzIn0.eyJhdWQiOiI2YWMxYjY1OC1jZTRmLTRlZDQtYzNlMi02M2U0ZWVhNjUyYTQiLCJqdGkiOiI3ODE1OTkyMWY5MWJkMTU4YzhiMjE1OGJjMzY4ZjEzOWUyYmIxMTdiMmM0OGUyZDcwNDc5MjIyYjZmNGIyOGU0OTU0MTFjNTgyYzc3ODE0MyIsImlhdCI6MTY5NDc4MzU5MiwibmJmIjoxNjk0NzgzNTkyLCJleHAiOjE2OTQ3ODcxOTIsInN1YiI6IiIsInNjb3BlcyI6W119.YSRWmH5bdmJT_8zyiuHTgrMxURokhXRnPq3PIyDZA-v1qQV0d9ilHz5uDP6TpO6JMQUlqkT1y5RMjj0RJfZbsFQLtXWVyFC6BEykjItAKENu9C3MDgRf4seHXyK6Wvv59OXsXfmslZ0vKHUK2f72hSLMYjPZVUjZnhkQr44WnCFS8sSI_wIbdfv52qKAXAZDwSbdmUM_-Tv3tXJCo5PYh7kcbaNsw45wcfc4qlmyNU4WL1E5iV7b-A29Bcdjg123vIU8y0ko8hOYKhg5Kbg7Ze5veT-rTKsk0hL-gdUIn98VsZ_kB5oP5SGiw7ZzX_HPtc1UxKaVlJWJpJJyH3qREw'
        },
        body: JSON.stringify({
          "grant_type": grant_type,
          "client_id": client_id,
          "client_secret": client_secret
        }),
      });

      if (response.status === 200) {
        const data = await response.json();
        // console.log(data);
        setAccessToken(data.access_token);
        setAuthenticated(true); // Establece el estado como autenticado
      } else {
        throw new Error('Autenticación fallida');
      }
    } catch (error) {
      console.error('Error durante la autenticación:', error);
      throw error;
    }
  }

  return (
    <AuthContext.Provider value={{ accessToken, authenticated, authenticateUser }}>
      {children}
    </AuthContext.Provider>
  );
}
