import OffIcon from "@rsuite/icons/Off";
import "./style.scss";

interface StatusTagProps {
  status: "active" | "inactive";
}

const StatusTag = ({ status }: StatusTagProps) => {
  const ActiveStatus = <OffIcon />;
  const InactiveStatus = <OffIcon />;

  return (
    <div className={`status-tag ${status}`}>
      {status === "active" ? ActiveStatus : InactiveStatus}
    </div>
  );
};

export default StatusTag;
