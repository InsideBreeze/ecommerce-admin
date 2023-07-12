import { center } from "../../../styled-system/patterns";

interface AuthLayoutProps {
    children: React.ReactNode
};

const AuthLayout: React.FC<AuthLayoutProps> = ({
    children
}) => {
    return (
        <div className={center({
            h: "full"
        })}>
            {children}
        </div>
    );
};

export default AuthLayout;
