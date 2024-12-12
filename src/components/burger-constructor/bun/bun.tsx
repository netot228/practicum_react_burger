import { IngredientData } from "../../../utils/types";

import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

import style from "../burger-constructor.module.css";

interface BunProps {
    type?: "bottom" | "top" | undefined;
    bun?: IngredientData | null;
}

const Bun: React.FC<BunProps> = (props: BunProps) => {
    const { name, price, image } = props.bun
        ? props.bun
        : {
              name: "Выберите булочку",
              price: 0,
              image: "",
          };

    const type = props.bun === undefined ? undefined : props.type;
    const extraClass = `${style.bun}
                        ${props.type === "top" ? style.topbun : style.btmbun}
                        ${props.bun === null && style.undefinedBun}
                        `;
    return (
        <div>
            <ConstructorElement
                text={name}
                price={price}
                thumbnail={image}
                type={type}
                isLocked={true}
                extraClass={extraClass}
            />
        </div>
    );
};

export default Bun;