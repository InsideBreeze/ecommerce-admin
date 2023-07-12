import { css } from "../../../../styled-system/css";

interface SetupPageProps {

};

const SetupPage: React.FC<SetupPageProps> = () => {
    return (
        <div className={css({
            fontSize: "2xl",
            fontWeight: "semibold"
        })}>Setup Page</div>
    );
};

export default SetupPage;
