export const toUserNode = (user: any) => {
  return {
    id: user.id,
    username: user.username,
    first_name: user.first_name,
    last_name: user.last_name,
    date_joined: user.date_joined,
  };
};
