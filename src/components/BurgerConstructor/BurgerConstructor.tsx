import constructorStyle from '../BurgerConstructor/BurgerConstructor.module.css';
import {ConstructorElement, DragIcon, CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import DraggableConstructorElement from '../DraggableConstructorElement/DraggableConstructorElement';
import {
    addBurgerIngredient,
    removeBurgedIngredient,
    moveNotBunsIngredient
} from '../../services/actions/burgerConstructorActions';
import {placeOrder} from '../../services/actions/orderActions';
import {useDrop} from 'react-dnd';
import {useMemo, FC} from 'react';
import {useNavigate} from "react-router-dom";
import {TIngredient} from "../../utils/types";
import {useAppDispatch, useAppSelector} from "../../utils/hooks";

const BurgerConstructor: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const bun: TIngredient = useAppSelector((state: any) => state.burgerFilling.bun);
    const notBuns: Array<TIngredient> = useAppSelector((state: any) => state.burgerFilling.notBuns);
    const isAuthorized: boolean = useAppSelector((state: any) => state.authReducer.isAuthorized);

    const ingredientsList: string[] = notBuns.map((item) => item._id);
    ingredientsList.unshift(bun._id);

    const makeOrder = (): void => {
        isAuthorized ? dispatch(placeOrder(ingredientsList)) : navigate("/login")
    }

    const [, dropRef] = useDrop({
        accept: 'filler',
        drop(item) {
            dispatch(addBurgerIngredient(item));
        },
    });

    const totalCost: number = useMemo<number>(() => {
        let sum: number = 0;
        if (bun && bun.price) {
            sum += bun.price * 2;
        }
        if (notBuns && notBuns.length) {
            sum += notBuns.reduce((acc: number, current: TIngredient) => acc + current.price, 0);
        }
        return sum;
    }, []);

    const moveNotBunsHandler = (dragIndex: number, hoverIndex: number,): void => {
        dispatch(moveNotBunsIngredient(dragIndex, hoverIndex,));
    };

    return (
        <section className={`${constructorStyle.content} mt-25 ml-4`} ref={dropRef}>
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
                        extraClass='ml-8'
                    />

                    <div className={`${constructorStyle.section} mt-4 mb-4 pr-4`}>
                        {notBuns.map((item, index) => (
                            <DraggableConstructorElement
                                key={item.additionalId}
                                id={item.additionalId || "defaultId"}
                                index={index}
                                moveItem={moveNotBunsHandler}
                            >
                                <div className={`${constructorStyle.mainItem} pt-4`}>
                                    <DragIcon type='primary'/>
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
                        extraClass='ml-8'
                    />
                    <div className={`${constructorStyle.info} mt-10`}>
                        <div className={`${constructorStyle.price} mr-10`}>
                            <p className='text text_type_digits-medium pr-3'>{totalCost}</p>
                            <CurrencyIcon type='primary'/>
                        </div>
                        <Button htmlType='button' type='primary' size='medium' onClick={makeOrder}>
                            Оформить заказ
                        </Button>
                    </div>
                </>
            )}
        </section>
    );
}

export default BurgerConstructor;