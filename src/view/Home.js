import React, { useState } from "react";
import Categories from "../components/categories/Categories";
import Sort from "../components/sort/Sort";
import Pizza from "../components/pizza/Pizza";

export default function Home() {
  const [valueSort, setValueSort] = useState("");
  const [categories, setCategories] = useState(0);

  const getValueSort = (arg) => {
    setValueSort(arg);
  };
  const getCategories = (arg) => {
    setCategories(arg);
  };

  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories getCategories={getCategories} />
          <Sort getValueSort={getValueSort} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          <Pizza sort={valueSort} categories={categories} />
        </div>
      </div>
    </div>
  );
}
