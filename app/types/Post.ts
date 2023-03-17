export type PostType = {
  title: string;
  id: string;
  updatedAt?: string;
  user: {
    email: string;
    id: string;
    name: string;
    image: string;
  };
  Comment?: {
    createdAt?: string;
    id: string;
    postId: string;
    title: string;
    userId: string;
    user: {
      email: string;
      id: string;
      image: string;
      name: string;
    };
  }[];
};
