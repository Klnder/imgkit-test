import React, { useState } from "react";
import "./App.css";
import { IKContext, IKImage, IKUpload } from "imagekitio-react";

const publicKey = "public_w3xAdF/JzWrdmQNjNT/NTcF2nlM=";
const urlEndpoint = "https://ik.imagekit.io/pinpin";
const authenticationEndpoint = "https://imgkit.onrender.com/auth";

function App() {
  const authenticatorFunction = async () => {
    const response = await fetch("https://imgkit.onrender.com/auth");
    const data = await response.json();

    return {
      signature: data.signature,
      token: data.token,
      expire: data.expire,
    };
  };

  const [filepath, setFilePath] = useState("");
  const onError = (err) => {
    console.log("Error", err);
  };

  const onSuccess = (res) => {
    console.log("Success", res);
    setFilePath(res.filePath);
  };
  return (
    <div className="App">
      <h1>ImageKit React quick start</h1>
      <IKContext
        publicKey={publicKey}
        urlEndpoint={urlEndpoint}
        authenticationEndpoint={authenticationEndpoint}
        authenticator={authenticatorFunction}
      >
        <p>Upload an image</p>
        <IKUpload fileName="test-upload.png" onError={onError} onSuccess={onSuccess} />
        <IKImage path={filepath} height="400" width="400" />
      </IKContext>
      {/* ...other SDK components added previously */}
    </div>
  );
}

export default App;
