"use client";

import { useState } from "react";
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Label from "@radix-ui/react-label"
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { Billboard, Size } from "@prisma/client";

import Heading from "@/components/ui/heading";
import AlertModal from "@/components/modals/alert-modal";
import ApiAlert from "@/components/ui/api-alert";
import useOrigin from "@/hooks/use-origin";
import UploadImage from "@/components/ui/upload-image";

import { center, divider, grid, hstack, stack, wrap } from "../../../../../../../../styled-system/patterns";
import { css } from "../../../../../../../../styled-system/css";
import { button } from "../../../../../../../../styled-system/recipes";

interface SizeFormProps {
    data: Size | null
};


const schema = z.object({
    name: z.string().min(1),
    value: z.string().min(1)
})

const SizeForm: React.FC<SizeFormProps> = ({
    data
}) => {
    const [loading, setLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const origin = useOrigin();

    const router = useRouter();
    const params = useParams();

    const title = data ? "Edit size" : "Create size";
    const description = data ? "Edit the size" : "Add a new size";
    const buttonLabel = data ? "Save change" : "Create";

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: data?.name || "",
            value: data?.value || ""
        }
    });

    const onSubmit = async (values: z.infer<typeof schema>) => {
        try {
            setLoading(true);
            if (!data) {
                await axios.post(`/api/stores/${params.storeId}/sizes`, values);
                toast.success("create size successed.");
            } else {
                await axios.put(`/api/stores/${params.storeId}/sizes/${params.sizeId}`, values);
                toast.success("update size successed.");
            }
            router.refresh();
            router.push(`/${params.storeId}/sizes`);
        } catch (err) {
            // Do something
            toast.error("manipulate size failed");
        } finally {
            setLoading(false);
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/stores/${params.storeId}/sizes/${params.sizeId}`);
            router.push(`/${params.storeId}/sizes`);
        } catch (err) {
            toast.error("Delete size failed");
        } finally {
            setLoading(false);
            setOpenAlert(false);
        }
    }

    return (
        <div className={wrap({
            gap: 4,
        })}>
            <AlertModal
                title="Are you sure?"
                description="This action cannot be undone"
                open={openAlert}
                onClose={() => setOpenAlert(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className={hstack({
                justify: "space-between",
                w: "full"
            })}>
                <Heading
                    title={title}
                    description={description}
                />
                {
                    data && (
                        <button
                            onClick={() => setOpenAlert(true)}
                            className={center({
                                w: 10,
                                h: 10,
                                bg: "red",
                                rounded: "md",
                                color: "white",
                                _hover: {
                                    cursor: "pointer"
                                },
                            })}>
                            <Trash size={16} />
                        </button>
                    )
                }
            </div>

            <div className={divider({
                color: "slate.200"
            })} />

            <div className={css({
                w: "full"
            })}>
                <form onSubmit={handleSubmit(onSubmit)} className={stack({
                    gap: 6
                })}>

                    <div className={grid({
                        columns: 3,
                        gap: 8,
                        mt: 2
                    })}>
                        <div>
                            <Label.Root className={css({
                                color: errors.name ? "red" : "slate.800",
                                fontSize: "sm",
                                fontWeight: "medium",
                            })}>
                                Name
                            </Label.Root>
                            <div>
                                <input
                                    autoFocus
                                    disabled={loading}
                                    placeholder="Size label"
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
                                {errors.name && <p className={css({ color: "red", fontSize: "sm" })}>{errors.name.message}</p>}
                            </div>
                        </div>
                        <div>
                            <Label.Root className={css({
                                color: errors.value ? "red" : "slate.800",
                                fontSize: "sm",
                                fontWeight: "medium",
                            })}>
                                Value
                            </Label.Root>
                            <div>
                                <input
                                    autoFocus
                                    disabled={loading}
                                    placeholder="Size value"
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
                                    {...register("value")}
                                />
                                {errors.value && <p className={css({ color: "red", fontSize: "sm" })}>{errors.value.message}</p>}
                            </div>
                        </div>

                    </div>
                    <div className={hstack({
                        mt: 4
                    })}>
                        <button className={button()} disabled={loading}>
                            {buttonLabel}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SizeForm;
