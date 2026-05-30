import Alert from "@mui/material/Alert";

type UnauthorizedAlertProps = {
  onClose?: () => void;
};

export default function UnauthorizedAlert({ onClose }: UnauthorizedAlertProps) {
  return (
    <Alert severity="error" onClose={onClose} sx={{ mb: 2 }}>
      Unauthorized: Please check your authorization token.
    </Alert>
  );
}
