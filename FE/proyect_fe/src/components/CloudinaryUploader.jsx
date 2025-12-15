import { useState } from "react";
export default function CloudinaryUploader({ onUploadComplete }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [debug, setDebug] = useState("");
  const [url, setUrl] = useState("");

  const cloudName = "dfcwqzjks";
  const uploadPreset = "pdfsss";

  const debugLog = (msg, data = null) => {
    console.log(msg, data);
    setDebug(prev => prev + `\n${msg} ${data ? JSON.stringify(data, null, 2) : ""}`);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Seleccione un PDF primero");
      return;
    }

    setUploading(true);
    setDebug("");

    debugLog("Iniciando subida...");
    debugLog("Archivo:", { name: file.name, size_kb: file.size / 1024 });

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const urlEndpoint = `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`;
    debugLog("Endpoint usado:", urlEndpoint);

    try {
      const res = await fetch(urlEndpoint, { method: "POST", body: formData });
      const data = await res.json();

      debugLog("JSON obtenido de Cloudinary:", data);

      if (data.secure_url) {
        debugLog("URL final:", data.secure_url);
        setUrl(data.secure_url);

        // 🔥 MANDAR LA URL AL PADRE
        if (onUploadComplete) onUploadComplete(data.secure_url);
      }
    } catch (error) {
      debugLog("CATCH ERROR:", error);
    }

    setUploading(false);
  };

  return (
    <div>
      <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Subiendo..." : "Subir PDF"}
      </button>

      {url && <a href={url}>{url}</a>}

      <pre>{debug}</pre>
    </div>
  );
}
