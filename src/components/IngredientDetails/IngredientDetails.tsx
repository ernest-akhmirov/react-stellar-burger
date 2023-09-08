import React, {FC} from "react";
import detailsStyle from "../IngredientDetails/IngredientDetails.module.css";
import {useParams} from "react-router";
import { TIngredient} from "../../utils/types";
import {useAppSelector} from "../../utils/hooks";

const IngredientDetails: FC = () => {
    const {id} = useParams()

    const ingredients = useAppSelector((state) => state.ingredients.ingredients);
    const item: TIngredient | undefined = ingredients.find((el) => el._id === id);

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
                    <p className="text text_type_main-default">Жиры, г</p>
                    <p className="text text_type_digits-default">{item.fat}</p>
                </div>
                <div className={`${detailsStyle.detail} text_color_inactive`}>
                    <p className="text text_type_main-default">Углеводы, г</p>
                    <p className="text text_type_digits-default">{item.carbohydrates}</p>
                </div>
            </div>
        </div>
    );
}

export default IngredientDetails;