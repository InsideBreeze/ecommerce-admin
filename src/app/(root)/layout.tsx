interface SetupPageLayoutProps {
    children: React.ReactNode
};

const SetupPageLayout: React.FC<SetupPageLayoutProps> = ({
    children
}) => {

    return (
        <>
            {children}
        </>
    );
};

export default SetupPageLayout;
