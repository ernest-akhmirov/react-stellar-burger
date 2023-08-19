import React, {useRef, useState, useMemo, useEffect, FC} from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientsStyles from "./BurgerIngredients.module.css";
import IngredientCard from "../IngredientCard/IngredientCard";
import { useInView } from "react-intersection-observer";
import Preloader from "../Preloader/Preloader";
import {TIngredient} from "../../utils/types";
import {useAppSelector} from "../../utils/hooks";

const BurgerIngredients: FC = () => {
    const data = useAppSelector((state: any) => state.ingredients.ingredients);
    const [current, setCurrent] = useState<"bun" | "sauce" | "main">("bun");
    const [loading, setLoading] = useState(true);

    type TSectionRefs = {
        bun: React.RefObject<HTMLParagraphElement>;
        sauce: React.RefObject<HTMLParagraphElement>;
        main: React.RefObject<HTMLParagraphElement>;
    };

    const sectionRefs: TSectionRefs = {
        bun: useRef<HTMLParagraphElement>(null),
        sauce: useRef<HTMLParagraphElement>(null),
        main: useRef<HTMLParagraphElement>(null),
    };

    const { ref: bunRef, inView: bunInView } = useInView();
    const { ref: sauceRef, inView: sauceInView } = useInView();
    const { ref: mainRef, inView: mainInView } = useInView();

    const { buns, sauces, main } = useMemo(() => {
        const buns = data.filter((item: TIngredient) => item.type === "bun");
        const sauces = data.filter((item: TIngredient) => item.type === "sauce");
        const main = data.filter((item: TIngredient) => item.type === "main");


        return { buns, sauces, main };
    }, [data]);

    const handleTabClick = (type: "bun" | "sauce" | "main") => {
        setCurrent(type);
        scrollToSection(type);
    };

    const scrollToSection = (type: "bun" | "sauce" | "main") => {
        const sectionRef = sectionRefs[type].current;
        if (sectionRef) {
            sectionRef.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    };

    useEffect(() => {
        if (data.length > 0) {
            setLoading(false);
        }
    }, [data]);


    useEffect(() => {
        if (bunInView) {
            setCurrent('bun')
        }
        else if (sauceInView) {
            setCurrent('sauce')
        }
        else if (mainInView) {
            setCurrent('main')
        }
    }, [bunInView, sauceInView, mainInView])

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
                        value={tab.type as "bun" | "sauce" | "main"}
                        active={current === tab.type}
                        onClick={() => handleTabClick(tab.type as "bun" | "sauce" | "main")}
                    >
                        {tab.title}
                    </Tab>))}
            </div>
            {loading ? (
                <Preloader /> // Показываем лоадер, если данные загружаются
            ) : (
                <section className={ingredientsStyles.section}>
                    {componentData.map((tab) => (
                        <div key={tab.type} ref={sectionRefs[tab.type as "bun" | "sauce" | "main"]}>
                            <h3 className="text text_type_main-medium mb-6 mt-10">{tab.title}</h3>
                            <div className={ingredientsStyles.cardList}
                                ref={tab.type === 'bun' ? bunRef :
                                    tab.type === 'sauce' ? sauceRef : mainRef}>
                                {tab.data.map((item: TIngredient) => (
                                    <IngredientCard
                                        item={item}
                                        key={item._id}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </section>
            )}

        </div>
    );
}

export default BurgerIngredients;
