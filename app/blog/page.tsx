'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type post = {
	id: string;
	title: string;
	date: string;
};

export default function Blog() {

  const [posts, setPosts] = useState<post[]>([]);

  useEffect(() => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data: post[]) => setPosts(data));
  }, []);

  if (!posts.length) return <p>Loading...</p>;

  return (
	<>
    <ul>
      <li>
	      <p className="text-lg"><Link className="link" href="/blog/greetings">Greetings</Link></p>
        <p>Welcome to the blackmathx blog</p>
        <hr/>
    </li>
    
      {posts.map((post) => (
        <li key={post.id}>
			<p>{post.title}</p>
			<p>{post.date}</p>
			<hr/>
		</li>
		
      ))}
    </ul>
	</>

  );
}
