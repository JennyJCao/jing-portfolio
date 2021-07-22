import React, {useRef, useState} from "react";
import { getDataFromTree } from '@apollo/react-ssr';
import { toast } from 'react-toastify';

import BaseLayout from "@/layouts/BaseLayout";
import {useGetTopicBySlug,
  useGetPostsByTopic, useCreatePost,
  useGetUser} from '@/apollo/actions';
import {useRouter} from "next/router";
import withApollo from "@/hoc/withApollo";
import PostItem from "@/components/forum/PostItem";
import Replier from "@/components/shared/Replier";


const useInitialData = () => {
  const router = useRouter();
  const {slug} = router.query;
  const {data: dataT} = useGetTopicBySlug({variables: {slug}});
  const {data: dataP} = useGetPostsByTopic({variables: {slug}});
  const {data: dataU} = useGetUser();
  const topic = (dataT && dataT.topicBySlug) || {};
  const posts = (dataP && dataP.postsByTopic) || [];
  const user = (dataU && dataU.user) || null;
  return {topic, posts, user};
}

const PostPage = () => {

  const {topic, posts, user} = useInitialData();

  return (
    <BaseLayout>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>{topic.title}</h1>
          </div>
        </div>
      </section>
      <Posts posts={posts} topic={topic} user={user}/>
    </BaseLayout>
  )
}

const Posts = ({posts, topic, user}) => {
  const pageEnd = useRef();
  const [createPost, {error}] = useCreatePost();
  const [isReplierOpen, setReplierOpen] = useState(false);
  // replyTo 指的是 post
  const [replyTo, setReplyTo] = useState(null);

  const handleCreatePost = async (reply, resetReplier) => {
    if (replyTo) {
      reply.parent = replyTo._id;
    }
    reply.topic = topic._id;
    await createPost({variables: reply});
    setReplierOpen(false);
    // 将reply内的title和content清空，成功后的回调函数
    resetReplier();
    toast.success('Post has been created!', {autoClose: 2000});
    scrollToBotton();
  }

  const scrollToBotton = () => pageEnd.current.scrollIntoView({behavior: 'smooth'});


  return (
    <section>
      <div className="fj-post-list">
        { topic._id
          && <PostItem
            post={topic}
            className="topic-post-lead"/>
        }
        { posts.map(post =>
          <div className="row" key={post._id}>
            <div className="col-md-9">
              <PostItem
                canCreate={user !== null}
                onReply={(reply) => {
                    // reply 指的是 post
                    setReplierOpen(true);
                    setReplyTo(reply);
                }}
                post={post}/>
            </div>
          </div>
        )
        }
      </div>
      <div className="row mt-2 mx-0">
        <div className="col-md-9">
          <div className="posts-bottom">
            { user &&
              <div className="pt-2 pb-2">
                <button
                  onClick={() => {
                    setReplyTo(null);
                    setReplierOpen(true);
                  }}
                  className="btn btn-lg btn-outline-primary">
                  Create New Post
                </button>
              </div>
            }
          </div>
        </div>
      </div>
      <div ref={pageEnd}></div>
      <Replier
        isOpen={isReplierOpen}
        onSubmit={handleCreatePost}
        hasTitle={false}
        replyTo={(replyTo && replyTo.user.username) || topic.title}
        closeBtn={() =>
          <a
            className="btn py-2 ttu gray-10"
            onClick={() => setReplierOpen(false)}>Cancel</a>
        }/>
    </section>
  )
}


export default withApollo(PostPage, {getDataFromTree});
