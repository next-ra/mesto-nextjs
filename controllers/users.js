const createUser = async (name, email, password) => {
  const response = await fetch(`/api/auth/signup`, {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'something_went_wrong');
  }
  return data;
};

const updateUserInfo = async (userData) => {
  const response = await fetch(`api/users/${userData.userId}`, {
    method: 'PATCH',
    body: JSON.stringify(userData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'something_went_wrong');
  }
  return data;
};

export { createUser, updateUserInfo };
