import { useState } from 'react';

export default function CommentSection({ articleId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    setComments([...comments, {
      id: Date.now(),
      text: newComment,
      timestamp: new Date().toLocaleString(),
      user: "Anonymous"
    }]);
    setNewComment('');
  };

  return (
    <div className="comment-section">
      <h3>Comments ({comments.length})</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add your comment..."
          required
        />
        <button type="submit">Post Comment</button>
      </form>
      <div className="comments-list">
        {comments.map(comment => (
          <div key={comment.id} className="comment">
            <p className="comment-meta">{comment.user} • {comment.timestamp}</p>
            <p className="comment-text">{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}