import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchPost, postSelector } from "../slices/post";
import { fetchComments, commentsSelector } from "../slices/comments";

import Post from "../components/Post";
import Comment from "../components/Comment";

export default function SinglePostPage() {
  const dispatch = useDispatch();
  // uses React Router v6
  const { id } = useParams();

  const {
    post,
    loading: postLoading,
    hasErrors: postHasErrors,
  } = useSelector(postSelector);

  const {
    comments,
    loading: commentsLoading,
    hasErrors: commentsHasErrors,
  } = useSelector(commentsSelector);

  useEffect(() => {
    dispatch(fetchPost(id));
    dispatch(fetchComments(id));
  }, [dispatch, id]);

  function renderPost() {
    if (postLoading) return <p>Loading post...</p>;
    if (postHasErrors) return <p>Unable to display post.</p>;

    return <Post post={post} />;
  }

  function renderComments() {
    if (commentsLoading) return <p>Loading comments...</p>;
    if (commentsHasErrors) return <p>Unable to display comments.</p>;

    return comments.map((comment) => (
      <Comment key={comment.id} comment={comment} />
    ));
  }

  return (
    <section>
      {renderPost()}
      <h2>Comments</h2>
      {renderComments()}
    </section>
  );
}
