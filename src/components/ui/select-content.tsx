import * as Select from "@radix-ui/react-select";
import { css } from "../../../styled-system/css";
import { Check } from "lucide-react";
import { hstack } from "../../../styled-system/patterns";
import { ChevronDown } from "lucide-react";

interface SelectContentProps {
    data: {
        id: string;
        label: string
    }[],
    value: string;
};

export const SelectContent: React.FC<SelectContentProps> = ({
    data,
    value,
}) => {
    return (
        <Select.Content
            position="popper"
            className={css({
                w: "var(--radix-select-trigger-width)",
                overflow: "hidden",
                shadow: "md",
                border: "1px solid token(colors.slate.200)",
                p: 1,
                rounded: "md",
                bg: "white"
            })}>
            <Select.Viewport>
                {
                    data.map((item) => (
                        <Select.Item key={item.id} value={item.id} className={hstack({
                            w: "full",
                            px: 2,
                            py: 1,
                            rounded: "md",
                            outline: "none",
                            _hover: {
                                bg: "slate.100",
                                cursor: "pointer",
                            }
                        })}>
                            <Check className={css({
                                h: 4,
                                w: 4,
                                color: "slate.600",
                                opacity: value === item.id ? "100%" : "0%"
                            })} />
                            {item.label}
                        </Select.Item>
                    ))
                }
            </Select.Viewport>
        </Select.Content>

    );
};

interface SelectTriggerProps {
    children: React.ReactNode
}
export const SelectTrigger: React.FC<SelectTriggerProps> = ({
    children
}) => {
    return (
        <Select.Trigger asChild>
            <div className={css({
                px: 3,
                py: 2,
                rounded: "md",
                border: "1px solid token(colors.slate.200)"
            })}>
                <button className={hstack({
                    justify: "space-between",
                    h: 6,
                    w: "full"
                })}>
                    <Select.Value
                        className={css({
                            fontSize: 14
                        })}>
                        {children}
                    </Select.Value>
                    <ChevronDown size={16} />
                </button>
            </div>
        </Select.Trigger>

    )
}
