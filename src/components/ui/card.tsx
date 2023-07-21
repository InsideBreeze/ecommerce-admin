import { ReactElement } from "react";
import { flex } from "../../../styled-system/patterns";
import { css } from "../../../styled-system/css";

interface CardProps {
    title: string;
    description: string | number;
    icon: ReactElement
};


const Card: React.FC<CardProps> = ({
    title,
    description,
    icon
}) => {
    return (
        <div className={flex({
            p: 5,
            justify: "space-between",
            align: "start",
            border: "1px solid token(colors.slate.200)",
            rounded: "md"
        })}>
            <div>
                <p className={css({
                    fontSize: "sm",
                    fontWeight: "medium"
                })}>{title}</p>
                <p className={css({
                    fontSize: "2xl",
                    fontWeight: "bold"
                })}>{description}</p>
            </div>
            {icon}
        </div>
    );
};

export default Card;
