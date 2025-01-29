import { useState } from 'react';

export default function ArticleForm({ setArticles }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: 'Anonymous'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      alert('Please fill in all required fields');
      return;
    }

    const newArticle = {
      ...formData,
      id: Date.now(),
      date: new Date().toISOString()
    };

    setArticles(prev => [newArticle, ...prev]);
    setFormData({ title: '', content: '', author: 'Anonymous' });
  };

  return (
    <form className="article-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Article Title"
        value={formData.title}
        onChange={(e) => setFormData({...formData, title: e.target.value})}
        required
      />
      <textarea
        placeholder="Write your article..."
        value={formData.content}
        onChange={(e) => setFormData({...formData, content: e.target.value})}
        required
        rows="10"
      />
      <button type="submit">Publish Article</button>
    </form>
  );
}