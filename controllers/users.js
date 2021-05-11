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

const getUserInformation = async () => {
  const response = await fetch(`api/users/me`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'something_went_wrong');
  }
  return data;
};

const updateUserInfo = async (name, about, owner) => {
  const response = await fetch(`api/users/me`, {
    method: 'PATCH',
    body: JSON.stringify({ name, about, owner }),
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

export { createUser, getUserInformation, updateUserInfo };
