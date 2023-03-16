import { useEffect } from 'react';
import MasonryLayout from './MasonryLayout';
import InfinityLoading from './InfinityLoading';
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { selectAllposts, getPostsStatus, getPostsError, fetchPosts, fetchTearmPosts } from '../features/posts/postsSlice';
import { getActiveAesthetic } from '../features/ui/uiSlice';

interface searchProps {
  searchTerm: string
}

const Search: React.FC<searchProps> = ({ searchTerm }: searchProps) => {
  const dispatch = useAppDispatch()

  const posts = useAppSelector(selectAllposts)
  const postStatus = useAppSelector(getPostsStatus);
  const error = useAppSelector(getPostsError);
  const aesthetic = useAppSelector(getActiveAesthetic);

  useEffect(() => {        
    if (postStatus === 'idle') {
      searchTerm !== '' ? dispatch(fetchTearmPosts(searchTerm)) : dispatch(fetchPosts());
    }
  }, [dispatch, postStatus, searchTerm])

  let content;
  if (postStatus === 'loading') {
    content = <InfinityLoading message="Searching posts" />;
  } else if (postStatus === 'succeeded') {
    if (posts?.length !== 0) {
      content = <MasonryLayout posts={posts} />
    } else {
      content = <div className="mt-10 text-center text-xl dark:text-white ">No Posts Found{aesthetic ? ' on ' + aesthetic.name : ''}!</div>
    }
  } else if (postStatus === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <div>
      {content}
    </div>
  );
};

export default Search;