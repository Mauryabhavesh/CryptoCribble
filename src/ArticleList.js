import { Link } from 'react-router-dom';
import CommentSection from './CommentSection';

export default function ArticleList({ articles }) {
  return (
    <div className="article-list">
      <h1>Latest Crypto Articles</h1>
      {articles.map(article => (
        <div key={article.id} className="article-card">
          <h2>{article.title}</h2>
          <p className="article-meta">
            By {article.author} • {new Date(article.date).toLocaleDateString()}
          </p>
          <p className="article-excerpt">{article.content.substring(0, 200)}...</p>
          <Link to={`/article/${article.id}`} className="read-more">
            Read More
          </Link>
          <CommentSection articleId={article.id} />
        </div>
      ))}
    </div>
  );
}