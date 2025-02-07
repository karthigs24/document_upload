import React, { useState, useRef } from 'react'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { TabView, TabPanel } from 'primereact/tabview'
import { InputText } from 'primereact/inputtext'
import { FileUpload } from 'primereact/fileupload'
import { Dialog } from 'primereact/dialog'
import { InputTextarea } from 'primereact/inputtextarea'

const DocumentUpload = () => {
  const [dialogVisible, setDialogVisible] = useState(false)
  const [name, setName] = useState('')
  const [applicants, setApplicants] = useState([])
  const [applicantDocuments, setApplicantDocuments] = useState({})
  const [currentApplicantIndex, setCurrentApplicantIndex] = useState(0)
  const [currentDocumentIndex, setCurrentDocumentIndex] = useState(0)
  const [documentName, setDocumentName] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const fileUploadRef = useRef(null)
  const [addDocumentDialogVisible, setAddDocumentDialogVisible] =
    useState(false)
  const [activeTabIndex, setActiveTabIndex] = useState(0)

  const handleAddDocument = (index) => {
    setCurrentApplicantIndex(index)
    setActiveTabIndex(index)
    setAddDocumentDialogVisible(true)

    // Set currentDocumentIndex to the *last* index if documents exist, otherwise 0
    setApplicantDocuments((prevDocuments) => {
      const newDocuments = { ...prevDocuments }
      if (newDocuments[index] && newDocuments[index].length > 0) {
        setCurrentDocumentIndex(newDocuments[index].length) // Index of the *next* potential document
      } else {
        setCurrentDocumentIndex(0)
      }
      return newDocuments
    })
  }

  const handleDeleteApplicant = (index) => {
    setApplicants(applicants.filter((_, i) => i !== index))
    setApplicantDocuments((prevDocuments) => {
      const newDocuments = { ...prevDocuments }
      delete newDocuments[index]
      return newDocuments
    })
    if (index <= currentApplicantIndex && currentApplicantIndex > 0) {
      setCurrentApplicantIndex(currentApplicantIndex - 1)
      setActiveTabIndex(currentApplicantIndex - 1)
    }
  }

  const handleDeleteDocument = (applicantIndex, documentIndex) => {
    setApplicantDocuments((prevDocuments) => {
      const newDocuments = { ...prevDocuments }
      newDocuments[applicantIndex].splice(documentIndex, 1)
      return newDocuments
    })
  }

  const handleSaveDocument = () => {
    setApplicantDocuments((prevDocuments) => {
      const newDocuments = { ...prevDocuments }
      if (!newDocuments[currentApplicantIndex]) {
        newDocuments[currentApplicantIndex] = []
      }

      const existingDocument = newDocuments[currentApplicantIndex].find(
        (doc) => doc.name === documentName
      )

      if (!existingDocument) {
        newDocuments[currentApplicantIndex].push({
          name: documentName,
          file: selectedFile,
        })

        // Update currentDocumentIndex to reflect the newly added document
        setCurrentDocumentIndex(newDocuments[currentApplicantIndex].length - 1)
      }
      return newDocuments
    })

    setAddDocumentDialogVisible(false)
    setDocumentName('')
    setSelectedFile(null)
    if (fileUploadRef.current) {
      fileUploadRef.current.clear()
    }
  }

  const onFileSelect = (event) => {
    setSelectedFile(event.files[0])
  }

  const onFileRemove = () => {
    setSelectedFile(null)
  }

  const onFileClear = () => {
    setSelectedFile(null)
  }

  const onUpload = () => {
    if (selectedFile) {
      console.log('File uploaded:', selectedFile)
    }
  }

  const handleNextDocument = () => {
    const totalApplicants = applicants.length
    if (totalApplicants === 0) {
      return
    }

    const currentApplicantDocs = applicantDocuments[currentApplicantIndex] || []
    const totalDocsInCurrentApplicant = currentApplicantDocs.length

    if (totalDocsInCurrentApplicant === 0) {
      let nextApplicantIndex = (currentApplicantIndex + 1) % totalApplicants
      let foundNextApplicant = false
      for (let i = 0; i < totalApplicants; i++) {
        if (
          applicantDocuments[nextApplicantIndex] &&
          applicantDocuments[nextApplicantIndex].length > 0
        ) {
          foundNextApplicant = true
          break
        }
        nextApplicantIndex = (nextApplicantIndex + 1) % totalApplicants
      }
      if (foundNextApplicant) {
        setCurrentApplicantIndex(nextApplicantIndex)
        setCurrentDocumentIndex(0)
        setActiveTabIndex(nextApplicantIndex) // Update activeTabIndex
        return
      }
    } else if (currentDocumentIndex < totalDocsInCurrentApplicant - 1) {
      setCurrentDocumentIndex(currentDocumentIndex + 1)
      return
    } else {
      let nextApplicantIndex = (currentApplicantIndex + 1) % totalApplicants
      let foundNextApplicant = false
      for (let i = 0; i < totalApplicants; i++) {
        if (
          applicantDocuments[nextApplicantIndex] &&
          applicantDocuments[nextApplicantIndex].length > 0
        ) {
          foundNextApplicant = true
          break
        }
        nextApplicantIndex = (nextApplicantIndex + 1) % totalApplicants
      }
      if (foundNextApplicant) {
        setCurrentApplicantIndex(nextApplicantIndex)
        setCurrentDocumentIndex(0)
        setActiveTabIndex(nextApplicantIndex)
        return
      } else {
        setCurrentApplicantIndex(0)
        setActiveTabIndex(0)
        if (applicantDocuments[0] && applicantDocuments[0].length > 0) {
          setCurrentDocumentIndex(0)
        }
        return
      }
    }
  }

  const handlePreviousDocument = () => {
    const totalApplicants = applicants.length
    if (totalApplicants === 0) {
      return
    }

    const currentApplicantDocs = applicantDocuments[currentApplicantIndex] || []
    const totalDocsInCurrentApplicant = currentApplicantDocs.length

    if (totalDocsInCurrentApplicant === 0) {
      let prevApplicantIndex =
        (currentApplicantIndex - 1 + totalApplicants) % totalApplicants
      let foundPrevApplicant = false
      for (let i = 0; i < totalApplicants; i++) {
        if (
          applicantDocuments[prevApplicantIndex] &&
          applicantDocuments[prevApplicantIndex].length > 0
        ) {
          foundPrevApplicant = true
          break
        }
        prevApplicantIndex =
          (prevApplicantIndex - 1 + totalApplicants) % totalApplicants
      }
      if (foundPrevApplicant) {
        setCurrentApplicantIndex(prevApplicantIndex)
        setCurrentDocumentIndex(
          applicantDocuments[prevApplicantIndex].length - 1
        )
        setActiveTabIndex(prevApplicantIndex)
        return
      }
    } else if (currentDocumentIndex > 0) {
      setCurrentDocumentIndex(currentDocumentIndex - 1)
      return
    } else {
      let prevApplicantIndex =
        (currentApplicantIndex - 1 + totalApplicants) % totalApplicants
      let foundPrevApplicant = false
      for (let i = 0; i < totalApplicants; i++) {
        if (
          applicantDocuments[prevApplicantIndex] &&
          applicantDocuments[prevApplicantIndex].length > 0
        ) {
          foundPrevApplicant = true
          break
        }
        prevApplicantIndex =
          (prevApplicantIndex - 1 + totalApplicants) % totalApplicants
      }
      if (foundPrevApplicant) {
        setCurrentApplicantIndex(prevApplicantIndex)
        setCurrentDocumentIndex(
          applicantDocuments[prevApplicantIndex].length - 1
        )
        setActiveTabIndex(prevApplicantIndex)
        return
      } else {
        setCurrentApplicantIndex(totalApplicants - 1)
        setActiveTabIndex(totalApplicants - 1)
        if (
          applicantDocuments[totalApplicants - 1] &&
          applicantDocuments[totalApplicants - 1].length > 0
        ) {
          setCurrentDocumentIndex(
            applicantDocuments[totalApplicants - 1].length - 1
          )
        }
        return
      }
    }
  }

  // const getCurrentDocument = () => {
  //   const currentApplicantDocs = applicantDocuments[currentApplicantIndex] || []
  //   const document = currentApplicantDocs[currentDocumentIndex]
  //   return document
  // }

  // const currentDocument = getCurrentDocument()

  const getDocumentIndicatorClass = (applicantIndex, docIndex) => {
    if (
      applicantIndex === currentApplicantIndex &&
      docIndex === currentDocumentIndex
    ) {
      return 'ai-style-change-1 current'
    }
    return 'ai-style-change-1 not-current'
  }

  return (
    <div className="flex justify-content-center align-items-center gap-3">
      <Card className="min-w-screen">
        <div className="p-card-title">
          <div className="flex justify-content-between align-items-center">
            <h2>Document Upload</h2>
            <Button
              label="Add Applicant"
              icon="pi pi-plus"
              onClick={() => setDialogVisible(true)}
            />
          </div>
        </div>
        <div className="p-card-content">
          <TabView
            activeIndex={activeTabIndex}
            onTabChange={(e) => setActiveTabIndex(e.index)}
          >
            {applicants.map((applicant, index) => (
              <TabPanel
                key={index}
                header={
                  <div className="flex align-items-center gap-2">
                    {applicant.name}
                    <Button
                      icon="pi pi-trash"
                      className="p-button-raised p-button-danger p-button-text p-button-sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteApplicant(index)
                      }}
                    />
                  </div>
                }
              >
                {applicantDocuments[index] &&
                applicantDocuments[index].length > 0 ? (
                  <ul>
                    {applicantDocuments[index].map((doc, docIndex) => (
                      <li key={docIndex} className="flex flex-column gap-2">
                        <div className="flex align-items-center ">
                          <div
                            className={getDocumentIndicatorClass(
                              index,
                              docIndex
                            )}
                          >
                            {doc.name}
                          </div>
                          <Button
                            icon="pi pi-trash"
                            className="p-button-raised p-button-danger p-button-text p-button-sm ml-2"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteDocument(index, docIndex)
                            }}
                          />
                        </div>
                        {doc.name && (
                          <div className="my-3">
                            <FileUpload
                              ref={fileUploadRef}
                              name="demo[]"
                              url="./upload"
                              onSelect={onFileSelect}
                              onRemove={onFileRemove}
                              onClear={onFileClear}
                              onUpload={onUpload}
                              multiple={false}
                              accept="image/*"
                              maxFileSize={1000000}
                              emptyTemplate={
                                <p className="m-0">
                                  Drag and drop files here to upload.
                                </p>
                              }
                            />
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No documents available</p>
                )}
                <div className="documents-area">
                  <div className="flex justify-content-between align-items-center">
                    <Button
                      label="Add"
                      icon="pi pi-plus"
                      onClick={() => handleAddDocument(index)}
                    />
                  </div>
                </div>
              </TabPanel>
            ))}
          </TabView>
          <div className="flex justify-content-between my-3">
            <Button
              label="Back"
              icon="pi pi-arrow-left"
              onClick={handlePreviousDocument}
            />
            <Button
              label="Next"
              icon="pi pi-arrow-right"
              iconPos="right"
              onClick={handleNextDocument}
            />
          </div>
        </div>
      </Card>

      <Dialog
        header="Add Applicant"
        visible={dialogVisible}
        style={{ width: '50vw' }}
        onHide={() => setDialogVisible(false)}
        breakpoints={{ '960px': '75vw', '641px': '100vw' }}
        footer={
          <div className="flex justify-content-end gap-2">
            <Button
              label="Cancel"
              icon="pi pi-times"
              onClick={() => setDialogVisible(false)}
              className="p-button-secondary"
            />
            <Button
              label="Save"
              icon="pi pi-check"
              iconPos="left"
              onClick={() => {
                setApplicants([...applicants, { name }])
                setDialogVisible(false)
                setName('')
              }}
            />
          </div>
        }
      >
        <div className="field">
          <label htmlFor="name">Name</label>
          <InputText
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </Dialog>
      <Dialog
        header="Add Document"
        visible={addDocumentDialogVisible}
        style={{ width: '50vw' }}
        onHide={() => setAddDocumentDialogVisible(false)}
        breakpoints={{ '960px': '75vw', '641px': '100vw' }}
        footer={
          <div className="flex justify-content-end gap-2">
            <Button
              label="Cancel"
              icon="pi pi-times"
              onClick={() => setAddDocumentDialogVisible(false)}
              className="p-button-secondary"
            />
            <Button
              label="Save"
              icon="pi pi-check"
              iconPos="left"
              onClick={handleSaveDocument}
            />
          </div>
        }
      >
        <div className="field">
          <label htmlFor="documentName">Document Name</label>
          <InputTextarea
            id="documentName"
            value={documentName}
            onChange={(e) => setDocumentName(e.target.value)}
            rows={3}
            cols={30}
          />
        </div>
        {applicantDocuments[currentApplicantIndex] &&
          applicantDocuments[currentApplicantIndex].find(
            (doc) => doc.name === documentName
          ) && (
            <div className="my-3">
              <FileUpload
                ref={fileUploadRef}
                name="demo[]"
                url="./upload"
                onSelect={onFileSelect}
                onRemove={onFileRemove}
                onClear={onFileClear}
                onUpload={onUpload}
                multiple={false}
                accept="image/*"
                maxFileSize={1000000}
                emptyTemplate={
                  <p className="m-0">Drag and drop files here to upload.</p>
                }
              />
            </div>
          )}
      </Dialog>
    </div>
  )
}

export default DocumentUpload
