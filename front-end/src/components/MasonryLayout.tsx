import Masonry from 'react-masonry-css'
import { Post } from '../ts/interfaces'
import PostContainer from './Post'

const breakpointColumnsObj = {
  default: 4,
  1200: 3,
  1000: 2,
  500: 1
}

type Props = {
  posts: Post[]
}

const MasonryLayout: React.FC<Props>  = ({ posts }: Props) => {

  return (
    <section aria-label='Display Posts'>
      <Masonry className='flex animate-slide-fwd' breakpointCols={breakpointColumnsObj}>
        {posts?.map((post) =>
          <article key={post._id} aria-label='Post'>
            <PostContainer {...post} />
          </article>)}
      </Masonry>
    </section>
  )
}

export default MasonryLayout