import { useEffect, useState } from 'react';
import ArticleModal from '../components/ArticleModal';
const API_URL = import.meta.env.VITE_API_BASE_URL;
import '../styles/Articles.css';

function Articles() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [paginationInfo, setPaginationInfo] = useState({ totalDocs: 0 });
    const [selectedArticles, setSelectedArticles] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [modalData, setModalData] = useState(null);
    const [showModal, setShowModal] = useState(false);




    const fetchArticles = async () => {
        try {
            const res = await fetch(
                `${API_URL}/admin/Article/getArticle?search=&fromDate=&toDate=&page=1&limit=10`
            );
            const result = await res.json();

            if (res.ok && result.status === 200) {
                setArticles(result.data.docs);
                setPaginationInfo(result.data);
            } else {
                setError('Failed to fetch articles');
            }
        } catch (err) {
            console.error(err);
            setError('Error fetching data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    // DELETE
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this article?")) return;

        try {
            const res = await fetch(
                `${API_URL}/admin/Article/deleteArticle/${id}`,
                {
                    method: 'DELETE',
                }
            );

            if (res.status === 200) {
                alert("Article deleted!");
                fetchArticles();
            } else {
                alert("Delete failed.");
            }
        } catch (err) {
            console.error(err);
            alert("Error deleting article.");
        }
    };

    const handleSelectArticle = (id) => {
        setSelectedArticles((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedArticles([]);
            setSelectAll(false);
        } else {
            const allIds = articles.map((item) => item._id);
            setSelectedArticles(allIds);
            setSelectAll(true);
        }
    };

    const handleBulkDelete = async () => {
        if (selectedArticles.length === 0) {
            alert('No articles selected.');
            return;
        }

        if (!window.confirm('Are you sure you want to delete selected articles?')) return;

        try {
            for (const id of selectedArticles) {
                await fetch(
                    `${API_URL}/admin/Article/deleteArticle/${id}`,
                    {
                        method: 'DELETE',
                    }
                );
            }

            alert('Selected articles deleted!');
            setSelectedArticles([]);
            setSelectAll(false);
            fetchArticles();
        } catch (err) {
            console.error(err);
            alert('Error deleting selected articles');
        }
    };



    return (
        <div className="articles-page">
            <div className="articles-header">
                <h2>Article</h2>
                <div className="actions">
                    <button className="add-btn" onClick={() => {
                        setModalMode('create');
                        setModalData(null);
                        setShowModal(true);
                    }}>+ Add new article</button>
                    <button className="delete-btn" onClick={handleBulkDelete}>🗑 Delete Selected</button>
                </div>
            </div>

            <div className="articles-table">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="error">{error}</p>
                ) : (
                    <>
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        <input
                                            type="checkbox"
                                            checked={selectAll}
                                            onChange={handleSelectAll}
                                        />
                                    </th>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Operations</th>
                                </tr>
                            </thead>
                            <tbody>
                                {articles.map((article) => (
                                    <tr key={article._id}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={selectedArticles.includes(article._id)}
                                                onChange={() => handleSelectArticle(article._id)}
                                            />
                                        </td>
                                        <td><img src={article.image} alt="Article" /></td>
                                        <td>{article.title}</td>
                                        <td>{article.description}</td>
                                        <td>
                                            <div className="action-buttons">
                                                <button className="edit-btn" onClick={() => {
                                                    setModalMode('edit');
                                                    setModalData(article);
                                                    setShowModal(true);
                                                }}>Edit</button>

                                                <button className="delete-btn" onClick={() => handleDelete(article._id)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="pagination">
                            <span>
                                Showing 1–{articles.length} of {paginationInfo.totalDocs}
                            </span>
                            <div className="pages">
                                <button disabled>&lt;</button>
                                <button disabled>&gt;</button>
                            </div>
                        </div>
                        {showModal && (
                            <ArticleModal
                                mode={modalMode}
                                articleData={modalData}
                                onClose={() => setShowModal(false)}
                                onSuccess={fetchArticles}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default Articles;
