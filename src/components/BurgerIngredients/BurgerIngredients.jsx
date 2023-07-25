import React, { useRef, useState, useMemo } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientsStyles from "./BurgerIngredients.module.css";
import IngredientCard from "../IngredientCard/IngredientCard";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
import { useSelector, useDispatch } from "react-redux";

export default function BurgerIngredients() {
    const data = useSelector((state) => state.ingredients.ingredients);
    

    const sectionRefs = {
        bun: useRef(null),
        sauce: useRef(null),
        main: useRef(null),
    };

    const [current, setCurrent] = useState("bun");

    const { buns, sauces, main } = useMemo(() => {
        const buns = data.filter((item) => item.type === "bun");
        const sauces = data.filter((item) => item.type === "sauce");
        const main = data.filter((item) => item.type === "main");

        return { buns, sauces, main };
    }, [data]);

    const handleTabClick = (type) => {
        setCurrent(type);
        scrollToSection(type);
    };

    const scrollToSection = (type) => {
        const sectionRef = sectionRefs[type].current;
        if (sectionRef) {
            sectionRef.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
        }
    };

    const componentData = [
        { title: "Булки", data: buns, type: "bun" },
        { title: "Соусы", data: sauces, type: "sauce" },
        { title: "Начинки", data: main, type: "main" },
    ]

    return (
        <div className={`${ingredientsStyles.ingredients} ml-4`}>
            <h2 className="text text_type_main-large mt-10">Соберите бургер</h2>
            <div className={`${ingredientsStyles.tab} mt-5`}>
                {componentData.map((tab) => (
                    <Tab 
                        key={tab.type}
                        type={tab.type}
                        active={current === tab.type}
                        onClick={() => handleTabClick(tab.type)}
                    >
                        {tab.title}
                    </Tab>))}
            </div>

        <section className={ingredientsStyles.section}>
        {componentData.map((tab) => (
            <div key={tab.type} ref={sectionRefs[tab.type]}>
                <h3 className="text text_type_main-medium mb-6 mt-10">{tab.title}</h3>
                    <div className={ingredientsStyles.cardList}>
                    {tab.data.map((item) => (
                        <IngredientCard
                            item={item}
                            key={item._id}
                        />
                        ))}
                    </div>
            </div>
        ))}
        </section>

        </div>
    );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType),
  openModal: PropTypes.func,
};