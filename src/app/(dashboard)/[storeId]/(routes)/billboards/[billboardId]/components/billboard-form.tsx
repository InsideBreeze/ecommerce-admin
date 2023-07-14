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
import { Billboard } from "@prisma/client";

import Heading from "@/components/ui/heading";
import AlertModal from "@/components/modals/alert-modal";
import ApiAlert from "@/components/ui/api-alert";
import useOrigin from "@/hooks/use-origin";

import { center, divider, grid, hstack, stack, wrap } from "../../../../../../../../styled-system/patterns";
import { css } from "../../../../../../../../styled-system/css";
import { button } from "../../../../../../../../styled-system/recipes";
import UploadImage from "@/components/ui/upload-image";

interface BillboardFormProps {
    data: Billboard | null
};


const schema = z.object({
    label: z.string().min(1),
    imageUrl: z.string().min(1)
})

const BillboardForm: React.FC<BillboardFormProps> = ({
    data
}) => {
    const [loading, setLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const origin = useOrigin();

    const router = useRouter();
    const params = useParams();

    const title = data ? "Edit billboard" : "Create billboard";
    const description = data ? "Edit the billboard" : "Add a new billboard";
    const buttonLabel = data ? "Save change" : "Create";

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            label: data?.label || "",
            imageUrl: data?.imageUrl || ""
        }
    });

    const onSubmit = async (values: z.infer<typeof schema>) => {
        try {
            setLoading(true);
            if (!data) {
                await axios.post(`/api/stores/${params.storeId}/billboards`, values);
                toast.success("create billboard successed.");
            } else {
                console.log("values", values);
                await axios.put(`/api/stores/${params.storeId}/billboards/${params.billboardId}`, values);
                toast.success("update billboard successed.");
            }
            router.push(`/${params.storeId}/billboards`);
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
            await axios.delete(`/api/stores/${params.storeId}/billboards/${params.billboardId}`);
            router.push(`/${params.storeId}/billboards`);
        } catch (err) {
            toast.error("Delete store failed");
        } finally {
            setLoading(false);
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
                    <div>
                        <Label.Root className={css({
                            fontSize: "sm",
                            color: "slate.800",
                            fontWeight: "medium",
                        })}>
                            Background image
                        </Label.Root>
                        <Controller
                            name="imageUrl"
                            control={control}
                            render={({ field }) => (
                                <UploadImage
                                    values={field.value ? [field.value] : []}
                                    onChange={(url) => field.onChange(url)}
                                    onCancel={() => field.onChange("")}
                                />
                            )}
                        />
                    </div>


                    <div>
                        <Label.Root className={css({
                            color: errors.label ? "red" : "slate.800",
                            fontSize: "sm",
                            fontWeight: "medium",
                        })}>
                            Label
                        </Label.Root>
                        <div className={grid({
                            columns: 3,
                            gap: 8,
                            mt: 2
                        })}>
                            <input
                                autoFocus
                                disabled={loading}
                                placeholder="Billboard label"
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
                                {...register("label")}
                            />
                            {errors.label && <p className={css({ color: "red", fontSize: "sm" })}>{errors.label.message}</p>}
                        </div>
                        <div className={hstack({
                            mt: 4
                        })}>
                            <button className={button()} disabled={loading}>
                                {buttonLabel}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BillboardForm;
