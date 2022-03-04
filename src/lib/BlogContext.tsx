import React, { createContext, ReactNode, useContext, useState } from 'react';
import blogJson from 'public/blog.json';

type BlogContext = Blog;
const initialState: BlogContext = blogJson;
const BlogContext = createContext<BlogContext>(initialState);

// interface BlogProviderProps {
//   children: ReactNode;
// }
// export const useBlogContext = (): BlogContext => {
//   return useContext(BlogContext);
// };

// export default function BlogProvider({ children }: BlogProviderProps) {
//   const [blog] = useState<Blog>(blogJson);

//   return <BlogContext.Provider value={blog}>{children}</BlogContext.Provider>;
// }
