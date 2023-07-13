import { Copy, Server } from "lucide-react";
import { css } from "../../../styled-system/css";
import { center, hstack } from "../../../styled-system/patterns";
import { toast } from "react-hot-toast";

interface ApiAlertProps {
    title: string;
    description: string;
    variant: "admin" | "Public";
};

const ApiAlert: React.FC<ApiAlertProps> = ({
    title,
    description,
    variant
}) => {

    const onCopy = async () => {
        if (window.navigator) {
            await navigator.clipboard.writeText(description);
            toast.success("API Route copied to the clipboard");
        }
    }
    return (
        <div className={css({
            p: 4,
            pl: "44px",
            pos: "relative",
            border: "1px solid token(colors.slate.200)",
            w: "full",
            rounded: "md"
        })}>
            <Server className={css({
                w: 4,
                h: 4,
                pos: "absolute",
                top: 4,
                left: 4
            })}/>

            <div className={hstack()}>
                <p className={css({
                    fontWeight: "semibold"
                })}>{title}</p>
                <span className={css({
                    bg: variant === "Public" ? "slate.100" : "red",
                    color: variant === "Public" ? "black" : "white",
                    py: "2px",
                    px: "10px",
                    rounded: "full",
                    fontSize: "xs",
                    fontWeight: "medium"
                })}>{variant}</span>
            </div>

            <div className={hstack({
                justify: "space-between",
                mt: 4
            })}>
                <code className={css({
                    bg: "slate.100",
                    fontWeight: "semibold",
                    fontSize: "sm",
                    rounded: "md",
                    letterSpacing: "wider",
                    p: 1
                })}>
                    {description}
                </code>
                <div
                    onClick={onCopy}
                    className={center({
                    w: 10,
                    h: 10,
                    border: "1px solid token(colors.slate.200)",
                    rounded: "md",
                    _hover: {
                        cursor: "pointer"
                    }
                })}>
                    <Copy size={16}/>
                </div>
            </div>
        </div>
    );
};

export default ApiAlert;
