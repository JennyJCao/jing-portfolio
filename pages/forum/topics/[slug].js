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


const useInitialData = (slug, pagination) => {
  const {data: dataT} = useGetTopicBySlug({variables: {slug}});
  // pollInterval: 使不同浏览器窗口的数据同步化
  // 原理： 每隔 pollInterval （5秒）这么长时间发送一次graphql请求
  const {data: dataP, fetchMore} = useGetPostsByTopic({variables: {slug, ...pagination}, pollInterval: 5000});
  const {data: dataU} = useGetUser();
  const topic = (dataT && dataT.topicBySlug) || {};
  const postData = (dataP && dataP.postsByTopic) || {posts: [], count: 0};
  const user = (dataU && dataU.user) || null;
  return {topic, ...postData, user, fetchMore};
}

const PostPage = () => {
  const router = useRouter();
  // 从query中取到的数字都是字符串形式，需要自己转换
  const {slug, pageNum = 1, pageSize = 5} = router.query;
  const [pagination, setPagination] = useState({pageNum: parseInt(pageNum, 10), pageSize: parseInt(pageSize, 10)});
  // ...rest 指的是将剩下所有的都传过来
  const {topic, posts, ...rest} = useInitialData(slug, pagination);

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
        onPageChange={(pageNum, pageSize) => {
          // 将页码变化持久化到url
          // shallow: true 说明不想fetch any new data here
          // 第一个 / 不要忘记写 不然就成了拼接url
          router.push('/forum/topics/[slug]',
            `/forum/topics/${slug}?pageNum=${pageNum}&pageSize=${pageSize}`,
            {shallow: true});
          // 下面这个写法更清晰，注意query写在as里才生效，写在url里不生效
          // router.push(
          //   '/forum/topics/[slug]',
          //   {
          //     pathname: `/forum/topics/${slug}`,
          //     query: {
          //       pageNum,
          //       pageSize
          //     }
          //   },
          //   {shallow: true});
          setPagination({pageNum, pageSize});
        }}/>
    </BaseLayout>
  )
}

const Posts = ({posts, topic, user, fetchMore, ...pagination}) => {
  const pageEnd = useRef();
  const [createPost, {error}] = useCreatePost();
  const [isReplierOpen, setReplierOpen] = useState(false);
  // replyTo 指的是 post
  const [replyTo, setReplyTo] = useState(null);
  const {pageSize, count, pageNum} = pagination;

  const handleCreatePost = async (reply, resetReplier) => {
    if (replyTo) {
      reply.parent = replyTo._id;
    }
    reply.topic = topic._id;
    await createPost({variables: reply});
    let lastPage = Math.ceil(count / pageSize);
    if (count === 0) {
      lastPage = 1;
    }
    // update cache的另一种写法，第一种写在actions的回调里
    // 如果当前页不是lastPage，那么缓存是不变的；因为缓存就是那一页的数据
    // 但是缓存不变的话，最后一页的数据也不更新了
    lastPage === pageNum && await fetchMore({
      variables: {pageNum: lastPage, pageSize},
      updateQuery: (previousResult, {fetchMoreResult}) => {
        // fetchMoreResult.postsByTopic 就是更新后的topics数组
        return Object.assign({}, previousResult, {
          postsByTopic: {...fetchMoreResult.postsByTopic}
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
        { topic._id && pagination.pageNum === 1 &&
          <PostItem
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
            {count !== 0 &&
              <div className="pagination-container ml-auto">
                <AppPagination
                  {...pagination}/>
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
