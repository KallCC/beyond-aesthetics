export const userQuery = (userId: string) => {
  const query = `*[_type == "user" && _id == '${userId}' ]{
      _id,
      image,
      userName,
      save[]{
        postId,
        _key,
        post->{
          _id
        },
      }
    }`;

  return query;
}

export const searchQuery = (searchTerm: string) => {
  const query = `*[ _type == "post" && !(_id in path("drafts.**")) && ( title match '${searchTerm}*' || aesthetic match '${searchTerm}*' || about match '${searchTerm}*' )]{
        image {
            asset ->{
                url
            }
        },
        _id,
        _rev,
        externalLink,
        postedBy ->{
            _id,
            userName,
            image
        }
    }`;

  return query;
}

export const allPostsQuery = `*[_type == "post" && !(_id in path("drafts.**"))] | order(_createdAt desc){
        title,    
        image {
            asset ->{
                url
            }
        },
        _id,
        externalLink,
        postedBy ->{
            _id,
            userName,
            image
        },
        _rev,
        aesthetic
    }`;

export const postsDetailQuery = (postId: string, _rev: string | undefined) => {

  let revCondition = '';
  if (_rev) {
    revCondition = `&& _rev == '${_rev}'`;
  }

  const query = `*[_type == "post" && _id == '${postId}'${revCondition}] {
          image{
            asset->{
              url
            }
          },
          _id,
          _updatedAt,
          title, 
          about,
          aesthetic,
          _rev,
          externalLink,
          postedBy->{
            _id,
            userName,
            image
          },
          comments[]{
            comment,
            _key,
            postedBy->{
              _id,
              userName,
              image
            },
          }
        }`;
  return query;
};

export const relatedAestheticsQuery = (post: string) => {
  const query = `*[_type == "post" && aesthetic == '${post.aesthetic}' && (_id != '${post._id}'  &&  !(_id in path("drafts.**")))  ]{
        title,    
        image {
            asset ->{
                url
            }
        },
        _id,
        _rev,
        externalLink,
        postedBy ->{
            _id,
            userName,
            image
        },
        aesthetic,
        }`;
  return query;
};

export const userCreatedPostsQuery = (userId: string) => {
  const query = `*[ _type == 'post' && userId == '${userId}' &&  !(_id in path("drafts.**"))]  | order(_createdAt desc){
    image{
      asset->{
        url
      }
    },
    _id,
    _rev,
    externalLink,
    postedBy->{
      _id,
      userName,
      image
    }
  }`;
  return query;
};

export const userSavedPostsQuery = () => {
  const query = `[ _id in $userIds && !(_id in path("drafts.**"))] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    _id,
    _rev,
    externalLink,
    postedBy->{
      _id,
      userName,
      image
    }
  }`;
  return query;
};


export const allSavedPostsQuery = () => {
  const query = `*[_type == "post" && _id in $postsIds && !(_id in path("drafts.**"))] | order(_createdAt desc){
  title,    
  image {
      asset ->{
          url
      }
  },
  _id,
  externalLink,
  postedBy ->{
      _id,
      userName,
      image
  },
  _rev,
  aesthetic
}`;
  return query;
}