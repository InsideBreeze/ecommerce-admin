import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Label from '@radix-ui/react-label';

import Modal from "@/components/ui/modal"
import { useStoreModal } from "@/hooks/use-store-modal";
import { css, cva } from "../../../styled-system/css";
import { hstack, stack } from "../../../styled-system/patterns";

interface StoreModalProps {

};

const schema = z.object({
    name: z.string().min(1)
})

const button = cva({
    base: {
        w: "auto",
        rounded: "md",
        h: 10,
        fontWeight: "semibold",
        px: 4,
        py: "5px",
        _hover: {
            opacity: "75%",
            cursor: "pointer"
        },
        _disabled: {
            opacity: "75%",
            pointerEvents: "none"
        },
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    variants: {
        visual: {
            solid: { bg: 'black', color: "white" },
            outline: { borderWidth: '1px', borderColor: 'gray.200' }
        }
    },
    defaultVariants: {
        visual: "solid"
    }
});


const StoreModal: React.FC<StoreModalProps> = () => {

    const storeModal = useStoreModal();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = (values: z.infer<typeof schema>) => {
        console.log(values)
    }

    return (
        <Modal
            title="Create store"
            description="Add a new store to manager products and categories"
            open={storeModal.open}
            onClose={storeModal.onClose}
        >
            {/* form */}
            <div className={stack({
                mt: 4,
            })}>
                <form onSubmit={handleSubmit(onSubmit)} className={stack({
                    gap: 2
                })}>
                    <Label.Root>
                        Name
                    </Label.Root>
                    <div>
                        <input
                            placeholder="E-commerce"
                            className={css({
                                p: 2,
                                px: 3,
                                w: "full",
                                border: "1px solid token(colors.slate.200)",
                                rounded: "md",
                                _focus: {
                                    outline: "none",
                                    ring: "1px solid blue"
                                }
                            })}
                            {...register("name")}
                    />
                    </div>
                    <div className={hstack({
                            justify: "flex-end",
                            mt: 4
                        })}>
                        <button className={button({
                            visual: "outline"
                        })}>
                                Cancel
                        </button>
                        <button className={button()}>
                            Continue
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default StoreModal;
