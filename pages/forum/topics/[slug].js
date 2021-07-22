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
import AppPagination from "@/components/shared/Pagination";


const useInitialData = (pagination) => {
  const router = useRouter();
  const {slug} = router.query;
  const {data: dataT} = useGetTopicBySlug({variables: {slug}});
  const {data: dataP, fetchMore} = useGetPostsByTopic({variables: {slug, ...pagination}});
  const {data: dataU} = useGetUser();
  const topic = (dataT && dataT.topicBySlug) || {};
  const postData = (dataP && dataP.postsByTopic) || {posts: [], count: 0};
  const user = (dataU && dataU.user) || null;
  return {topic, ...postData, user, fetchMore};
}

const PostPage = () => {
  const [pagination, setPagination] = useState({pageNum: 1, pageSize: 5});

  // ...rest 指的是将剩下所有的都传过来
  const {topic, posts, ...rest} = useInitialData(pagination);

  return (
    <BaseLayout>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>{topic.title}</h1>
          </div>
        </div>
      </section>
      <Posts
        posts={posts}
        topic={topic}
        {...rest}
        {...pagination}
        onPageChange={(pageNum, pageSize) => setPagination({pageNum, pageSize})}/>
    </BaseLayout>
  )
}

const Posts = ({posts, topic, user, fetchMore, count, pageNum, pageSize, onPageChange}) => {
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
    // update cache的另一种写法，第一种写在actions的回调里
    await fetchMore({
      updateQuery: (previousResult, {fetchMoreResult}) => {
        // fetchMoreResult.postsByTopic 就是更新后的topics数组
        return Object.assign({}, previousResult, {
          postsByTopic: [...fetchMoreResult.postsByTopic]
        });
      }
    })
    resetReplier();
    cleanup();
  }

  // createPost之后的收尾工作
  const cleanup = () => {
    setReplierOpen(false);
    // 将reply内的title和content清空，成功后的回调函数
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
            <div className="pagination-container ml-auto">
              <AppPagination
                onPageChange={onPageChange}
                count={count}
                pageSize={pageSize}
                pageNum={pageNum}/>
            </div>
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
