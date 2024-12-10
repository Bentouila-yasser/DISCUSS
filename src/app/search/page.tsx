import PostList from '@/components/posts/post-list';
import { fetchPostBySearchTerm } from '@/db/queries/posts';
import paths from '@/paths';
import { redirect } from 'next/navigation';

interface SearchPageProps {
  searchParams: {
    term: string,
  }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const term = searchParams.term

  if (typeof term !== "string" || !term) {
    redirect(paths.home());
  }


  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-xl m-2">{`Search results for: ${term}`}</h1>
        <PostList fetchData={() => fetchPostBySearchTerm(term)} />
      </div>
    </div>
  );
}
