import React, { useRef, useState, useMemo } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientsStyles from "./BurgerIngredients.module.css";
import IngredientCard from "../IngredientCard/IngredientCard";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";

export default function BurgerIngredients({ data, openModal }) {
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

    return (
        <div className={`${ingredientsStyles.ingredients} ml-4`}>
            <h2 className="text text_type_main-large mt-10">Соберите бургер</h2>
            <div className={`${ingredientsStyles.tab} mt-5`}>
                <Tab type="bun"
                     active={current === "bun"}
                     onClick={() => handleTabClick("bun")}>Булки</Tab>

                <Tab type="sauce"
                     active={current === "sauce"}
                     onClick={() => handleTabClick("sauce")}>Соусы</Tab>

                <Tab type="main"
                     active={current === "main"}
                     onClick={() => handleTabClick("main")}>Начинки</Tab>
            </div>

        <section className={ingredientsStyles.section}>
            <div ref={sectionRefs.bun}>
                <h3 className="text text_type_main-medium mb-6 mt-10">Булки</h3>
                <div className={ingredientsStyles.cardList}>
                    {buns.map((item) => (
                        <IngredientCard
                        item={item}
                        key={item._id}
                        openModal={openModal}
                        />
                    ))}
                </div>
            </div>
            <div ref={sectionRefs.sauce}>
                <h3 className="text text_type_main-medium mb-6 mt-10">Соусы</h3>
                <div className={ingredientsStyles.cardList}>
                    {sauces.map((item) => (
                        <IngredientCard
                        item={item}
                        key={item._id}
                        openModal={openModal}
                        />
                    ))}
                </div>
            </div>

            <div ref={sectionRefs.main}>
                <h3 className="text text_type_main-medium mb-6 mt-10">Начинки</h3>
                <div className={ingredientsStyles.cardList}>
                    {main.map((item) => (
                        <IngredientCard
                        item={item}
                        key={item._id}
                        openModal={openModal}
                        />
                    ))}
                </div>
            </div>
        </section>
    </div>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType),
  openModal: PropTypes.func,
};
