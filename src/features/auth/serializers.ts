export const userSerializer = (user: any) => {
  return {
    id: user.id,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    date_joined: user.date_joined,
  };
};
