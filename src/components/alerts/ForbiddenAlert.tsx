import Alert from "@mui/material/Alert";

type ForbiddenAlertProps = {
  onClose?: () => void;
};

export default function ForbiddenAlert({ onClose }: ForbiddenAlertProps) {
  return (
    <Alert severity="error" onClose={onClose} sx={{ mb: 2 }}>
      Forbidden: You do not have permission to access this resource.
    </Alert>
  );
}
