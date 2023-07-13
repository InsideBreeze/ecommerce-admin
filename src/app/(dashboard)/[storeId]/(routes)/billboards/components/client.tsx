"use client";

import Heading from "@/components/ui/heading";
import { divider, hstack, wrap } from "../../../../../../../styled-system/patterns";
import { button } from "../../../../../../../styled-system/recipes";
import { Plus } from "lucide-react";
import { css } from "../../../../../../../styled-system/css";
import { useParams, useRouter } from "next/navigation";
import { Billboard } from "@prisma/client";

interface BillboardClientProps {
    data: Billboard[]
};

const BillboardClient: React.FC<BillboardClientProps> = ({
    data
}) => {

    const router = useRouter();
    const params = useParams();

    return (
        <div className={wrap({
            gap: 4,
            w: "full",
        })}>
            <div className={hstack({
                justify: "space-between",
                w: "full",
            })}>
                <Heading
                    title={`Billboard (${data.length})`}
                    description="Manage billboards for your store"
                />
                <button
                    onClick={() => router.push(`/${params.storeId}/billboards/new`)}
                    className={button()}>
                    <Plus className={css({
                        w: 4,
                        h: 4,
                        mr: 2
                    })}/>
                    Add New
                </button>
            </div>

            <div className={divider({
                color: "slate.200"
            })} />
        </div>
    );
};

export default BillboardClient;
