"use client";

import useOrigin from "@/hooks/use-origin";
import ApiAlert from "./api-alert";
import { useParams } from "next/navigation";
import { flex } from "../../../styled-system/patterns";

interface ApiListProps {
    entityName: string;
    entityIdName: string;
};

type EntityType = {
    id: number
    title: string;
    description: string;
    variant: "Public" | "Admin"
}

const ApiList: React.FC<ApiListProps> = ({
    entityIdName,
    entityName
}) => {

    const origin = useOrigin();
    const params = useParams();
    const baseUrl = `${origin}/api/stores/${params.storeId}`;

    const entities: EntityType[] = [
        {
            id: 0,
            title: "GET",
            description: `${baseUrl}/${entityName}`,
            variant: "Public"
        },
        {
            id: 1,
            title: "GET",
            description: `${baseUrl}/${entityName}/{${entityIdName}}`,
            variant: "Public"
        },
        {
            id: 2,
            title: "POST",
            description: `${baseUrl}/${entityName}`,
            variant: "Admin"
        },
        {
            id: 3,
            title: "PATH",
            description: `${baseUrl}/${entityName}/{${entityIdName}}`,
            variant: "Admin"
        },
        {
            id: 4,
            title: "DELTE",
            description: `${baseUrl}/${entityName}/{${entityIdName}}`,
            variant: "Admin"
        }
    ]
    return (
        <div className={flex({
            direction: "column",
            gap: 4
        })}>
            {
                entities.map((entity) => (
                    <ApiAlert
                        key={entity.id}
                        title={entity.title}
                        variant={entity.variant}
                        description={entity.description}
                    />
                ))
            }
        </div>

    );
};

export default ApiList;
