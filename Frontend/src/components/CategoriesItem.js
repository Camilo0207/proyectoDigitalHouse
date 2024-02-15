import React from "react";
import { useApi } from "../hooks/useApi";
import styles from "../styles/CategoriesItem.module.css";
import { Link as LinkScroll, animateScroll as scroll } from "react-scroll";


export default function CategoriesItem({ item, setSelectedCategory,selectedCategory }) {
  const { imageUrl, title } = item;
  // const url = `http://3.144.218.41:8080/products/category/${title}`;
  const url = `http://localhost:8080/products/category/${title}`
  const { db } = useApi(url);
  const handleCategoryOption = () => {
    setSelectedCategory(title);
  };

  return (
    <>
        <LinkScroll
          activeClass="active"
          to="section1"
          spy={false}
          smooth={true}
          offset={-70}
          duration={1000}
          className={`${styles.link} ${"link"}`}
          delay={500}
          spyThrottle={0}
        >
      {db&&
        <div
          onClick={() => handleCategoryOption(title)}
          className={`${styles.card} ${selectedCategory === title?styles.card_selected:""}`}
          data-testid="card"
        >
          <img src={imageUrl} alt="" />
          <div>
            <h4>{title}</h4>
            <p>{db.length} {title}</p>
            
          </div>
        </div>
         }
    </LinkScroll>
    </>
  );
}
