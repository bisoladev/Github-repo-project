import axios from 'axios';

const fetchUserData = async (username: string) => {
  const headers = {
    Authorization: `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`,
    'X-GitHub-Api-Version': '2022-11-28',
  };

  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}`,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Error fetching user data');
  }
};

export default fetchUserData;
