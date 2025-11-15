import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/apiClient";
import "./CategoryMenu.css";

export default function CategoryMenu() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Lỗi tải danh mục:", error);
    }
  };

  return (
    <div className="mh-category-menu shadow-sm mb-3">
      <div className="container d-flex gap-4 py-2 flex-wrap">

        {categories.length === 0 ? (
          <span>Đang tải...</span>
        ) : (
          categories.map((c) => (
            <Link key={c.id} to={`/search/${c.name}`} className="mh-category-item">
              {c.name}
            </Link>
          ))
        )}

      </div>
    </div>
  );
}
