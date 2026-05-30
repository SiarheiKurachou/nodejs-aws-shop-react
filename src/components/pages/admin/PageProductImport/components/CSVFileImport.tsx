import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import { useAuth } from "react-oidc-context";
import UnauthorizedAlert from "~/components/alerts/UnauthorizedAlert";
import ForbiddenAlert from "~/components/alerts/ForbiddenAlert";

type CSVFileImportProps = {
  url: string;
  title: string;
};

export default function CSVFileImport({ url, title }: CSVFileImportProps) {
  const auth = useAuth();
  const [file, setFile] = React.useState<File>();
  const [uploadErrorStatus, setUploadErrorStatus] = React.useState<401 | 403 | null>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadErrorStatus(null);
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFile(file);
    }
  };

  const removeFile = () => {
    setUploadErrorStatus(null);
    setFile(undefined);
  };

  const uploadFile = async () => {
    if (!file || !auth.user?.id_token) return;
    setUploadErrorStatus(null);

    try {
      const response = await axios({
        method: "GET",
        url,
        params: {
          name: encodeURIComponent(file.name),
        },
        headers: {
          Authorization: `Bearer ${auth.user.id_token}`,
        },
      });

      const result = await fetch(response.data, {
        method: "PUT",
        body: file,
      });

      if (result.status === 401 || result.status === 403) {
        setUploadErrorStatus(result.status);
        return;
      }

      setFile(undefined);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          setUploadErrorStatus(status);
        }
      }
    }
  };
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {uploadErrorStatus === 401 && (
        <UnauthorizedAlert onClose={() => setUploadErrorStatus(null)} />
      )}
      {uploadErrorStatus === 403 && (
        <ForbiddenAlert onClose={() => setUploadErrorStatus(null)} />
      )}
      {!file ? (
        <input type="file" onChange={onFileChange} />
      ) : (
        <div>
          <button onClick={removeFile}>Remove file</button>
          <button onClick={uploadFile}>Upload file</button>
        </div>
      )}
    </Box>
  );
}
