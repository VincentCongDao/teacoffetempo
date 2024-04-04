interface FooterContainerProps {
  children: React.ReactNode;
  className?: string;
}
const FooterContainer: React.FC<FooterContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={`${className} w-full sm:w-1/2 md:w-1/4 lg:w-1/6 mb-6 flex-col flex gap-2`}
    >
      {children}
    </div>
  );
};

export default FooterContainer;
