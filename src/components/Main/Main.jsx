import mainStyles from "../Main/Main.module.css";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import PropTypes from "prop-types";
import { ingredientPropType } from '../../utils/prop-types'

function Main({ data, openModal }) {
  return (
    <main className={mainStyles.main}>
      <BurgerIngredients data={data} openModal={openModal} />
      <BurgerConstructor data={data} openModal={openModal} />
    </main>
  );
}

export default Main;

Main.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType),
  openModal: PropTypes.func,
}