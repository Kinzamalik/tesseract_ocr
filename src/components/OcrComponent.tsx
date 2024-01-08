import React, { useState } from "react";
import Tesseract from "tesseract.js";
import { Button, Typography, Paper, Grid } from "@mui/material";
import "./OcrComponent.css";

const OcrComponent: React.FC = () => {
  const [image, setImage] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [ocrData, setOcrData] = useState<{ word: string }[]>([]);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const imageDataUrl = reader.result as string;
        setImage(imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRunOcr = async () => {
    if (image) {
      const {
        data: { text },
      } = await Tesseract.recognize(image, "eng");
      setResult(text);

      // Extract individual words from the OCR result
      const words = text.split(/\s+/);

      // Set the type for each word to "Text"
      const formattedData = words.map((word) => ({ word }));
      setOcrData(formattedData);

      console.log(JSON.stringify(text));
    }
  };

  return (
    <div className="ocr-container">
      <label htmlFor="upload-button" className="ocr-upload-button">
        Choose File
      </label>
      <input
        type="file"
        accept="image/*"
        id="upload-button"
        onChange={handleUpload}
        style={{ display: "none" }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleRunOcr}
        disabled={!image}
        className="ocr-upload-button">
        Run OCR
      </Button>

      {image && <img src={image} alt="Selected" className="selected-image" />}

      {result && (
        <div className="ocr-result">
          <Typography variant="h6">OCR Result:</Typography>
          <Paper style={{ padding: 16, marginTop: 16 }}>
            <Grid container spacing={2}>
              {ocrData.map((item, index) => (
                <Grid item key={index} xs={6} sm={4} md={3}>
                  <Typography>{item.word}</Typography>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </div>
      )}
    </div>
  );
};

export default OcrComponent;
