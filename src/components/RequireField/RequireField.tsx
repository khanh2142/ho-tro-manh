const RequireField = ({ content }: { content: string }) => {
  return (
    <div>
      <span>{content}</span>
      <span style={{ color: "red", marginLeft: 5 }}>*</span>
    </div>
  );
};

export default RequireField;
