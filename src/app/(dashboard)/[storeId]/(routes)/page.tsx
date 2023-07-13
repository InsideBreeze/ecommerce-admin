import Heading from "@/components/ui/heading";
import { css } from "../../../../../styled-system/css";

interface DashboardPageProps {

};

const DashboardPage: React.FC<DashboardPageProps> = () => {
    return (
        <div className={css({
            p: 8,
            pt: 6
        })}>
            <div>
                <Heading
                    title="Dashboard"
                    description="Overview your store"
                />
            </div>
        </div>
    );
};

export default DashboardPage;
