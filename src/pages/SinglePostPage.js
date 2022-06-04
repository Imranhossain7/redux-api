import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchPost } from "../actions/postActions";
import { fetchComments } from "../actions/commentsActions";

import { Post } from "../components/Post";
import { Comment } from "../components/Comment";

const SinglePostPage = ({ dispatch, post, comments, hasErrors, loading }) => {
  // uses React Router v6
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchComments(id));
    dispatch(fetchPost(id));
  }, [dispatch, id]);

  const renderPost = () => {
    if (loading.post) return <p>Loading post...</p>;
    if (hasErrors.post) return <p>Unable to display post.</p>;

    return <Post post={post} />;
  };

  const renderComments = () => {
    if (loading.comments) return <p>Loading comments...</p>;
    if (hasErrors.comments) return <p>Unable to display comments.</p>;

    return comments.map((comment) => (
      <Comment key={comment.id} comment={comment} />
    ));
  };

  return (
    <section>
      {renderPost()}
      <h2>Comments</h2>
      {renderComments()}
    </section>
  );
};

const mapStateToProps = (state) => ({
  post: state.post.post,
  comments: state.comments.comments,
  loading: { post: state.post.loading, comments: state.comments.loading },
  hasErrors: { post: state.post.hasErrors, comments: state.comments.hasErrors },
});

export default connect(mapStateToProps)(SinglePostPage);
