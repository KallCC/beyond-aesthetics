interface User {
    _key?: string;
    _id?: string;
    _type?: string;
    image?: string;
    _ref?: string;
    userName?: string;
    save?: Save[];
}

interface Save {
    _key?: string;
    postId: string;
    post: Post
}

interface Post {
    _key?: string;
    _id?: string;
    _rev?: string;
    _type?: string;
    about?: string;
    aesthetic?: string;
    image?: {
        _type: string,
        asset: {
            _type: string,
            _ref: string,
            url?: string
        },
    };
    title?: string;
    userId?: string;
    postedBy?: User;
    externalLink?: string;
    comments?: Comment[];
}

interface Comment {
    _key?: string;
    comment: string;
    postedBy: User;
}

interface Aesthetic {
    id: number;
    name: string;
    wiki: string;
    photo_filename: string;
    hasImg: number;
    decade_of_origin?: string;
}

export {
    Aesthetic,
    User,
    Save,
    Post,
    Comment
}