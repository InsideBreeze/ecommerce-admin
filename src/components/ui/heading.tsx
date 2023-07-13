import { css } from "../../../styled-system/css";

interface HeadingProps {
    title: string;
    description: string;
};

const Heading: React.FC<HeadingProps> = ({
    title,
    description
}) => {
    return (
        <div>
            <h2 className={css({
                fontSize: "3xl",
                fontWeight: "bold",
                lineHeight: "tight"
            })}>{title}</h2>
            <p className={css({
                color: "slate.600",
                fontSize: "sm"
            })}>{description}</p>
        </div>
    );
};

export default Heading;
