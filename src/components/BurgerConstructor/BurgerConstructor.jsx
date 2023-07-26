import constuctorStyle from '../BurgerConstructor/BurgerConstructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import DraggableConstructorElement from '../DraggableConstructorElement/DraggableConstructorElement'; 
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { addBurgerIngredient, removeBurgedIngredient, moveNotBunsIngredient } from '../../services/actions/burgerConstructorActions';
import { placeOrder } from '../../services/actions/orderActions'; 
import { useDrop } from 'react-dnd';
import { useMemo } from 'react';


export default function BurgerConstructor() {
  const dispatch = useDispatch();

  const bun = useSelector((state) => state.burgerFilling.bun);
  const notBuns = useSelector((state) => state.burgerFilling.notBuns);

  const ingredientsList = notBuns.map((item) => item._id);
  ingredientsList.unshift(bun._id);

  function onClick() {
    dispatch(placeOrder(ingredientsList));
  }

  const [, dropRef] = useDrop({
    accept: 'filler',
    drop(item) {
      dispatch(addBurgerIngredient(item));
    },
  });

  const totalCost = useMemo(() => {
    let sum = 0;
    if (bun && bun.price) {
      sum += bun.price * 2;
    }
    if (notBuns && notBuns.length) {
      sum += notBuns.reduce((acc, current) => acc + current.price, 0);
    }
    return sum;
  });

  const moveNotBunsHandler = (dragIndex, hoverIndex, additionalId) => {
    dispatch(moveNotBunsIngredient(dragIndex, hoverIndex, additionalId));
  };

  return (
    <section className={`${constuctorStyle.content} mt-25 ml-4`} ref={dropRef}>
      {Object.keys(bun).length === 0 && notBuns.length === 0 ? (
        <>
          <p className='text text_type_main-large mt-10'>
            Перетащите булку чтобы начать формирование заказа
          </p>
        </>
      ) : (
        <>
          <ConstructorElement
            type='top'
            isLocked={true}
            text={bun.name + ' (верхняя)'}
            price={bun.price}
            thumbnail={bun.image_mobile}
            className='ml-8'
          />

          <div className={`${constuctorStyle.section} mt-4 mb-4 pr-4`}>
            {notBuns.map((item, index) => (
              <DraggableConstructorElement
                key={item.additionalId}
                id={item.additionalId}
                index={index}
                moveItem={moveNotBunsHandler}
              >
                <div className={`${constuctorStyle.mainItem} pt-4`}>
                  <DragIcon type='primary' />
                  <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image_mobile}
                    handleClose={() => dispatch(removeBurgedIngredient(item.additionalId))}
                  />
                </div>
              </DraggableConstructorElement>
            ))}
          </div>

          <ConstructorElement
            type='bottom'
            isLocked={true}
            text={bun.name + ' (нижняя)'}
            price={bun.price}
            thumbnail={bun.image_mobile}
            className='ml-8'
          />
          <div className={`${constuctorStyle.info} mt-10`}>
            <div className={`${constuctorStyle.price} mr-10`}>
              <p className='text text_type_digits-medium pr-3'>{totalCost}</p>
              <CurrencyIcon type='primary' />
            </div>
            <Button htmlType='button' type='primary' size='medium' onClick={onClick}>
              Оформить заказ
            </Button>
          </div>
        </>
      )}
    </section>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType),
  openModal: PropTypes.func,
};
