"use client";

import { useState } from "react";
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Label from "@radix-ui/react-label";
import * as Select from "@radix-ui/react-select";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Check, ChevronDown, Trash } from "lucide-react";
import { Billboard, Category } from "@prisma/client";

import Heading from "@/components/ui/heading";
import AlertModal from "@/components/modals/alert-modal";
import useOrigin from "@/hooks/use-origin";

import { center, divider, flex, grid, hstack, stack } from "../../../../../../../../styled-system/patterns";
import { css } from "../../../../../../../../styled-system/css";
import { button } from "../../../../../../../../styled-system/recipes";
import { SelectContent, SelectTrigger } from "@/components/ui/select-content";


interface BillboardFormProps {
    data: Category | null,
    billboards: Billboard[]
};


const schema = z.object({
    name: z.string().min(1),
    billboardId: z.string().min(1),
})

const BillboardForm: React.FC<BillboardFormProps> = ({
    data,
    billboards
}) => {
    const [loading, setLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const origin = useOrigin();

    const router = useRouter();
    const params = useParams();

    const title = data ? "Edit category" : "Create category";
    const description = data ? "Edit the category" : "Add a new category";
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
            billboardId: data?.billboardId || ""
        }
    });

    const onSubmit = async (values: z.infer<typeof schema>) => {

        try {
            setLoading(true);
            if (!data) {
                await axios.post(`/api/stores/${params.storeId}/categories`, {
                    ...values,
                    storeId: params.storeId
                });
                toast.success("create category successed.");
            } else {
                await axios.put(`/api/stores/${params.storeId}/categories/${params.categoryId}`, {
                    ...values,
                    storeId: params.storeId
                });
                toast.success("update billboard successed.");
            }
            router.refresh();
            router.push(`/${params.storeId}/categories`);
        } catch (err) {
            // Do something
            toast.error("maniplate category failed");
        } finally {
            setLoading(false);
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/stores/${params.storeId}/categories/${params.categoryId}`);
            router.refresh();
            router.push(`/${params.storeId}/categories`);
        } catch (err) {
            toast.error("Delete category failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={flex({
            direction: "column",
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
                                    placeholder="Category name"
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
                            <Controller
                                name="billboardId"
                                control={control}
                                render={({ field }) => (
                                    <div className={css({
                                        pos: "relative"
                                    })}>
                                        <Label.Root className={css({
                                            color: errors.billboardId ? "red" : "slate.800",
                                            fontSize: "sm",
                                            fontWeight: "medium",
                                        })}>
                                            Billboard
                                        </Label.Root>

                                        <Select.Root
                                            onValueChange={(value) => field.onChange(value)}
                                            defaultValue={data?.billboardId || ""}
                                            value=""
                                        >

                                            <SelectTrigger>
                                                {billboards.find((billboard) => billboard.id === field.value)?.label}
                                            </SelectTrigger>
                                            {/* <Select.Trigger asChild>
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
                                                            {billboards.find((billboard) => billboard.id === field.value)?.label}
                                                        </Select.Value>
                                                        <ChevronDown size={16} />
                                                    </button>
                                                </div>
                                            </Select.Trigger> */}


                                            <SelectContent
                                                data={billboards}
                                                value={field.value}
                                            />

                                            {/* <Select.Content
                                                position="popper"
                                                className={css({
                                                    w: "var(--radix-select-trigger-width)",
                                                    overflow: "hidden",
                                                    shadow: "xl",
                                                    border: "1px solid token(colors.slate.200)",
                                                    p: 1,
                                                    rounded: "md"
                                                })}>
                                                <Select.Viewport>
                                                    {
                                                        billboards.map((billboard) => (
                                                            <Select.Item key={billboard.id} value={billboard.id} className={hstack({
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
                                                                    opacity: field.value === billboard.id ? "100%" : "0%"
                                                                })} />
                                                                {billboard.label}
                                                            </Select.Item>
                                                        ))
                                                    }
                                                </Select.Viewport>
                                            </Select.Content> */}

                                        </Select.Root>
                                    </div>
                                )}
                            />
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

export default BillboardForm;
