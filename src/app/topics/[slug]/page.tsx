import CommentList from '@/components/porsts/comment-list';
import PostCreateForm from "@/components/porsts/post-create-form";
import PostList from '@/components/porsts/post-list';
import { fetchPostByTopicSlug } from '@/db/queries/posts';
import { Divider } from '@nextui-org/react';

interface TopicShowPageProps {
  params: {
    slug: string
  }
}

export default function TopicShowPage({ params }: TopicShowPageProps) {
  const { slug } = params

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold mb-2">{slug}</h1>
        <PostList fetchData={() => fetchPostByTopicSlug(slug)} />
      </div>
      <div className="border shadow py-3 px-2">
        <PostCreateForm slug={slug} />
        <Divider className="mt-2 mb-2" />
        <h3 className="text-lg">Topics</h3>
        <p className="p-4 font-light">description here</p>
      </div>
    </div>
  );
}
