import db from '../../models/index.js';
import postType from '../types/postType.js';
import postInputType from '../types/postInputType.js';

const createPostMutationResolver = async (_, { post }, context) => {
    const isAuthorized = !!context.user_id
   
    if(!isAuthorized) {
        return false;
    }
    
    const createdPost = await db.Post.create({
       title: post.title,
       body: post.body,
       userId: context.user_id,
    });

    return createdPost;
    
}

const createPostMutation = {
    type: postType,
    args: {
        post: {type: postInputType},
    },
    resolve: createPostMutationResolver,
};

export default createPostMutation;