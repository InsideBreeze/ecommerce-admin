"use client";

import { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Label from "@radix-ui/react-label"
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";

import Heading from "@/components/ui/heading";

import { center, divider, grid, hstack, stack, wrap } from "../../../../../../../styled-system/patterns";
import { css } from "../../../../../../../styled-system/css";
import { button } from "../../../../../../../styled-system/recipes";
import AlertModal from "@/components/modals/alert-modal";
import ApiAlert from "@/components/ui/api-alert";
import useOrigin from "@/hooks/use-origin";
import { Store } from "@prisma/client";

interface SettingFormProps {
    store: Store
};


const schema = z.object({
    name: z.string().min(1)
})

const SettingForm: React.FC<SettingFormProps> = ({
    store
}) => {
    const [loading, setLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const origin = useOrigin();

    const router = useRouter();
    const params = useParams();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: store.name
        }
    });

    const onSubmit = async (values: z.infer<typeof schema>) => {
        try {
            setLoading(true);
            await axios.put(`/api/stores/${params.storeId}`, {
                name: values.name
            })
            router.refresh();
        } catch (err) {
            // Do something
            toast.error("Update store name failed");
        } finally {
            setLoading(false);
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/stores/${params.storeId}`);
            router.push("/");
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
                loading={loading}
                title="Are you sure?"
                description="This action cannot be undone"
                open={openAlert}
                onClose={() => setOpenAlert(false)}
                onConfirm={onDelete}
            />
            <div className={hstack({
                justify: "space-between",
                w: "full"
            })}>
                <Heading
                    title="Settings"
                    description="Manage store preferences"
                />
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
                        }
                    })}>
                    <Trash size={16} />
                </button>
            </div>

            <div className={divider({
                color: "slate.200"
            })} />

            <div className={css({
                w: "full"
            })}>
                <form onSubmit={handleSubmit(onSubmit)} className={stack({
                    gap: 2
                })}>
                    <Label.Root className={css({
                        color: errors.name ? "red" : ""
                    })}>
                        Name
                    </Label.Root>
                    <div className={grid({
                        columns: 3,
                        gap: 8
                    })}>
                        <input
                            autoFocus
                            disabled={loading}
                            placeholder="New store name"
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
                    <div className={hstack({
                        mt: 4
                    })}>
                        <button className={button()} disabled={loading}>
                            Save Change
                        </button>
                    </div>
                </form>
            </div>

            <div className={divider({
                color: "slate.200"
            })} />

            <ApiAlert
                title="NEXT_PUBLIC_API_URL"
                variant="Public"
                description={`${origin}/api/${store.id}`}
            />

        </div>
    );
};

export default SettingForm;
