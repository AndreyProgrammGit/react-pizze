import React, { useEffect, useState } from "react";
import { increment } from "../../redux/slice/pizzaSlice";
import Skeleton from "../skeleton/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import store from "../../redux/store/store";
import {
  fetchPizza,
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
} from "../../redux/slice/pizzaSlice";
import { addToCart } from "../../redux/slice/cartSlice";

const Pizza = ({ sort, categories }) => {
  // const [pizzaItem, setPizzaItem] = useState([]);
  const { pizzaLoadingStatus } = useSelector((state) => state.pizza);
  const pizzaItem = selectAll(store.getState());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPizza());
    // request("https://66f4217a77b5e88970987278.mockapi.io/items").then((res) =>
    //   setPizzaItem(res)
    // );
  }, []);

  const filteredCategories = (item) => {
    const filteredPizza = item.slice();
    if (categories === 0) {
      return filteredPizza;
    } else {
      return filteredPizza.filter((item) => item.category === categories);
    }
  };

  const filteredSort = (item) => {
    switch (sort) {
      case "популярности":
        return item.sort((a, b) => b.rating - a.rating);
      case "цене":
        return item.sort((a, b) => a.price - b.price);
      case "алфавиту":
        return item.sort((a, b) => {
          var titleA = a.title.toLowerCase(),
            titleB = b.title.toLowerCase();
          if (titleA > titleB) {
            return 1;
          }
          if (titleA < titleB) {
            return -1;
          }
          return 0;
        });
      default:
        return item;
    }
  };

  const items = filteredCategories(pizzaItem);
  const itemsSorting = filteredSort(items);

  return pizzaLoadingStatus === "loading"
    ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
    : itemsSorting.map((obj) => (
        <PizzaItem
          key={obj.id}
          id={obj.id}
          title={obj.title}
          price={obj.price}
          img={obj.imageUrl}
          sizes={obj.sizes}
          types={obj.types}
          pizzaItem={pizzaItem}
        />
      ));
};

export default Pizza;

const PizzaItem = ({ title, price, sizes, img, types, pizzaItem, id }) => {
  const [activeclassName, setActiveclassName] = useState(0);
  const [activeType, setActiveType] = useState(0);
  const [size, setSize] = useState("26");
  const [type, setType] = useState("0");
  const dispatch = useDispatch();

  const toggleclassName = (index) => {
    setActiveclassName(index);
  };

  const toggleType = (index) => {
    setActiveType(index);
  };

  const getSize = (size) => {
    setSize(size);
  };

  const getType = (type) => {
    setType(type);
  };

  const renderSizes = (size) => {
    return size.map((size, index) => {
      return (
        <>
          <li
            key={index}
            onClick={() => {
              toggleclassName(index);
              getSize(size);
            }}
            className={activeclassName === index ? "active" : ""}
          >
            {size}
          </li>
        </>
      );
    });
  };

  const renderTypes = (type) => {
    const typeNames = ["Тонкое", "Традиционное"];

    return type.map((type, index) => {
      return (
        <>
          <li
            key={index}
            onClick={() => {
              toggleType(index);
              getType(type);
            }}
            className={activeType === index ? "active" : ""}
          >
            {typeNames[type]}
          </li>
        </>
      );
    });
  };

  const contentSize = renderSizes(sizes);
  const contentType = renderTypes(types);

  return (
    <div className="pizza-block">
      <>
        <img
          className="pizza-block__image"
          src="https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg"
          alt="Pizza"
        />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>{contentType}</ul>
          <ul>{contentSize}</ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <div className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span
              onClick={() => {
                dispatch(
                  addToCart(
                    pizzaItem
                      .filter((obj) => obj.id === id)
                      .map((obj) => ({
                        id: obj.id,
                        title: obj.title,
                        price: obj.price,
                        image: obj.imageUrl,
                        count: 1,
                        type,
                        size,
                      }))
                  )
                );
              }}
            >
              Добавить
            </span>
            <i>0</i>
          </div>
        </div>
      </>
    </div>
  );
};
