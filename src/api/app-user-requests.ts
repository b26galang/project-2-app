import { url } from "./complaint-requests";

export type AppUser = {
    userId: number,
    username: string,
    password: string,
    role: string
}


export async function loginAppUser(username: string, password: string) {
    const response = await fetch(`${url}/login`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    });
    if (!response.ok) {
      throw new Error('Failed to verify login information');
    }
    const user = await response.json();
    return user;
}

  
  
  