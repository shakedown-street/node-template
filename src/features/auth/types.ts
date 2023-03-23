export const toUserNode = (user: any) => {
  return {
    id: user.id,
    username: user.username,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };
};
