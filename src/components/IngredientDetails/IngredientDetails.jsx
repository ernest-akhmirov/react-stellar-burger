import React from "react";
import detailsStyle from "../IngredientDetails/IngredientDetails.module.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router";


export default function IngredientDetails() {
    const { id } = useParams()

    const ingredients = useSelector((state) => state.ingredients.ingredients);
    const item = ingredients.find((el) => el._id === id);

    if (!item) {
        return (
            <div>
                <p className="text text_type_main-medium mt-10">Такого ингредиента нет</p>
            </div>
        );
    }

    return (
        <div className={detailsStyle.section}>
            <p className={`${detailsStyle.title} text text_type_main-large `}>Детали ингредиента</p>
            <img src={item.image_large}
                alt={item.name}
                className={`${detailsStyle.image} mr-5 ml-5`} />
            <p className={`${detailsStyle.name} text text_type_main-medium mt-4`}>
                {item.name}
            </p>
            <div className={`${detailsStyle.info} text text_type_main-medium mt-8`}>
                <div className={`${detailsStyle.detail} text_color_inactive`}>
                    <p className="text text_type_main-default">Калории,ккал</p>
                    <p className="text text_type_digits-default">{item.calories}</p>
                </div>
                <div className={`${detailsStyle.detail} text_color_inactive`}>
                    <p className="text text_type_main-default">Белки, г</p>
                    <p className="text text_type_digits-default">{item.proteins}</p>
                </div>
                <div className={`${detailsStyle.detail} text_color_inactive`}>
                    <p className="text text_type_digits-default">{item.fat}</p>
                    <p className="text text_type_main-default">Жиры, г</p>
                </div>
                <div className={`${detailsStyle.detail} text_color_inactive`}>
                    <p className="text text_type_main-default">Углеводы, г</p>
                    <p className="text text_type_digits-default">{item.carbohydrates}</p>
                </div>
            </div>
        </div>
    );
}

