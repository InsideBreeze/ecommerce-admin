"use client";

import { useState } from "react";
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Label from "@radix-ui/react-label"
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Check, Trash } from "lucide-react";
import { Category, Color, Image, Product, Size } from "@prisma/client";
import * as Select from "@radix-ui/react-select"
import * as Checkbox from '@radix-ui/react-checkbox';

import Heading from "@/components/ui/heading";
import AlertModal from "@/components/modals/alert-modal";
import UploadImage from "@/components/ui/upload-image";
import { SelectContent, SelectTrigger } from "@/components/ui/select-content";

import { center, divider, flex, grid, hstack, stack } from "../../../../../../../../styled-system/patterns";
import { css } from "../../../../../../../../styled-system/css";
import { button } from "../../../../../../../../styled-system/recipes";


interface ProductFormProps {
    data: (Product & {
        images: Image[]
    }) | null;
    categories: Category[];
    colors: Color[];
    sizes: Size[];
};


const schema = z.object({
    name: z.string().min(1),
    categoryId: z.string().min(1),
    sizeId: z.string().min(1),
    colorId: z.string().min(1),
    price: z.coerce.number().min(1),
    isArchived: z.boolean(),
    isFeatured: z.boolean(),
    images: z.object({ url: z.string() }).array()
})

const ProductForm: React.FC<ProductFormProps> = ({
    data,
    categories,
    sizes,
    colors
}) => {
    const [loading, setLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);

    const router = useRouter();
    const params = useParams();

    const title = data ? "Edit product" : "Create product";
    const description = data ? "Edit the product" : "Add a new product";
    const buttonLabel = data ? "Save change" : "Create";


    const formattedCategories = categories.map((category) => ({
        id: category.id,
        label: category.name
    }))

    const formattedSizes = sizes.map((size) => ({
        id: size.id,
        label: size.name
    }))

    const formattedColors = colors.map((color) => ({
        id: color.id,
        label: color.name
    }))


    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: data ? ({
            ...data,
            price: parseFloat(String(data?.price))
        }) : ({
            name: "",
            categoryId: "",
            sizeId: "",
            colorId: "",
            price: 0,
            isArchived: false,
            isFeatured: false,
            images: []
        })
    });

    const onSubmit = async (values: z.infer<typeof schema>) => {
        try {
            setLoading(true);
            if (!data) {
                await axios.post(`/api/stores/${params.storeId}/products`, values);
                toast.success("create product successed.");
            } else {
                console.log("values", values);
                await axios.put(`/api/stores/${params.storeId}/products/${params.productId}`, values);
                toast.success("update product successed.");
            }
            router.refresh();
            router.push(`/${params.storeId}/products`);
        } catch (err) {
            // Do something
            toast.error("Update store label failed");
        } finally {
            setLoading(false);
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/stores/${params.storeId}/products/${params.productId}`);
            toast.success("Deleted the product")
            router.refresh();
            router.push(`/${params.storeId}/products`);
        } catch (err) {
            toast.error("Delete store failed");
        } finally {
            setLoading(false);
            setOpenAlert(false);
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

            <div>
                <form onSubmit={handleSubmit(onSubmit)} className={stack({
                    gap: 6
                })}>
                    <div>
                        <Label.Root className={css({
                            fontSize: "sm",
                            color: "slate.800",
                            fontWeight: "medium",
                        })}>
                            Background image
                        </Label.Root>
                        <Controller
                            name="images"
                            control={control}
                            render={({ field }) => (
                                <UploadImage
                                    values={field.value.map(image => image.url)}
                                    onChange={url => field.onChange([...field.value, { url }])}
                                    onCancel={url => field.onChange(field.value.filter(image => image.url !== url))}
                                />
                            )}
                        />
                    </div>


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

                            <input
                                autoFocus
                                disabled={loading}
                                placeholder="Product name"
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

                        <div>
                            <Label.Root className={css({
                                color: errors.price ? "red" : "slate.800",
                                fontSize: "sm",
                                fontWeight: "medium",
                            })}>
                                Price
                            </Label.Root>
                            <input
                                type="number"
                                autoFocus
                                disabled={loading}
                                placeholder="Product price"
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
                                {...register("price")}
                            />
                            {errors.price && <p className={css({ color: "red", fontSize: "sm" })}>{errors.price.message}</p>}
                        </div>

                        <Controller
                            name="categoryId"
                            control={control}
                            render={({ field }) => (
                                <div className={css({
                                    pos: "relative"
                                })}>
                                    <Label.Root className={css({
                                        color: errors.categoryId ? "red" : "slate.800",
                                        fontSize: "sm",
                                        fontWeight: "medium",
                                    })}>
                                        Category
                                    </Label.Root>
                                    <Select.Root
                                        onValueChange={(value) => field.onChange(value)}
                                        defaultValue={data?.categoryId || ""}
                                        value=""
                                    >
                                        <SelectTrigger>
                                            {formattedCategories.find((category) => category.id === field.value)?.label}
                                        </SelectTrigger>

                                        <SelectContent
                                            data={formattedCategories}
                                            value={field.value}
                                        />
                                    </Select.Root>
                                </div>
                            )}
                        />

                        <Controller
                            name="sizeId"
                            control={control}
                            render={({ field }) => (
                                <div className={css({
                                    pos: "relative"
                                })}>
                                    <Label.Root className={css({
                                        color: errors.sizeId ? "red" : "slate.800",
                                        fontSize: "sm",
                                        fontWeight: "medium",
                                    })}>
                                        Size
                                    </Label.Root>
                                    <Select.Root
                                        onValueChange={(value) => field.onChange(value)}
                                        defaultValue={data?.sizeId || ""}
                                        value=""
                                    >
                                        <SelectTrigger>
                                            {formattedSizes.find((size) => size.id === field.value)?.label}
                                        </SelectTrigger>

                                        <SelectContent
                                            data={formattedSizes}
                                            value={field.value}
                                        />

                                    </Select.Root>
                                </div>
                            )}
                        />

                        <Controller
                            name="colorId"
                            control={control}
                            render={({ field }) => (
                                <div className={css({
                                    pos: "relative"
                                })}>
                                    <Label.Root className={css({
                                        color: errors.colorId ? "red" : "slate.800",
                                        fontSize: "sm",
                                        fontWeight: "medium",
                                    })}>
                                        Color
                                    </Label.Root>
                                    <Select.Root
                                        onValueChange={(value) => field.onChange(value)}
                                        defaultValue={data?.colorId || ""}
                                        value=""
                                    >
                                        <SelectTrigger>
                                            {formattedColors.find((color) => color.id === field.value)?.label}
                                        </SelectTrigger>

                                        <SelectContent
                                            data={formattedColors}
                                            value={field.value}
                                        />

                                    </Select.Root>
                                </div>
                            )}
                        />


                        <Controller
                            name="isFeatured"
                            control={control}
                            render={({ field }) => (
                                <div className={flex({
                                    px: 3,
                                    py: 2,
                                    border: "1px solid token(colors.slate.200)",
                                    rounded: "md",
                                    alignItems: "flex-start",
                                    gap: 2
                                })}>
                                    <Checkbox.Root
                                        checked={field.value}
                                        // @ts-ignore
                                        onCheckedChange={field.onChange}
                                        className={css({
                                            h: 4,
                                            w: 4,
                                            rounded: "sm",
                                            border: "1px solid token(colors.slate.600)"
                                        })}>
                                        <Checkbox.Indicator className="CheckboxIndicator">
                                            <Check size={16} />
                                        </Checkbox.Indicator>
                                    </Checkbox.Root>
                                    <div>
                                        <label className={css({
                                            color: "slate.800"
                                        })} htmlFor="c1">
                                            Featured
                                        </label>
                                        <p className={css({
                                            fontSize: "sm",
                                            color: "slate.600"
                                        })}>
                                            This product will appear on the home page
                                        </p>

                                    </div>
                                </div>
                            )}
                        />

                        <Controller
                            name="isArchived"
                            control={control}
                            render={({ field }) => (
                                <div className={flex({
                                    px: 3,
                                    py: 2,
                                    border: "1px solid token(colors.slate.200)",
                                    rounded: "md",
                                    alignItems: "flex-start",
                                    gap: 2
                                })}>
                                    <Checkbox.Root
                                        checked={field.value}
                                        // @ts-ignore
                                        onCheckedChange={field.onChange}
                                        className={css({
                                            h: 4,
                                            w: 4,
                                            rounded: "sm",
                                            border: "1px solid token(colors.slate.600)"
                                        })}>
                                        <Checkbox.Indicator className="CheckboxIndicator">
                                            <Check size={16} />
                                        </Checkbox.Indicator>
                                    </Checkbox.Root>
                                    <div>
                                        <label className={css({
                                            color: "slate.800"
                                        })} htmlFor="c1">
                                            Archived
                                        </label>
                                        <p className={css({
                                            fontSize: "sm",
                                            color: "slate.600"
                                        })}>
                                            This product will not appear on the home page
                                        </p>

                                    </div>
                                </div>
                            )}
                        />

                    </div>
                    <div className={hstack({
                        mt: 4
                    })}>
                        <button className={button()} disabled={loading} type="submit">
                            {buttonLabel}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
