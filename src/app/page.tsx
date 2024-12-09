import TopicCreateForm from '@/components/topics/topic-create-form';
import TopicList from '@/components/topics/topic-list';
import { Divider } from '@nextui-org/react';

export default async function Home() {

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-xl m-2">Top Posts</h1>
      </div>
      <div className='border shadow py-3 px-2'>
        <TopicCreateForm/>
        <Divider className='mt-2 mb-2'/>
        <h3 className="text-lg">Topics</h3>
        <TopicList/>
      </div>
    </div>
  );
}