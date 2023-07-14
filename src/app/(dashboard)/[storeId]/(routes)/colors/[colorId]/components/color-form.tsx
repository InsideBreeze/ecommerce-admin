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
import { Color } from "@prisma/client";

import Heading from "@/components/ui/heading";
import AlertModal from "@/components/modals/alert-modal";
import ApiAlert from "@/components/ui/api-alert";
import useOrigin from "@/hooks/use-origin";
import UploadImage from "@/components/ui/upload-image";

import { center, divider, grid, hstack, stack, wrap } from "../../../../../../../../styled-system/patterns";
import { css } from "../../../../../../../../styled-system/css";
import { button } from "../../../../../../../../styled-system/recipes";

interface ColorFormProps {
    data: Color | null
};


const schema = z.object({
    name: z.string().min(1),
    value: z.string().min(4).regex(/^#/, {
        message: "String must be valid helix color"
    })
})

const ColorForm: React.FC<ColorFormProps> = ({
    data
}) => {
    const [loading, setLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const origin = useOrigin();

    const router = useRouter();
    const params = useParams();

    const title = data ? "Edit color" : "Create color";
    const description = data ? "Edit the color" : "Add a new color";
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
                await axios.post(`/api/stores/${params.storeId}/colors`, {
                    name: values.name,
                    value: values.value.toUpperCase()
                });
                toast.success("create color successed.");
            } else {
                await axios.put(`/api/stores/${params.storeId}/colors/${params.colorId}`, {
                    name: values.name,
                    value: values.value.toUpperCase()
                });
                toast.success("update color successed.");
            }
            router.refresh();
            router.push(`/${params.storeId}/colors`);
        } catch (err) {
            // Do something
            toast.error("manipulate color failed");
        } finally {
            setLoading(false);
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/stores/${params.storeId}/colors/${params.colorId}`);
            router.push(`/${params.storeId}/colors`);
        } catch (err) {
            toast.error("Delete color failed");
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
                                    placeholder="Color label"
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


                        <Controller
                            name="value"
                            control={control}
                            render={({ field }) => (
                                <div>
                                    <Label.Root className={css({
                                        color: errors.value ? "red" : "slate.800",
                                        fontSize: "sm",
                                        fontWeight: "medium",
                                    })}>
                                        Value
                                    </Label.Root>
                                    <div className={hstack()}>
                                        <input
                                            autoFocus
                                            disabled={loading}
                                            placeholder="Color value"
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
                                        <div className={css({
                                            p: 4,
                                            rounded: "full",
                                            border: "1px solid token(colors.slate.200)"
                                        })}
                                            style={{
                                                backgroundColor: field.value
                                            }}
                                        />
                                    </div>
                                    {errors.value && <p className={css({ color: "red", fontSize: "sm" })}>{errors.value.message}</p>}

                                </div>
                            )}
                        />


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

export default ColorForm;
