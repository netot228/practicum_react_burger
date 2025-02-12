import { BunProps } from "../../../service/types";

import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

import style from "../burger-constructor.module.css";

const Bun: React.FC<BunProps> = (props) => {
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
    const correctedName = `${name} ${props.type === "top" ? '(верх)' : '(низ)'}`;
    return (
        <div>
            <ConstructorElement
                // text={name}
                text={correctedName}
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
