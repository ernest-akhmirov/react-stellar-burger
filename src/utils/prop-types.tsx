import PropTypes from "prop-types";

export const ingredientPropType = PropTypes.shape({
    _id: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
});

export type TIngredient = {
        _id: string;
        image: string;
        name: string;
        price: number;
        type: string;
        proteins: number;
        fat: number;
        carbohydrates: number;
        calories: number;
        image_mobile: string;
        image_large: string;
        __v: number;
        additionalId?: string;
        index?: number;
};
