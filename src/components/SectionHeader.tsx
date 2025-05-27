interface SectionHeaderProps {
  title: string;
}

const SectionHeader = ({ title }: SectionHeaderProps) => {
  return (
    <div className="section-header">
      <h2 className="section-title">{title}</h2>
      <div className="section-line"></div>
    </div>
  );
};

export default SectionHeader;