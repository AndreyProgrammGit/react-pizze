import classNames from "classnames";
import React, { useState } from "react";

export default function Categories({ getCategories }) {
  const [liId, setLiId] = useState(0);

  const categories = [
    {
      id: 0,
      name: "Все",
    },
    {
      id: 1,
      name: "Мясные",
    },
    {
      id: 2,
      name: "Вегетарианская",
    },
    {
      id: 3,
      name: "Гриль",
    },
    {
      id: 4,
      name: "Острые",
    },
    {
      id: 5,
      name: "Закрытые",
    },
  ];

  const renderCategories = (arr) => {
    return arr.map((obj) => {
      const liClass = classNames({
        active: obj.id === liId,
      });
      return (
        <li
          key={obj.id}
          onClick={() => {
            setLiId(obj.id);
            getCategories(obj.id);
          }}
          className={liClass}
        >
          {obj.name}
        </li>
      );
    });
  };

  const content = renderCategories(categories);

  return (
    <div className="categories">
      <ul>{content}</ul>
    </div>
  );
}
