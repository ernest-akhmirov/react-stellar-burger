import React from "react";
import detailsStyle from "../IngredientDetails/IngredientDetails.module.css";
import { ingredientPropType } from "../../utils/prop-types";

export default function IngredientDetails({ item }) {
    return (
        <div className={detailsStyle.section}>
            <p className="text text_type_main-large" style={{ lineHeight: '64px' }}>Детали ингредиента</p>
            <img src={item.image_large}
                 alt={item.name}
                 className={`${detailsStyle.image} mr-5 ml-5`}/>
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

IngredientDetails.propTypes = {
  item: ingredientPropType,
};