"use client"

import type React from "react"
import { useEffect, useState } from "react"
import styled from "styled-components"
import {useField} from "@payloadcms/ui"

interface DropzoneProps {
  onUploadComplete?: (urls: string[]) => void
}

const Container = styled.div`
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
`

const DropArea = styled.div<{ $isDragOver: boolean; $isUploading: boolean }>`
  border: 2px dashed ${(props) => (props.$isDragOver ? "#007bff" : "#ccc")};
  border-radius: 8px;
  padding: 40px 20px;
  text-align: center;
  background-color: ${(props) => (props.$isDragOver ? "#f8f9fa" : "#fff")};
  cursor: ${(props) => (props.$isUploading ? "not-allowed" : "pointer")};
  transition: all 0.3s ease;
  position: relative;
  opacity: ${(props) => (props.$isUploading ? 0.7 : 1)};
`

const HiddenInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`

const UploadContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`

const IconContainer = styled.div`
  margin-bottom: 10px;
`

const Title = styled.div`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px;
`

const Subtitle = styled.div`
  font-size: 14px;
  color: #666;
`

const ProgressContainer = styled.div`
  margin-top: 20px;
  padding: 15px;
  background-color: #e3f2fd;
  border-radius: 4px;
  font-size: 14px;
  color: #1976d2;
`

const ProgressItem = styled.div<{ $isCompleted: boolean }>`
  margin: 5px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${(props) => (props.$isCompleted ? "#4caf50" : "#1976d2")};
`

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid #e3f2fd;
  border-top: 2px solid #1976d2;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

const ThumbnailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 15px;
  margin-top: 20px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border: 1px solid #e9ecef;
`

const ThumbnailCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  background-color: white;
  border-radius: 6px;
  box-shadow: none;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: none;
  }
`

const ThumbnailImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 8px;
`

const ThumbnailsHeader = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 10px;
`

const ClearButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #c82333;
  }
`

// SVG Icons
const FolderIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.5">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
)

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2">
    <polyline points="20,6 9,17 4,12" />
  </svg>
)

export default function Dropzone({ onUploadComplete }: DropzoneProps) {
  // Initialize states with null to prevent hydration mismatches
  const [isDragOver, setIsDragOver] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<Array<{ name: string; status: "uploading" | "completed" }>>([])
  const { value, setValue } = useField<string[]>()

  useEffect(() => {
    if (!value) {
      setValue([])
    }
  }, [value, setValue])
  
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    uploadFiles(files)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    uploadFiles(files)
  }

  const uploadFiles = async (files: File[]) => {
    if (files.length === 0) return

    setIsUploading(true)
    setUploadProgress(files.map((file) => ({ name: file.name, status: "uploading" as const })))
    const urls: string[] = []
    const newUploadedFiles: Array<{ url: string; name: string; type: string }> = []

    try {
      // Upload files one by one (sequentially)
      for (let i = 0; i < files.length; i++) {
        const file = files[i]

        const formData = new FormData()
        formData.append("file", file)

        const response = await fetch("/api/media", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          throw new Error(`Failed to upload ${file.name}`)
        }

        const result = await response.json()
        urls.push(result.doc.url)
       
        newUploadedFiles.push({
          url: result.url,
          name: file.name,
          type: file.type,
        })

        // Update progress for this specific file
        setUploadProgress((prev) =>
          prev.map((item, index) => (index === i ? { ...item, status: "completed" as const } : item)),
        )
      }

      // Add new files to uploaded files state

      // Alert the URLs array
      
      setValue(urls)
      // Call callback if provided
      onUploadComplete?.(urls)
    } catch (error) {
      console.error("Upload error:", error)
      alert(`Upload failed: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      
      setIsUploading(false)
      setTimeout(() => setUploadProgress([]), 2000) // Clear progress after 2 seconds
    }
  }

  const renderThumbnail = (file:string) => {

    return (
      <ThumbnailCard key={file}>
    
          <ThumbnailImage src={file} alt={file} />
     
      </ThumbnailCard>
    )
  }

  const clearThumbnails = () => {
    setValue([])
  }

  return (
    <Container>
      <DropArea
        $isDragOver={isDragOver}
        $isUploading={isUploading}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <HiddenInput type="file" multiple onChange={handleFileSelect} disabled={isUploading} />

        <UploadContent>
          <IconContainer>
            <FolderIcon />
          </IconContainer>

          {isUploading ? (
            <>
              <Title>Uploading files...</Title>
              <Subtitle>Please wait while files are being processed</Subtitle>
            </>
          ) : (
            <>
              <Title>{isDragOver ? "Drop files here" : "Drag & drop files here"}</Title>
              <Subtitle>or click to select files</Subtitle>
            </>
          )}
        </UploadContent>
      </DropArea>

      {uploadProgress.length > 0 && (
        <ProgressContainer>
          <div style={{ marginBottom: "10px", fontWeight: "500" }}>Upload Progress:</div>
          {uploadProgress.map((item, index) => (
            <ProgressItem key={index} $isCompleted={item.status === "completed"}>
              {item.status === "uploading" ? <LoadingSpinner /> : <CheckIcon />}
              {item.name} {item.status === "completed" ? "- Completed" : "- Uploading..."}
            </ProgressItem>
          ))}
        </ProgressContainer>
      )}

      {value?.length > 0 && (
        <div style={{ marginTop: "20px", background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)' }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: '15px' }}>
            <ThumbnailsHeader>Uploaded Files ({value.length})</ThumbnailsHeader>
            <ClearButton onClick={clearThumbnails}>Clear All</ClearButton>
          </div>
          <ThumbnailGrid>{value.map(renderThumbnail)}</ThumbnailGrid>
        </div>
      )}
    </Container>
  )
}
