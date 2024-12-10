import Link from "next/link";
import CommentList from "@/components/common/comment-list";
import CommentCreateForm from "@/components/common/comment-create-form";
import paths from "@/paths";
import PostShow from '@/components/posts/post-show';

interface PostShowPageProps {
  params: Promise<{
    slug: string;
    postId: string;
  }>;
}

export default async function PostShowPage({ params }: PostShowPageProps) {
  const { slug, postId } = await params;

  return (
    <div className="space-y-3">
      <Link className="underline decoration-solid" href={paths.topicShow(slug)}>
        {"< "}Back to {slug}
      </Link>
      <PostShow postId={postId} />
      <CommentCreateForm postId={postId} startOpen />
      <CommentList postId={ postId } />
    </div>
  );
}
