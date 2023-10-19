export const PagesPaths = {
  Main: '/',
  Post: (id?: number) => `/post/${id ?? ':id'}`,
};
